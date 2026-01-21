// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::fs;
use std::io::{self, Read};
// use std::path::Path;

use serde_json::json;

/**
This function convert to `.txt`, and retrive the content of Skt file .dat
*/
fn getconvert_bytes_to_str(input_path: &str) -> io::Result<String> {
    // Open the .dat file, and read the entire file
    let mut file = fs::File::open(input_path)?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)?;

    // Convert the bytes buffer to a String
    let text_content = String::from_utf8_lossy(&buffer).to_string();

    // Return the data content
    Ok(text_content)
}

fn get_user_data(input_path: &str) -> io::Result<String> {
    let content = getconvert_bytes_to_str(input_path)?;

    let records: Vec<serde_json::Value> = content
        .split('\0')
        .filter(|s| !s.trim().is_empty())
        .filter(|s| s.chars().any(|c| c.is_alphabetic()))
        .filter(|s| s.chars().filter(|c| c.is_alphabetic()).count() > 2)
        .enumerate()
        .map(|(index, s)| {
            let name = s
                .chars()
                .filter(|c| c.is_alphabetic() || c.is_whitespace())
                .collect::<String>()
                .trim()
                .to_string();

            json!({
                "id": index + 1,
                "name": name
            })
        })
        .collect();

    let json_output = json!({ "records": records });
    let json_content =
        serde_json::to_string_pretty(&json_output).expect("Failed to serialize to JSON");

    Ok(json_content)
}

fn get_attendance_data(input_path: &str) -> io::Result<String> {
    let content = getconvert_bytes_to_str(input_path)?;

    println!("{}", content);

    // Parse each line into structured data
    let records: Vec<serde_json::Value> = content
        .lines()
        .filter(|line| !line.trim().is_empty()) // Skip empty lines
        .map(|line| {
            let fields: Vec<&str> = line.split('\t').collect();

            // Trim leading/trailing whitespace from each field
            let id = fields.first().unwrap_or(&"").trim();
            let timestamp = fields.get(1).unwrap_or(&"").trim();
            // This variables are unnecessary for now
            // let field2 = fields.get(2).unwrap_or(&"").trim();
            // let field3 = fields.get(3).unwrap_or(&"").trim();
            // let field4 = fields.get(4).unwrap_or(&"").trim();
            // let field5 = fields.get(5).unwrap_or(&"").trim();

            json!({
                "user_id": id,
                "timestamp": timestamp,
                // "field2": field2,
                // "field3": field3,
                // "field4": field4,
                // "field5": field5
            })
        })
        .collect();

    // Create final JSON with records array
    let json_output = json!({ "records": records });
    let json_content =
        serde_json::to_string_pretty(&json_output).expect("Failed to serialize to JSON");

    Ok(json_content) // Return Ok(()) on success
}

fn merge_users_and_attendance(users_path: &str, attendance_path: &str) -> io::Result<String> {
    // Get user data
    let users_content = get_user_data(users_path)?;
    let users_json: serde_json::Value = serde_json::from_str(&users_content)
        .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e))?;

    // Get attendance data
    let attendance_content = get_attendance_data(attendance_path)?;
    let attendance_json: serde_json::Value = serde_json::from_str(&attendance_content)
        .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e))?;

    // Extract records arrays
    let users = users_json["records"]
        .as_array()
        .ok_or_else(|| io::Error::new(io::ErrorKind::InvalidData, "Invalid users format"))?;
    let attendances = attendance_json["records"]
        .as_array()
        .ok_or_else(|| io::Error::new(io::ErrorKind::InvalidData, "Invalid attendance format"))?;

    // Create merged records
    let merged_records: Vec<serde_json::Value> = attendances
        .iter()
        .filter_map(|attendance| {
            let user_id = attendance["user_id"].as_str()?;

            // Find matching user by id
            let user = users
                .iter()
                .find(|u| u["id"].as_i64().map(|id| id.to_string()) == Some(user_id.to_string()));

            Some(json!({
                "user_id": user_id,
                "user_name": user.and_then(|u| u["name"].as_str()).unwrap_or("Unknown"),
                "timestamp": attendance["timestamp"].as_str().unwrap_or("")
            }))
        })
        .collect();

    let json_output = json!({ "records": merged_records });
    let json_content =
        serde_json::to_string_pretty(&json_output).expect("Failed to serialize to JSON");

    Ok(json_content)
}

#[tauri::command]
fn get_attendance_results(users_path: String, attendance_path: String) -> Result<String, String> {
    merge_users_and_attendance(&users_path, &attendance_path).map_err(|e| e.to_string())
}

#[tauri::command]
fn read_and_get_users(path: String) -> Result<String, String> {
    get_user_data(&path).map_err(|e| e.to_string())
}

#[tauri::command]
fn read_and_get_attendance(path: String) -> Result<String, String> {
    get_attendance_data(&path).map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            read_and_get_users,
            read_and_get_attendance,
            get_attendance_results,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

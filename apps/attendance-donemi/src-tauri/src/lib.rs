// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::fs;
use std::path::Path;

use serde_json::json;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// fn read_bytes_to_hex(path: &str) -> Result<String, String> {
//     let file_path = Path::new(path);
//     let bytes = fs::read(file_path).map_err(|e| format!("Failed to read file: {}", e))?;
//
//     let hex = bytes
//         .iter()
//         .map(|b| format!("{:02x}", b))
//         .collect::<Vec<_>>()
//         .join(" ");
//
//     Ok(hex)
// }

#[derive(Debug)]
struct Attendance {
    user_id: u32,
    timestamp: String,
    status_a: u8,
    status_b: u8,
    status_c: u8,
    status_d: u8,
}

fn get_attendance(path: String) -> Result<Vec<Attendance>, String> {
    let file_path = Path::new(&path);

    // Reading as a string directly is more idiomatic if the file is text
    let data = fs::read_to_string(file_path).map_err(|e| format!("Failed to read file: {}", e))?;

    let mut logs = Vec::new();

    for line in data.lines() {
        // Your log uses Tabs (\t) as the primary separator
        let columns: Vec<&str> = line.split('\t').map(|s| s.trim()).collect();

        if columns.len() >= 6 {
            let record = Attendance {
                // columns[0] is the User ID
                user_id: columns[0].parse().unwrap_or(0),
                // columns[1] is the Date/Time string
                timestamp: columns[1].to_string(),
                status_a: columns[2].parse().unwrap_or(0),
                status_b: columns[3].parse().unwrap_or(0),
                status_c: columns[4].parse().unwrap_or(0),
                status_d: columns[5].parse().unwrap_or(0),
            };
            logs.push(record);
        }
    }

    Ok(logs)
}

fn get_users_from_bytes(path: String) -> Result<Vec<String>, String> {
    let file_path = Path::new(&path);
    let bytes = fs::read(file_path).map_err(|e| format!("Failed to read file: {}", e))?;

    let mut names = Vec::new();
    let mut current_name = Vec::new();

    for &b in &bytes {
        if b.is_ascii_alphabetic() {
            current_name.push(b);
        } else {
            if current_name.len() >= 3 {
                if let Ok(name) = String::from_utf8(current_name.clone()) {
                    names.push(name);
                }
            }

            current_name.clear();
        }
    }

    Ok(names)
}

#[tauri::command]
fn read_and_get_users(path: String) -> Result<String, String> {
    let users_names = get_users_from_bytes(path)?;

    let users: Vec<serde_json::Value> = users_names
        .iter()
        .enumerate()
        .map(|(index, user_name)| {
            json!({
                "id": index + 1,
                "name": user_name
            })
        })
        .collect();

    serde_json::to_string(&json!({ "users": users }))
        .map_err(|e| format!("failed to serialize to json: {}", e))
}

#[tauri::command]
fn read_attendance(path: String) -> Result<String, String> {
    let attendances = get_attendance(path)?;

    // Wrap in a JSON object and serialize
    serde_json::to_string(&json!({ "data": attendances }))
        .map_err(|e| format!("Failed to serialize to JSON: {}", e)) // Fixed the format! macro
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            read_and_get_users,
            read_attendance
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

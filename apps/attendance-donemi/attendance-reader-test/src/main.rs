use std::fs;
use std::io::{self, Read}; // Need Read trait for read_to_end

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

fn get_user_data(input_path: &str) -> io::Result<()> {
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

    println!("{}", json_content);

    Ok(())
}

fn get_attendance_data(input_path: &str) -> io::Result<()> {
    let content = getconvert_bytes_to_str(input_path)?;

    println!("{}", content);

    // 5. Parse each line into structured data
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
                "id": id,
                "timestamp": timestamp,
                // "field2": field2,
                // "field3": field3,
                // "field4": field4,
                // "field5": field5
            })
        })
        .collect();

    // 6. Create final JSON with records array
    let json_output = json!({ "records": records });
    let json_content =
        serde_json::to_string_pretty(&json_output).expect("Failed to serialize to JSON");

    println!("{}", json_content);

    Ok(()) // Return Ok(()) on success
}

fn main() {
    let input_file = "/home/kfoq7/Dev/don-emiliano-platform/apps/attendance-donemi/data/NYU7244800354_attlog.dat";
    let input_user_file =
        "/home/kfoq7/Dev/don-emiliano-platform/apps/attendance-donemi/data/user.dat";
    // let output_file = "/home/kfoq7/Dev/don-emiliano-platform/apps/attendance-donemi/data/NYU7244800354_attlog.txt";

    // Create a dummy .dat file for testing (optional)
    // fs::write(input_file, "Hello, Rust!\nThis is some data.")
    //     .expect("Failed to create dummy .dat file");

    get_attendance_data(input_file).expect("Failed");
    get_user_data(input_user_file).expect("Failed users")
    // match convert_dat_to_txt(input_file) {
    // Ok(_) => println!("Successfully converted {} to {}", input_file),
    //     Err(e) => eprintln!("Error converting file: {}", e),
    // }

    // match getconvert_data_to_txt(input_path, output_path) {
    //     Ok(_) => println!("")
    // }

    // You can also read the .txt file back to verify (optional)
    // let new_content = fs::read_to_string(output_file).expect("Failed to read .txt file");
    // println!("Content of {}:\n{}", output_file, new_content);
}

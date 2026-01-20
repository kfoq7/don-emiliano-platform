use std::fs;
use std::io::{self, Read}; // Need Read trait for read_to_end

fn convert_dat_to_txt(input_path: &str, output_path: &str) -> io::Result<()> {
    // 1. Read the entire .dat file into a vector of bytes
    let mut file = fs::File::open(input_path)?; // Opens the .dat file
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)?; // Reads all bytes into the buffer

    // 2. Convert the byte buffer to a String
    // from_utf8_lossy handles invalid UTF-8 by replacing it with
    let text_content = String::from_utf8_lossy(&buffer);
    // Use String::from_utf8(&buffer) if you want an error (Result<String, FromUtf8Error>)
    // instead of replacement characters if the file isn't valid UTF-8.

    // 3. Write the String content to the .txt file
    // fs::write is a convenient one-liner that creates/overwrites the file
    fs::write(output_path, text_content.as_bytes())?;

    Ok(()) // Return Ok(()) on success
}

fn main() {
    let input_file = "/home/kfoq7/Dev/don-emiliano-platform/apps/attendance-donemi/data/user.dat";
    let output_file = "/home/kfoq7/Dev/don-emiliano-platform/apps/attendance-donemi/data/user.txt";

    // Create a dummy .dat file for testing (optional)
    // fs::write(input_file, "Hello, Rust!\nThis is some data.")
    //     .expect("Failed to create dummy .dat file");

    match convert_dat_to_txt(input_file, output_file) {
        Ok(_) => println!("Successfully converted {} to {}", input_file, output_file),
        Err(e) => eprintln!("Error converting file: {}", e),
    }

    // You can also read the .txt file back to verify (optional)
    let new_content = fs::read_to_string(output_file).expect("Failed to read .txt file");
    println!("Content of {}:\n{}", output_file, new_content);
}

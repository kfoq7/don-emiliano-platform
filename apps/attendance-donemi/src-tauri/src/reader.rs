pub fn get_users_from_bytes(path: String) -> Result<Vec<String>, String> {
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

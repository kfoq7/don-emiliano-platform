# Don Emiliano - Database Schema

This document outlines the database tables required for the admin panel functionality. The backend should implement these schemas.

## `products` table

Stores all products offered by the business.

```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INT NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  is_stock_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

| Column               | Type           | Description                                        |
| -------------------- | -------------- | -------------------------------------------------- |
| `id`                 | INT            | Primary Key                                        |
| `name`               | VARCHAR(255)   | Product name                                       |
| `description`        | TEXT           | Optional product description                       |
| `price`              | DECIMAL(10, 2) | Price of the product                               |
| `category_id`        | INT            | Foreign key to `categories` table                  |
| `is_available`       | BOOLEAN        | Toggled by admin, hides product from customer view |
| `is_stock_available` | BOOLEAN        | Can be used for inventory management               |
| `created_at`         | TIMESTAMP      | Record creation timestamp                          |
| `updated_at`         | TIMESTAMP      | Record last update timestamp                       |

## `categories` table

Stores product categories.

```sql
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

| Column       | Type         | Description                                         |
| ------------ | ------------ | --------------------------------------------------- |
| `id`         | INT          | Primary Key                                         |
| `name`       | VARCHAR(255) | Unique category name (e.g., "Bebidas", "Porciones") |
| `created_at` | TIMESTAMP    | Record creation timestamp                           |
| `updated_at` | TIMESTAMP    | Record last update timestamp                        |

## `business_hours` table

Stores the opening and closing hours for each day of the week.

```sql
CREATE TABLE business_hours (
  id INT PRIMARY KEY AUTO_INCREMENT,
  day_of_week SMALLINT NOT NULL UNIQUE,
  day_name VARCHAR(20) NOT NULL,
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

| Column        | Type        | Description                                           |
| ------------- | ----------- | ----------------------------------------------------- |
| `id`          | INT         | Primary Key                                           |
| `day_of_week` | SMALLINT    | Day of the week (0=Sunday, 1=Monday, ..., 6=Saturday) |
| `day_name`    | VARCHAR(20) | Spanish day name ("Lunes", "Domingo", etc.)           |
| `open_time`   | TIME        | Opening time (e.g., '07:00:00'), NULL if closed       |
| `close_time`  | TIME        | Closing time (e.g., '15:00:00'), NULL if closed       |
| `is_closed`   | BOOLEAN     | `true` if the business is closed on this day          |
| `created_at`  | TIMESTAMP   | Record creation timestamp                             |
| `updated_at`  | TIMESTAMP   | Record last update timestamp                          |

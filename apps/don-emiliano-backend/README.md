# Don Emiliano - Backend API 🚀

Main Backend API for the Don Emiliano Platform, providing business logic for product management, categories, and business operations.

## 🛠️ Tech Stack

- **Java**: 25 (Latest LTS version)
- **Framework**: Spring Boot 4.x
- **Build Tool**: Gradle (Wrapper provided)
- **Database**: PostgreSQL
- **Persistence**: Spring Data JPA / Hibernate
- **Mapping**: MapStruct
- **Utilities**: Lombok
- **Validation**: Bean Validation (Hibernate Validator)

## 📁 Project Structure

The project follows a **Feature-based packaging** structure:

```text
src/main/java/com/donemiliano/api/
├── features/
│   ├── businesshours/   # Business opening/closing hours management
│   ├── products/        # Product and Category management
│   ├── health/          # API Health checks
│   └── common/          # Shared utilities, mappers, and base classes
├── config/              # Spring configuration (Security, CORS, etc.)
└── DonEmilianoBackendApplication.java # Entry point
```

## 🚀 Getting Started

### Prerequisites

- **Java JDK 25**
- **Docker** (for running PostgreSQL)
- **Gradle** (or use the included `./gradlew`)

### Configuration

The application uses environment variables for database configuration. Create a `.env` file or set them in your environment:

```properties
POSTGRES_HOST=localhost
POSTGRES_DB=don_emiliano
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
```

### Running Locally

1. **Build the project**:
   ```bash
   ./gradlew build
   ```

2. **Run the application**:
   ```bash
   ./gradlew bootRun
   ```

The API will be available at `http://localhost:8080/api/v1`.

## 📝 Development

### Key Commands

- **Run all tests**: `./gradlew test`
- **Build without tests**: `./gradlew build -x test`
- **Format code**: (Handled by IDE/Editor plugins)
- **Generate MapStruct mappers**: Done automatically during `./gradlew build`

### API Features

- **Products**: Full CRUD for products with availability and stock tracking.
- **Categories**: Category management for product organization.
- **Business Hours**: Configure opening/closing times per day of the week.

## 🔒 Security

- **Lombok**: Used to reduce boilerplate (Getters, Setters, Builders).
- **Validation**: All API requests are validated using standard Java Bean Validation.
- **Auditing**: Entities include `createdAt` and `updatedAt` automatic timestamps.

---
*Last updated: March 05, 2026*

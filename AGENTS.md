# Don Emiliano Platform - Agent Guidelines

This document provides instructions for AI agents and developers working on the Don Emiliano Platform repository. Adhere to these guidelines to ensure consistency, quality, and stability.

## Project Structure

The repository is a monorepo containing multiple applications:

- **`apps/don-emiliano-web`**: Frontend application (Astro 5, Preact, Tailwind CSS v4, Nanostores).
- **`apps/don-emiliano-backend`**: Main Backend API (Java 25, Spring Boot 4, Gradle).
- **`apps/don-emiliano-backend-nestjs`**: Alternative/Microservice Backend (NestJS, TypeScript).

## 1. Build, Lint, and Test Commands

Always run commands from the specific application directory (e.g., `cd apps/don-emiliano-web`).

### Web Application (`apps/don-emiliano-web`)

_Package Manager: `pnpm`_

- **Install Dependencies**: `pnpm install`
- **Start Dev Server**: `pnpm dev`
- **Build for Production**: `pnpm build`
- **Preview Build**: `pnpm preview`
- **Type Check**: `npx tsc --noEmit`
- **Format**: `npx prettier --write .`

### Backend API - Java (`apps/don-emiliano-backend`)

_Build Tool: `Gradle` (Wrapper provided)_

- **Build**: `./gradlew build`
- **Run Locally**: `./gradlew bootRun`
- **Run All Tests**: `./gradlew test`
- **Run Single Test Class**: `./gradlew test --tests com.donemiliano.api.features.products.ProductControllerTest`
- **Run Single Test Method**: `./gradlew test --tests "com.donemiliano.api.features.products.ProductControllerTest.shouldCreateProduct"`

### Backend API - NestJS (`apps/don-emiliano-backend-nestjs`)

_Package Manager: `pnpm`_

- **Install Dependencies**: `pnpm install`
- **Start Dev Server**: `pnpm start:dev`
- **Build**: `pnpm build`
- **Run All Tests**: `pnpm test`
- **Run Single Test File**: `pnpm test -- src/products/products.controller.spec.ts`

## 2. Code Style & Conventions

### General Principles

- **Language**: Write code, variables, and comments in **English**.
- **User-Facing Text**: All UI strings must be in **Spanish (Peru context)** (e.g., currency `S/`, formatting).
- **Comments**: Focus on the _why_, not the _what_. Avoid redundant comments.
- **Deps**: Do not add new dependencies without explicit instruction. Use existing libraries.

### TypeScript / Astro / Preact (`don-emiliano-web`)

- **Formatting**: Prettier default (2 spaces, single quotes, semicolons).
- **Naming**:
  - Components: `PascalCase` (e.g., `ProductCard.tsx`, `Header.astro`).
  - Functions/Variables: `camelCase`.
  - Constants: `UPPER_SNAKE_CASE` or `camelCase` (context-dependent).
- **Imports**: Use absolute imports with `@/` alias mapping to `src/` (e.g., `import { formatPrice } from '@/utils/format';`).
- **State Management**: Use Nanostores (`persistentMap`, `persistentAtom`) for global state.
- **Styling**: Tailwind CSS v4. Use utility classes. For complex animations, use `@keyframes` in `global.css` or `@theme` config.
- **Components**: Prefer functional components. Use `useState`/`useEffect` for client-side logic in Preact.
- **Files**:
  - `.astro`: Server-side rendering by default (unless `client:*` directive used).
  - `.tsx`: Client-side interactive components (Preact).

### Java / Spring Boot (`don-emiliano-backend`)

- **Java Version**: 25 (Preview features may be enabled).
- **Framework**: Spring Boot 4.x.
- **Formatting**: Standard Java conventions (4 spaces indentation).
- **Naming**:
  - Classes: `PascalCase`.
  - Methods/Fields: `camelCase`.
  - Packages: `lowercase` (e.g., `com.donemiliano.api.features...`).
- **Structure**: Feature-based packaging (`features/products`, `features/orders`).
- **Lombok**: Use `@Data`, `@RequiredArgsConstructor`, `@Builder` to reduce boilerplate.
- **DTOs**: Always use DTOs for API requests/responses. Map using MapStruct.
- **Error Handling**: Use global exception handling (`@ControllerAdvice`) and custom exceptions.

## 3. Testing Guidelines

- **Unit Tests**:
  - **Java**: JUnit 5 + Mockito. Test service logic in isolation.
  - **TS**: Vitest/Jest (if configured).
- **Integration Tests**:
  - **Java**: `@SpringBootTest` with `@AutoConfigureMockMvc` for controller tests.
- **Mocking**: Mock external dependencies (DB, 3rd party APIs) in unit tests.

## 4. Git Workflow

- **Commits**: Use Conventional Commits.
  - Format: `<type>(<scope>): <description>`
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
  - Example: `feat(web): add delivery location modal`
  - Example: `fix(api): resolve product creation npe`
- **Branches**: Create feature branches (e.g., `feat/cart-redesign`) from `main`.

## 5. Security & Safety

- **Secrets**: NEVER commit API keys, passwords, or `.env` files.
- **Validation**: Validate all inputs (Zod for TS, Bean Validation for Java).
- **Destructive Actions**: Warn user before running `rm -rf` or dropping DB tables.

---

_This file is auto-generated and maintained to guide AI agents. Last updated: Mar 05 2026._

# Implementation Status - Waiter Dashboard

## Goal

The user wants to implement a complete "Waiter Dashboard" workflow for a restaurant OMS. This includes:

1.  **Active Tables**: A view to see all tables currently assigned to the user.
2.  **Table Details**: A read-only view of a specific table's order.
3.  **POS/Dashboard**: The ability to edit an existing order or create a new one.
4.  **Table Registration**: A flow to select and register a new table, ensuring it isn't already occupied.
5.  **API Integration**: Full integration with the backend endpoints (removing all mocks), specifically matching the logic found in legacy scripts (`mesa.txt`, `panelmesas.txt`).

## Instructions

- **Workflow**: Login -> ActiveTables -> (Create New -> TableSelection) OR (Select Existing -> TableDetails -> Dashboard).
- **Dynamic Routing**: Use `/tables/:numberId` for the table details view.
- **API Integration**: Analyze `mesa.txt` and `panelmesas.txt` to replicate the exact API call sequences and payloads.
- **Validation**:
  - In `TableSelection`, check if a table is occupied using `ValidarMesa` before registering.
  - In `Dashboard` (POS) and `TableSelection`, fetch `VerOperacion` first to get the required `ID_OPERACION` and dates.
- **Navigation**: Add "Back" buttons to allow easy navigation between the Dashboard, Details, and Active Tables list.
- **No Mocks**: Remove all hardcoded/mock data and rely solely on API responses.

## Discoveries

- **Backend Structure**: The project interacts with a .NET-style backend (ASP.NET MVC likely).
- **Critical Dependencies**: Most actions (`RegistrarMesa`, `ObtenerMesasUsuario`, `RegistrarComanda`) require an `ID_OPERACION` which must be fetched first from `/api/Pedido/VerOperacion`.
- **Date Handling**: The `FECHA_APERTURA` from the backend might arrive in ASP.NET AJAX format (`/Date(timestamp)/`) or standard strings, requiring parsing before being sent back in payloads.
- **Table Availability**: `ValidarMesa` returns `Data > 0` if a table is busy.
- **State Restoration**: The `Dashboard` (POS) restores the current order state by calling `/api/Pedido/DetalleMesa` when mounting.

## Accomplished

- **Created `src/pages/ActiveTables.tsx`**:
  - Fetches the current operation ID.
  - Lists active tables for the logged-in user using `ObtenerMesasUsuario`.
  - Redirects to `/tables/:id` on click.
- **Created `src/pages/TableDetails.tsx`**:
  - Fetches and displays the list of products for a specific table using `DetalleMesa`.
  - Includes "Editar Pedido" (navigates to Dashboard) and "Volver" buttons.
- **Updated `src/pages/Dashboard.tsx`**:
  - **State Restoration**: Loads existing products for the table using `DetalleMesa` on mount.
  - **Order Submission**: Fetches `VerOperacion` to get the valid `ID_OPERACION` before submitting `RegistrarComanda`.
  - Added a "Back" button to the header.
- **Updated `src/pages/TableSelection.tsx`**:
  - **Validation**: Checks `ValidarMesa` to ensure the table is free.
  - **Registration**: Registers the table using `RegistrarMesa`, correctly populating `ID_OPERACION`, `FECHA`, and `FECHAPRO` from the `VerOperacion` response.
  - Handles date parsing logic.
- **Refactored Codebase Architecture**:
  - Extracted logic from all pages (`Dashboard`, `ActiveTables`, `TableSelection`, `TableDetails`) into custom hooks (`useCart`, `useActiveTables`, `useTableSelection`, `useTableDetails`).
  - Extracted API calls and endpoints into dedicated services (`dashboard.service.ts`, `table.service.ts`, `table-details.service.ts`).
  - Separated UI elements into reusable components in `src/components/` (e.g., `ProductCard`, `CartItemComponent`, `TableCard`, `ZoneTabs`, `TableGridCard`, `OrderItemList`, `TableSummary`).

## Relevant files / directories

- `src/App.tsx`
- `src/pages/ActiveTables.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/TableDetails.tsx`
- `src/pages/TableSelection.tsx`
- `src/types/Products.ts`
- `mesa.txt` (Reference code)
- `panelmesas.txt` (Reference code)

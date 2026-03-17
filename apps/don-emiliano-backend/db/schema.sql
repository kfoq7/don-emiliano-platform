-- Don Emiliano Platform - PostgreSQL Schema
-- Generated/Ported from donemiliano.sql (T-SQL)

-- Enable UUID extension if we want to use UUIDs later, but keeping INT for migration simplicity for now.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. Configuration & Catalogs (Lookup Tables)
-- =============================================

CREATE TABLE IF NOT EXISTS company_info (
    id SERIAL PRIMARY KEY,
    ruc VARCHAR(11),
    business_name VARCHAR(255), -- RAZON_SOCIAL
    trade_name VARCHAR(255),    -- RAZON_COMERCIAL
    address VARCHAR(255),
    phone_1 VARCHAR(20),
    phone_2 VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    settings JSONB DEFAULT '{}' -- Storing various configuration flags (TOUCH, IGV, etc.) here
);

CREATE TABLE IF NOT EXISTS warehouses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    abbreviation VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS areas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    level_id INT -- TBL_NIVEL linkage if needed
);

CREATE TABLE IF NOT EXISTS staff_roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS staff (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20),
    name VARCHAR(150) NOT NULL,
    alias VARCHAR(50),
    password_hash VARCHAR(255), -- Storing hashed passwords, not plain text
    role_id INT REFERENCES staff_roles(id),
    salary NUMERIC(10, 2),
    is_active BOOLEAN DEFAULT TRUE,
    permissions JSONB DEFAULT '{}', -- Converting checkbox permissions (ACESOVENTA, ACESOCAJA) to JSON
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS units (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    abbreviation VARCHAR(50),
    sunat_code VARCHAR(50), -- SUNAT specific code
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS categories ( -- TBL_GRUPO
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    abbreviation VARCHAR(30),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS document_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    abbreviation VARCHAR(50),
    sunat_code VARCHAR(10),
    is_active BOOLEAN DEFAULT TRUE,
    is_stock_input BOOLEAN DEFAULT FALSE,
    is_stock_output BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS payment_methods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    abbreviation VARCHAR(10),
    is_active BOOLEAN DEFAULT TRUE
);

-- =============================================
-- 2. Core Entities
-- =============================================

CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(400) NOT NULL,
    address VARCHAR(200),
    district_id INT, -- Link to a districts table if available
    phone_1 VARCHAR(50),
    phone_2 VARCHAR(50),
    email VARCHAR(150),
    tax_id VARCHAR(11), -- RUC/DNI
    contact_person VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS suppliers ( -- TBL_PROVEEDOR
    id SERIAL PRIMARY KEY,
    business_name VARCHAR(150) NOT NULL,
    address VARCHAR(300),
    phone VARCHAR(15),
    email VARCHAR(100),
    website VARCHAR(100),
    tax_id VARCHAR(15), -- RUC
    contact_person VARCHAR(15),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    category_id INT REFERENCES categories(id),
    unit_id INT REFERENCES units(id),
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    cost NUMERIC(10, 2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    min_stock NUMERIC(10, 2) DEFAULT 0,
    has_prescription BOOLEAN DEFAULT FALSE, -- ACTIVO_RECETA
    is_combo BOOLEAN DEFAULT FALSE,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_stock (
    warehouse_id INT REFERENCES warehouses(id),
    product_id INT REFERENCES products(id),
    stock NUMERIC(10, 4) NOT NULL DEFAULT 0,
    min_stock NUMERIC(10, 4) DEFAULT 0,
    PRIMARY KEY (warehouse_id, product_id)
);

CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    description VARCHAR(250),
    total_cost NUMERIC(10, 2),
    labor_cost NUMERIC(10, 2),
    overhead_cost NUMERIC(10, 2)
);

CREATE TABLE IF NOT EXISTS recipe_details (
    recipe_id INT REFERENCES recipes(id),
    ingredient_product_id INT REFERENCES products(id), -- The ingredient is also a product
    quantity NUMERIC(10, 4) NOT NULL,
    cost NUMERIC(10, 4),
    PRIMARY KEY (recipe_id, ingredient_product_id)
);

CREATE TABLE IF NOT EXISTS restaurant_tables (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    area_id INT REFERENCES areas(id),
    position_x INT DEFAULT 0,
    position_y INT DEFAULT 0,
    capacity INT DEFAULT 4,
    status VARCHAR(20) DEFAULT 'AVAILABLE', -- AVAILABLE, OCCUPIED, RESERVED
    current_order_id INT -- Link to active order if any
);

-- =============================================
-- 3. Transactions & Operations
-- =============================================

CREATE TABLE IF NOT EXISTS orders ( -- TBL_COMANDA
    id SERIAL PRIMARY KEY,
    table_id INT REFERENCES restaurant_tables(id),
    waiter_id INT REFERENCES staff(id),
    customer_id INT REFERENCES customers(id),
    order_number VARCHAR(20),
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, SERVED, PAID, CANCELLED
    total_amount NUMERIC(10, 2) DEFAULT 0,
    observation TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items ( -- TBL_DETALLE_COMANDA
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL DEFAULT 1,
    unit_price NUMERIC(10, 2) NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL, -- quantity * unit_price
    notes VARCHAR(150),
    status VARCHAR(20) DEFAULT 'PENDING' -- PENDING, KITCHEN, SERVED
);

CREATE TABLE IF NOT EXISTS invoices ( -- TBL_FACTURA (Sales Documents)
    id SERIAL PRIMARY KEY,
    document_type_id INT REFERENCES document_types(id),
    series VARCHAR(10),
    number VARCHAR(20),
    order_id INT REFERENCES orders(id),
    customer_id INT REFERENCES customers(id),
    issue_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMPTZ,
    currency VARCHAR(3) DEFAULT 'PEN',
    
    total_taxed NUMERIC(10, 2) DEFAULT 0,
    total_unaffected NUMERIC(10, 2) DEFAULT 0, -- Inafecto
    total_exonerated NUMERIC(10, 2) DEFAULT 0, -- Exonerado
    total_igv NUMERIC(10, 2) DEFAULT 0,        -- Tax amount
    total_amount NUMERIC(10, 2) NOT NULL,      -- Grand total
    
    status VARCHAR(20) DEFAULT 'ISSUED', -- ISSUED, ANNULLED
    notes TEXT,
    
    -- Electronic Billing (Facturacion Electronica) fields
    sunat_hash VARCHAR(255),
    sunat_status VARCHAR(50),
    sunat_error_message TEXT,
    
    created_by INT REFERENCES staff(id)
);

CREATE TABLE IF NOT EXISTS invoice_items ( -- TBL_DETALLE_FACTURA
    id SERIAL PRIMARY KEY,
    invoice_id INT REFERENCES invoices(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    quantity NUMERIC(10, 4) NOT NULL,
    unit_price NUMERIC(10, 4) NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    description VARCHAR(255) -- Snapshot of product name at time of sale
);

CREATE TABLE IF NOT EXISTS inventory_transactions ( -- TBL_KARDEX
    id SERIAL PRIMARY KEY,
    warehouse_id INT REFERENCES warehouses(id),
    product_id INT REFERENCES products(id),
    transaction_type VARCHAR(20) NOT NULL, -- PURCHASE, SALE, ADJUSTMENT, TRANSFER
    quantity NUMERIC(10, 4) NOT NULL, -- Positive for entry, negative for exit
    stock_balance NUMERIC(10, 4) NOT NULL, -- Balance after transaction
    reference_document VARCHAR(50), -- Invoice #, Order #
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES staff(id)
);

CREATE TABLE IF NOT EXISTS purchases ( -- TBL_COMPRA
    id SERIAL PRIMARY KEY,
    supplier_id INT REFERENCES suppliers(id),
    document_type_id INT REFERENCES document_types(id),
    series VARCHAR(20),
    number VARCHAR(50),
    issue_date TIMESTAMPTZ,
    total_amount NUMERIC(10, 2),
    currency VARCHAR(3) DEFAULT 'PEN',
    status VARCHAR(20) DEFAULT 'COMPLETED',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS purchase_items ( -- TBL_DETALLE_COMPRA
    id SERIAL PRIMARY KEY,
    purchase_id INT REFERENCES purchases(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    quantity NUMERIC(10, 4) NOT NULL,
    unit_price NUMERIC(10, 4) NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_table ON orders(table_id);
CREATE INDEX idx_invoices_customer ON invoices(customer_id);
CREATE INDEX idx_invoices_date ON invoices(issue_date);
CREATE INDEX idx_kardex_product ON inventory_transactions(product_id);
CREATE INDEX idx_kardex_date ON inventory_transactions(created_at);


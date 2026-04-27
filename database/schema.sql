-- Devopstrio API-First Design Studio
-- Enterprise Database Schema definition
-- Target: PostgreSQL 14+

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tenant Isolation Table
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    domain VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Users & RBAC
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Developer', -- Admin, Architect, Developer, Consumer
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- API Portfolio Catalog
CREATE TABLE IF NOT EXISTS apis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    system_of_record VARCHAR(255),
    business_unit VARCHAR(100),
    visibility VARCHAR(50) DEFAULT 'Internal', -- Internal, Partner, Public
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contracts & Specifications (OpenAPI, GraphQL, etc)
CREATE TABLE IF NOT EXISTS contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    api_id UUID REFERENCES apis(id) ON DELETE CASCADE,
    version_tag VARCHAR(50) NOT NULL,
    spec_type VARCHAR(50) DEFAULT 'OpenAPIv3', -- OpenAPIv3, AsyncAPI, GraphQL
    raw_content TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Draft', -- Draft, Review, Approved, Deprecated
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(api_id, version_tag)
);

-- Governance Engine Results
CREATE TABLE IF NOT EXISTS governance_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
    score INTEGER NOT NULL, -- 0 to 100
    validation_errors JSONB DEFAULT '[]',
    validation_warnings JSONB DEFAULT '[]',
    ruleset_version VARCHAR(50) NOT NULL,
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- External Consumers & Auth Keys
CREATE TABLE IF NOT EXISTS consumers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    consumer_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    consumer_id UUID REFERENCES consumers(id) ON DELETE CASCADE,
    api_id UUID REFERENCES apis(id) ON DELETE CASCADE,
    hashed_key VARCHAR(512) NOT NULL,
    rate_limit_profile VARCHAR(50) DEFAULT 'Standard',
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Metrics & Telemetry Summaries
CREATE TABLE IF NOT EXISTS analytics_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    api_id UUID REFERENCES apis(id) ON DELETE CASCADE,
    consumer_id UUID REFERENCES consumers(id) ON DELETE SET NULL,
    metric_date DATE NOT NULL,
    total_calls BIGINT DEFAULT 0,
    error_4xx BIGINT DEFAULT 0,
    error_5xx BIGINT DEFAULT 0,
    p95_latency_ms FLOAT,
    UNIQUE(api_id, consumer_id, metric_date)
);

-- Audit Trailing
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action_type VARCHAR(255) NOT NULL,
    entity_id UUID NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_apis_tenant ON apis(tenant_id);
CREATE INDEX idx_contracts_api ON contracts(api_id);
CREATE INDEX idx_analytics_api ON analytics_metrics(api_id, metric_date);

<div align="center">

<img src="https://raw.githubusercontent.com/Devopstrio/.github/main/assets/Browser_logo.png" height="85" alt="Devopstrio Logo" />

<h1>API-First Design Studio</h1>

<p><strong>Enterprise Platform for API Design, Governance, Code Generation, and Lifecycle Mastery</strong></p>

[![Architecture](https://img.shields.io/badge/Architecture-Contract_First-522c72?style=for-the-badge&labelColor=000000)](https://devopstrio.co.uk/)
[![Cloud](https://img.shields.io/badge/Platform-Azure_Native-0078d4?style=for-the-badge&logo=microsoftazure&labelColor=000000)](/terraform)
[![Governance](https://img.shields.io/badge/Standard-Enterprise_Strict-962964?style=for-the-badge&labelColor=000000)](/apps/governance-engine)
[![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge&labelColor=000000)](https://devopstrio.co.uk/)

</div>

---

## 🏛️ Executive Summary

![API-First Design Studio Architecture](assets/diagram-architecture.png)

The **API-First Design Studio** enforces "Contract-First" engineering principles across the enterprise. It shifts API development left by separating contract definition and governance from backend implementation. By the time a developer writes backend code, the API has already been mathematically validated against security, naming, and architectural standards.

### Strategic Business Outcomes
- **Accelerated Time-to-Market**: Microservices teams can work in parallel using auto-generated Server Stubs and Mock Servers.
- **Strict Governance Checkmating**: The Governance Engine blocks deployment pipelines if contracts violate OpenAPI standards, pagination rules, or enterprise security headers.
- **Consumer Trust**: Backward-compatibility analysis prevents breaking changes before they hit production.
- **API Cataloging**: Single pane of glass Developer Portal for consuming internal, external, and partner APIs.

---

## 🏗️ Technical Architecture Details

### 1. High-Level Architecture
```mermaid
graph TD
    UI[Studio Portal UI] --> API[Platform API Gateway]
    API --> DB[(PostgreSQL Metadata)]
    API --> GOV[Governance Engine]
    API --> GEN[Code Generation Engine]
    API --> MCK[Mock Testing Engine]
    DEV[Developer Portal] --> API
```

### 2. Contract-First Lifecycle
```mermaid
sequenceDiagram
    participant Architect
    participant Studio
    participant Gov Engine
    participant Dev Team
    participant Consumers
    
    Architect->>Studio: Draft OpenAPI v3 Spec
    Studio->>Gov Engine: Validate Naming & Auth
    Gov Engine-->>Studio: Score 98% (Pass)
    Studio->>Dev Team: Generate FastAPI Server Stubs
    Studio->>Consumers: Launch Mock Server Endpoint
    Dev Team->>Consumers: Implement Backend Parallelly
```

### 3. API Publish Workflow
```mermaid
graph LR
    Draft[Draft Contract] --> Review[Architecture Review]
    Review --> Approved[Contract Approved]
    Approved --> Build[Backend Implementation]
    Build --> Deploy[Deploy to APIM]
    Deploy --> Catalog[Publish to Developer Catalog]
```

### 4. Governance Validation Flow
```mermaid
graph TD
    Spec[OpenAPI YAML] --> Parser[Schema Parser]
    Parser --> Security[Header/Auth Check]
    Parser --> Style[REST Naming Conventions]
    Parser --> Breaking[Backwards Compatibility Check]
    Security --> Aggregator[Scoring Engine]
    Style --> Aggregator
    Breaking --> Aggregator
    Aggregator -->|Threshold < 80%| Rejected
    Aggregator -->|Threshold >= 80%| Approved
```

### 5. SDK Generation Flow
```mermaid
graph TD
    Spec(Approved OpenAPI) --> Codegen[Code Generation Engine]
    Codegen --> TS[TypeScript Axios Client]
    Codegen --> PY[Python Request Client]
    Codegen --> CS[C# .NET HttpClient]
    TS --> Npm[NPM Internal Registry]
    PY --> PyPi[Private PyPi]
```

### 6. Mock Testing Flow
```mermaid
graph LR
    Consumer[Frontend App] --> Gateway[API Gateway Mock Route]
    Gateway --> Engine[Mock Engine]
    Engine --> DB[(Schema Artifacts)]
    Engine --> Generator[Faker.js Payload Gen]
    Generator --> Consumer
```

### 7. Security Trust Boundary
```mermaid
graph TD
    subgraph External_Network
        Internet((Internet))
    end
    subgraph DMZ_WAF
        APIM[Azure API Management]
    end
    subgraph Private_Network
        AKS[AKS Microservices]
        RDS[(PostgreSQL)]
    end
    Internet -->|TLS/OAuth| APIM
    APIM -->|Private Link| AKS
    AKS -->|VNet Integration| RDS
```

### 8. AKS Microservice Topology
```mermaid
graph TD
    subgraph platform_namespace
        API[API Router]
        GOV[Governance Pods]
        MOCK[Mocking Pods]
        GEN[Codegen Pods]
    end
    API --> GOV
    API --> MOCK
    API --> GEN
```

### 9. Request Routing Lifecycle
```mermaid
graph LR
    User --> CDN[Cloudflare / FrontDoor]
    CDN --> WAF[WAF Inspection]
    WAF --> APIM[API Management Gateway]
    APIM --> IDP[Entra ID Auth Z]
    APIM --> Backend[AKS Backend Service]
```

### 10. Contract CI/CD Pipeline
```mermaid
graph TD
    PR[Pull Request OpenAPI] --> Lint[Spectral Linter]
    Lint --> Diff[OpenAPI Diff Breaking Change]
    Diff --> Merge[Merge to Main]
    Merge --> Sync[Sync to Studio Catalog]
```

### 11. Multi-Tenant Architecture
```mermaid
graph TD
    App[Studio Platform] --> DB[(Tenanted Database)]
    DB --> Retail[Retail BU Schema]
    DB --> Fin[Finance BU Schema]
    DB --> HR[HR BU Schema]
```

### 12. Developer Portal Onboarding
```mermaid
sequenceDiagram
    participant Partner
    participant Portal
    participant APIM
    
    Partner->>Portal: Request API Access
    Portal->>Portal: Enforce NDA / Terms
    Portal->>APIM: Generate Sub Key
    APIM-->>Portal: key_live_xyz
    Portal-->>Partner: Provide Credentials & SDK
```

### 13. Analytics Data Flow
```mermaid
graph LR
    Gateway[APIM / Ingress] -->|Logs| EH[Event Hubs]
    EH --> Stream[Stream Analytics]
    Stream --> DB[(Data Warehouse)]
    DB --> Dashboard[Analytics Engine UI]
```

### 14. Version Migration Lifecycle
```mermaid
graph TD
    V1[v1.0 Active] --> V2[v2.0 Draft]
    V2 --> Publish[v2.0 Published]
    Publish --> Deprecate[v1.0 Deprecated (Header Warning)]
    Deprecate --> Sunset[v1.0 Sunset (410 Gone)]
```

### 15. Disaster Recovery Topology
```mermaid
graph LR
    Traffic[Global Traffic Routing]
    Traffic --> UKS[UK South Active]
    Traffic -.-> UKW[UK West Passive]
    UKS --> DB_A[(Primary DB)]
    UKW --> DB_B[(Replica DB)]
    DB_A -.->|Geo-Sync| DB_B
```

---

## 🛠️ Global Platform Components

| Engine | Directory | Purpose |
|:---|:---|:---|
| **Studio Portal** | `apps/studio-portal/` | Next.js visual designer and architect command center. |
| **API Gateway** | `backend/src/` | FastAPI central nervous system coordinating the engines. |
| **Governance Engine**| `apps/governance-engine/`| Validates OpenAPI artifacts against institutional RFCs. |
| **Codegen Engine** | `apps/codegen-engine/` | Auto-generates server stubs, SDKs, and Postman collections. |
| **Mock Engine** | `apps/mock-engine/` | Instantiates dynamic mock servers based on contract schemas. |
| **Developer Portal** | `apps/developer-portal/`| Consumer-facing catalog for discovery and onboarding. |

---

## 🚀 Deployment Operations

Provision the infrastructure using the provided Bicep or Terraform pipelines.

```bash
# Example Terraform Rollout
cd terraform/environments/prod
terraform init
terraform apply -auto-approve
```

---
<sub>&copy; 2026 Devopstrio &mdash; Managing the API Economy.</sub>

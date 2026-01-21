# SKILL.md
## AVR Associates – CA Management ERP

This document defines the **skills, competencies, and responsibilities** required to design, build, operate, and scale the AVR Associates ERP as an **enterprise-grade production system**.  
It also serves as a **governance guide** for AI-assisted development using Antigravity Agent Mode.

---

## 1. Core Engineering Skills

### 1.1 Frontend Engineering (Admin & Client Portal)
**Stack**
- React 19 (Functional Components)
- TypeScript (strict mode)
- Tailwind CSS
- Recharts
- Lucide React
- Vite

**Required Skills**
- Component-driven UI architecture
- State management (context/hooks)
- Form handling with validation
- File uploads (FormData, previews)
- Role-based UI rendering
- Responsive & accessible design
- Performance optimization (memoization, lazy loading)

**Enterprise Expectations**
- Clear separation of Admin vs Client UI
- Predictable state flows
- Consistent design language
- Zero direct business logic in UI components

---

### 1.2 Backend Engineering (API & Services)
**Stack**
- Node.js / Express (or PHP APIs for legacy modules)
- RESTful API design
- JWT authentication
- Role-Based Access Control (RBAC)
- Multi-branch data isolation

**Required Skills**
- Secure API design
- Middleware-based authorization
- Validation & sanitization
- File upload handling
- Error handling & logging
- Pagination & filtering
- Soft deletes & audit safety

**Enterprise Expectations**
- No business logic in controllers
- Predictable response formats
- Explicit error codes
- Idempotent operations where applicable

---

## 2. Domain & Business Skills (CA / FinTech)

### 2.1 Chartered Accountant Domain Knowledge
- GST compliance workflows
- TDS & Income Tax deadlines
- Audit project lifecycle
- Client onboarding processes
- Statutory calendars
- Document sensitivity handling

**Expectation**
> Domain logic correctness is **more important than code elegance**.

---

### 2.2 Financial & Billing Logic
- Time-based billing
- Hourly rate calculations
- Yield margin analysis
- Paid vs unpaid invoice lifecycle
- Financial data immutability principles

**Expectation**
- All calculations must be deterministic
- Financial records must be auditable
- Historical data must never be silently modified

---

## 3. Security & Compliance Skills

### 3.1 Application Security
- JWT & refresh token handling
- Secure file uploads
- Rate limiting
- CORS management
- Secure headers
- Input validation

### 3.2 Data Protection
- Client data isolation
- Branch-level access control
- Least-privilege RBAC
- Secure document storage

**Expectation**
> Assume every external request is hostile.

---

## 4. Architecture & System Design Skills

### 4.1 Enterprise Architecture
- Modular monolith or service-based design
- Clear domain boundaries
- Extensible compliance engine
- Scalable task & time tracking engine

### 4.2 Multi-Branch & Multi-Tenant Thinking
- Branch-aware queries
- Global vs branch-level views
- Admin cross-branch visibility
- Client data isolation

---

## 5. Observability & Operations

### Required Skills
- Structured logging
- Audit trails for sensitive actions
- Error monitoring
- Performance monitoring
- Debuggable production builds

**Expectation**
> If it cannot be observed, it cannot be trusted.

---

## 6. Testing & Quality Assurance

### Testing Levels
- Unit tests (business logic)
- Integration tests (API + DB)
- Negative test cases
- Role & permission tests
- Regression tests for compliance deadlines

**Expectation**
- Auth, billing, and compliance logic must be tested first
- No feature is “done” without verification steps

---

## 7. AI-Assisted Development Skills (Antigravity Mode)

### 7.1 Allowed AI Responsibilities
- Feature implementation
- Multi-file refactoring
- UI wiring
- CRUD generation
- Boilerplate creation
- Test scaffolding

### 7.2 Human-Only Responsibilities
- Architecture decisions
- Security policy definition
- Compliance interpretation
- Financial calculation approval
- Production readiness sign-off

### 7.3 AI Governance Rules
- AI must follow existing folder structure
- AI must not invent business rules
- AI must request review before risky changes
- All AI output is reviewed by a human

---

## 8. Role-Based Skill Expectations

### Admin (System Owner)
- Full system understanding
- Cross-branch visibility
- Financial & reporting access
- Audit responsibility

### Employee (Staff)
- Task execution
- Time tracking accuracy
- Client interaction discipline

### Client (External User)
- Minimal UI exposure
- Read-only compliance tracking
- Secure document exchange

---

## 9. Production Readiness Skills

### Mandatory Before Release
- Security review completed
- Financial calculations verified
- Compliance deadlines validated
- Client data isolation tested
- Manual verification checklist executed

---

## 10. Engineering Mindset

- Correctness over speed
- Auditability over convenience
- Clarity over cleverness
- Stability over premature optimization

> **This ERP is a professional system for professionals.  
Trust is the core feature.**

---

## Maintainers
- Product Owner / Architect: Human
- Implementation Engineer: Antigravity Agent (Governed)
- Final Authority: Human Review


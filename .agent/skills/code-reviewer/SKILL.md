# SKILL.md
## Gatla Foundation Digital Platform

This document defines the **skills, competencies, and development standards** required to build, maintain, and scale the Gatla Foundation Digital Platform.  
It also acts as a **governance guide** for AI-assisted development using Antigravity Agent Mode.

---

## 1. Core Engineering Skills

### 1.1 Frontend Engineering (Public Website & Admin Dashboard)

**Technology Stack**
- React.js
- Tailwind CSS
- Lucide React (Icons)
- JavaScript (ES6+)

**Required Skills**
- Component-based UI design
- Controlled form handling
- Modal-driven UX flows
- File upload handling via FormData
- Conditional rendering for Admin vs Public UI
- Reusable table components
- Client-side validation

**Enterprise Expectations**
- Public pages must remain lightweight and accessible
- Admin dashboard must be data-dense and efficient
- No backend logic embedded in frontend components
- Clear separation between **Public Forms** and **Admin Forms**

---

### 1.2 Backend Engineering (PHP + MySQL)

**Technology Stack**
- Native / Procedural PHP
- MySQL
- JSON-based APIs
- Razorpay Web Checkout

**Required Skills**
- Secure form handling
- Multipart form processing
- File upload validation
- MySQL CRUD operations
- JSON request handling
- Consistent API response structures
- Payment ID tracking

**Enterprise Expectations**
- All APIs must be predictable and stateless
- Files must be safely stored with collision-resistant naming
- Database writes must be atomic
- No direct echoing of sensitive data

---

## 2. Domain & Platform Skills

### 2.1 Philanthropy Platform Understanding
- Donation-driven workflows
- Volunteer management
- Non-profit transparency
- Public trust preservation
- Sensitive personal data handling

**Expectation**
> The platform must prioritize **trust, clarity, and simplicity** over complexity.

---

### 2.2 Pillar-Based Modular Thinking

Each initiative (Pillar) is an independent domain:
- Education
- Cricket (Sports)
- Music
- Business
- Awards
- General / Finance

**Expectation**
- Pillars must be logically isolated
- Shared utilities must be centralized
- Changes in one pillar must not break others

---

## 3. Payments & Financial Handling

### Payment Gateway
- Razorpay

**Required Skills**
- Client-side checkout integration
- Server-side payment ID validation
- JSON request processing
- Donation record immutability

**Enterprise Expectations**
- Payment IDs must always be stored
- No recalculation or mutation of donation records
- Payment failures must not create partial records

---

## 4. File Handling & Storage

### File Uploads
- Student documents
- Disability certificates
- Photos
- ID proofs

**Required Skills**
- PHP `move_uploaded_file`
- MIME type validation
- Safe file naming with timestamps
- Public vs protected file access distinction

**Expectation**
> Files are treated as **sensitive assets**, not generic uploads.

---

## 5. Database & Data Modeling

### Required Skills
- Table-per-form modeling
- Clear column naming
- Timestamp-based ordering
- Referential consistency (where applicable)
- Query optimization for admin views

### Key Principles
- No silent data overwrites
- Submissions are append-only
- Admin edits (if added later) must be audited

---

## 6. API Design Skills

### Submission APIs (`submit_*.php`)
- Accept `multipart/form-data` OR `application/json`
- Validate required fields
- Return clear success/failure JSON
- Handle file and non-file submissions correctly

### Retrieval APIs (`get_*.php`)
- Return clean JSON arrays
- Order by submission date DESC
- Used exclusively by Admin Dashboard

**Expectation**
> API behavior must remain consistent across all pillars.

---

## 7. Admin Dashboard Engineering

### Required Skills
- Tab-based navigation
- Data table rendering
- Dynamic form selection
- File link detection & rendering
- State-driven UI updates

**Key Components**
- DashboardApp.jsx
- Sidebar.jsx
- DataTable.jsx
- FormModal.jsx

**Expectation**
- Admin dashboard is a **control center**, not a public UI
- Admin views must favor clarity over aesthetics

---

## 8. AI-Assisted Development (Antigravity Agent Mode)

### Allowed AI Responsibilities
- CRUD form generation
- API wiring
- UI cleanup & consistency
- Refactoring repeated logic
- Dashboard data integrations
- Implementation plan generation

### Human-Only Responsibilities
- Architecture decisions
- Payment workflow approval
- Data privacy decisions
- Pillar prioritization
- Production deployment

### AI Governance Rules
- AI must not invent business rules
- AI must respect existing file & DB structure
- AI must request approval before destructive changes
- All AI-generated changes are reviewed by humans

---

## 9. Security & Trust Skills

### Required Skills
- Input sanitization
- SQL injection prevention
- Safe file access
- Payment data isolation
- Admin-only endpoint protection

**Expectation**
> This platform handles real donors and vulnerable individuals.  
Security and dignity are mandatory.

---

## 10. Testing & Verification

### Manual Verification Required For:
- Form submissions
- File uploads
- Donation success/failure
- Admin dashboard data rendering
- Razorpay payment flows

**Expectation**
- No feature is complete without admin-side verification

---

## 11. Engineering Mindset

- Stability over speed
- Trust over features
- Clarity over cleverness
- Reusability over duplication

> **This platform represents a public-facing foundation.  
Every bug impacts trust.**

---

## Maintainers
- Product Owner / Decision Maker: Human
- Implementation Engineer: Antigravity Agent (Governed)
- Final Authority: Human Review

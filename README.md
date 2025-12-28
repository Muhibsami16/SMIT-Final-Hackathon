# Gravity Zakat Donation System

A production-ready MERN stack application for managing donations and zakat.

## Tech Stack (2025 Standard)

- **Frontend**: Vite, React 19, React Router v7, Redux Toolkit, Shadcn UI (Tailwind CSS v4).
- **Backend**: Node.js 22 LTS, Express.js (ESM), MongoDB, Mongoose, Zod, JWT.
- **Tooling**: ESLint, Prettier.

## Project Structure

```text
.
├── client/          # React Frontend (Vite)
├── server/          # Node.js Backend (Express)
├── .editorconfig   # Editor settings
├── .prettierrc     # Formatting settings
└── tech_stack.md   # Technical specifications
```

## Getting Started

### Prerequisites

- Node.js 22 LTS
- MongoDB

### Installation

1. **Clone the repository**
2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Update .env with your credentials
   npm run dev
   ```
3. **Setup Frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```

## Requirements

See `zakat system.md` for detailed functional requirements.

# Gravity Zakat Donation - Tech Stack (2025 Standard)

This document outlines the modern technical foundation for the Gravity Zakat Donation system, emphasizing security, scalability, and performance using the latest MERN stack ecosystem as of late 2025.

## 1. Frontend Architecture

| Category | Technology | Reason / Best Practice |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Utilizes newest features like `use`, improved metadata support, and simplified ref handling. |
| **Build Tool** | [Vite](https://vitejs.dev/) | Industry standard for fast HMR and optimized production builds. |
| **Routing** | [React Router v7](https://reactrouter.com/) | Uses Data Routers (`loaders`, `actions`) for centralized data handling and improved performance. |
| **State Management** | [Redux Toolkit (RTK)](https://redux-toolkit.js.org/) | Simplifies global state; uses **RTK Query** for efficient data fetching and caching. |
| **UI Library** | [Shadcn UI](https://ui.shadcn.com/) | Beautiful, accessible, and customizable components built on Radix UI and Tailwind CSS. |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS with improved performance and native CSS variable integration. |
| **Validation** | [Zod](https://zod.dev/) | Schema-first validation for forms and API responses. |
| **Forms** | [React Hook Form](https://react-hook-form.com/) | High-performance, flexible form validation with Zod integration. |
| **Language** | **JavaScript (ESM)** | Modern ES modules for native standard compatibility. |

## 2. Backend Architecture

| Category | Technology | Reason / Best Practice |
| :--- | :--- | :--- |
| **Runtime** | [Node.js 22 LTS](https://nodejs.org/) | Latest stable LTS with native `fetch`, enhanced security, and better performance. |
| **Framework** | [Express.js](https://expressjs.com/) | Minimalist and modular structure using ESM for modern modularity. |
| **Database** | [MongoDB](https://www.mongodb.com/) | Document-oriented for flexible schemas (Donations, Campaigns). |
| **ORM/ODM** | [Mongoose](https://mongoosejs.com/) | Strict schema definitions and object modeling for MongoDB. |
| **Auth** | [JWT](https://jwt.io/) + [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) | Secure token-based auth with hashed passwords. |
| **Validation** | [Zod](https://zod.dev/) | Request body/param validation middleware to prevent NoSQL injection. |
| **Architecture** | **Modular MVC** | Separation of Routes, Controllers, Models, and Middlewares. |

## 3. Security & Infrastructure

- **Secure Cookies**: JWTs stored in `httpOnly`, `secure`, and `sameSite` cookies to prevent XSS.
- **Security Headers**: [Helmet.js](https://helmetjs.github.io/) for setting secure HTTP headers.
- **Rate Limiting**: [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) to prevent brute-force attacks.
- **CORS Management**: Strict origin whitelisting for frontend communication.
- **PDF Generation**: [React-PDF](https://react-pdf.org/) or [Puppeteer](https://pptr.dev/) for generating high-quality donation receipts.
- **Environment Management**: `.env` files with strict validation to prevent misconfiguration.

## 4. Developer Tooling

- **Testing**: [Vitest](https://vitest.dev/) for unit and integration testing.
- **Linting/Formatting**: ESLint (Flat Config) + Prettier for code consistency.
- **Git Hooks**: [Husky](https://typicode.github.io/husky/) + [Lint-staged](https://github.com/lint-staged/lint-staged) to enforce quality before commits.
- **API Documentation**: Swagger/OpenAPI for clear backend documentation.

---

> [!IMPORTANT]
> This stack prioritizes **Production Readiness**. Do not use "simple" or "demo" implementations for critical logic like Zakat calculations or payment verification.

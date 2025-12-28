DETAILED MERN STACK PROMPT FOR ANTIGRAVITY AI

Project: Donation & Zakat Management System
Stack: MERN (MongoDB, Express.js, React.js, Node.js)

1. System Goal

Build a production-ready MERN web application for managing donations and zakat with User and Admin roles, secure authentication, dashboards, campaigns, receipts, and status tracking.

This is not a demo app.
Design for scalability, security, and real-world usage.

2. Tech Stack Requirements
Frontend

React.js

React Router

Axios for API calls

Context API or Redux Toolkit for global state

Tailwind CSS or Material UI for UI

Form validation using React Hook Form or Formik

JWT-based auth handling

Role-based route protection

Backend

Node.js + Express.js

MongoDB with Mongoose

JWT authentication

Bcrypt for password hashing

RESTful API structure

MVC or modular architecture

Proper error handling middleware

3. User Roles

There are two roles:

user (donor)

admin

Roles must be stored in MongoDB and enforced on:

Routes

API endpoints

UI visibility

4. Authentication & Authorization
User Model (MongoDB)

Fields:

name

email (unique)

phone

password (hashed)

role (user/admin)

createdAt

Auth Features

Signup API

Login API

JWT token generation

Protected routes

Logout (token removal)

Middleware:

authMiddleware

adminMiddleware

5. Donation System (Core Logic)
Donation Model

Fields:

userId (ref User)

campaignId (optional)

amount (number)

donationType (Zakat, Sadqah, Fitra, General)

category (Food, Education, Medical)

paymentMethod (Cash, Bank, Online)

status (Pending, Verified)

createdAt

Donation APIs

Create donation

Get donations by user

Get all donations (admin)

Update donation status (admin)

Filter donations by:

date

type

status

campaign

6. Campaign Management
Campaign Model

Fields:

title

description

goalAmount

collectedAmount (auto-calculated)

deadline

status (Active, Ended)

createdAt

Campaign APIs

Create campaign (admin)

Update campaign (admin)

Get all campaigns (public)

Get single campaign

Donate to campaign (link donation)

Ensure:

Campaign progress auto-updates

Deadline logic handled correctly

7. Receipt System
Receipt Logic

Receipt auto-generated after donation creation

Receipt includes:

Donor name

Donation amount

Donation type

Date

Payment method

Generate downloadable PDF receipt

Receipt linked to donation ID

Backend:

PDF generation using a Node library

Secure download endpoint

Frontend:

Download button per donation

8. User Dashboard (Frontend Logic)

Components:

Total donated amount (calculated from DB)

Donation history table

Status badges (Pending / Verified)

Download receipt button

Filters (date, type, status)

Data handling:

Fetch only logged-in user’s donations

Handle loading and empty states properly

9. Admin Dashboard

Components:

Total donations sum

Total donors count

Active campaigns count

Pending donations count

Admin Pages:

Donations Management

Donor List

Campaign Management

Admin Capabilities:

Verify donations

Search donors

Filter donations

Create and manage campaigns

10. API Architecture

Use RESTful conventions:

/api/auth
/api/users
/api/donations
/api/campaigns
/api/receipts


Include:

Proper HTTP status codes

Centralized error handler

Input validation

Clean folder structure

11. Frontend Routing Structure

Public:

/login

/register

/campaigns

/campaign/:id

User:

/dashboard

/donate

/receipts

Admin:

/admin/dashboard

/admin/donations

/admin/donors

/admin/campaigns

Use protected routes based on role.

12. Security & Best Practices

Never store passwords in plain text

JWT stored securely

Validate all inputs

Prevent unauthorized API access

Handle edge cases properly

13. Expected Output from Antigravity AI

MongoDB schemas

Express routes + controllers

Auth middleware

API endpoints

React components

Dashboard layouts

PDF receipt logic

Proper folder structure

Example API responses

Final Instruction to Antigravity AI

Think like a senior MERN engineer.
Do not simplify.
Do not skip backend logic.
Do not return pseudo-code only.
Build this as a real deployable system.
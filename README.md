# AdTech Campaign Manager

Fullstack technical evaluation project.

## Project Structure

- `backend/`: Node.js + Express + MongoDB API
- `frontend/`: Next.js + Tailwind CSS UI

##  Quick Start (How to Run)

You will need two terminal windows open.

### Terminal 1: Backend (Server)
```bash
cd backend
npm install
npm run dev
```
*The server will start on http://localhost:5000 and connect to MongoDB (Local or In-Memory)*

### Terminal 2: Frontend (UI)
```bash
cd frontend
npm install
npm run dev
```
*The app will be available at http://localhost:3000*

---

##  Features Implemented (Strictly per Requirements)

- **Backend**: Node.js + Express + MongoDB
- **Frontend**: Next.js + Tailwind CSS (Simple & Clean UI)
- **Features**: List, Create, Details, Status Toggle, Calculated Stats (CTR/CPC).

###  Bonus & Best Practices Added
- **Automated Tests**: Complete Jest/Supertest suite (`cd backend && npm test`).
- **Validation**: Joi validation for robust data integrity.
- **Architecture**: Separated Controllers/Routes/Models.
- **Pagination**: Backend supports `page` and `limit`.

## Improvements with more time
-   Dockerize the application for one-command startup.
-   Implement Authentication (Login/Signup).
-   Add graphical charts for statistics.

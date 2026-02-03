# AdTech Campaign Manager

Fullstack technical evaluation project.

## Project Structure

- `backend/`: Node.js + Express + MongoDB API
- `frontend/`: Next.js + Tailwind CSS UI

## How to Run

### Backend
1.  Navigate to `backend/`
2.  Install dependencies: `npm install`
3.  Start server: `npm run dev` (Runs on port 5000)

### API Endpoints
- `POST /campaigns` - Create a new campaign (Validation enabled)
- `GET /campaigns` - List all campaigns
  - Optional Query Params: `?page=1&limit=20&status=active`
- `GET /campaigns/:id` - Get campaign details
- `PATCH /campaigns/:id/status` - Toggle status (active/paused)
- `GET /campaigns/:id/stats` - Get campaign statistics (CTR, CPC)

### Frontend
1.  Navigate to `frontend/`
2.  Install dependencies: `npm install`
3.  Start dev server: `npm run dev` (Runs on port 3000)
4.  **Important**: If updating code, restart `npm run dev` to clear Next.js cache.

## Testing 🧪

The project includes an automated test suite using **Jest** and **Supertest**.

```bash
cd backend
npm test
```

This will run a full lifecycle test (Create -> Stats -> Update -> Delete) against an in-memory database.

## Tech Choices

-   **Backend**: Node.js/Express for simplicity and speed. MongoDB for flexible schema (perfect for campaign data which might evolve).
-   **Frontend**: Next.js (App Router) for modern React patterns and easy routing. Tailwind CSS for rapid styling.
-   **Validation**: Minimal manual validation for simplicity, but easily extensible with Joi or Zod.

## Improvements with more time
-   Add TypeScript to backend for type safety.
-   Add extensive unit and integration tests (Jest/Supertest).
-   Dockerize the application for easier deployment.
-   Implement authentication.

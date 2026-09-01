# AutoCare Frontend

A complete React + Vite frontend for the Vehicle Service Management backend.

## Backend endpoints expected

- POST /api/auth/register
- POST /api/auth/login
- GET/POST/PUT/DELETE /api/customers
- GET/POST/PUT/DELETE /api/vehicles
- GET/POST/PUT/DELETE /api/service-requests
- GET /api/admin/users

The frontend uses Vite's development proxy, so it calls `/api/...` and Vite forwards those requests to `http://localhost:5019`.

## Start

```bash
npm install
npm run dev
```

Frontend:
http://localhost:5173

Backend:
http://localhost:5019

## Important backend note

Your protected backend routes currently include authentication. The frontend sends:

`Authorization: Bearer <JWT>`

automatically when a token exists in localStorage.

The Admin page requires a JWT whose decoded role is `admin`.

## Vehicle fields used

- vehicleNumber
- vehicleType
- model
- customerId

## Service request fields used

- vehicle
- problem
- serviceDate
- status
- customerId

These match the fields documented in the project PDF.

## If you change backend route names

Update `src/api.js` only; the UI does not need to change.

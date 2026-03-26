# Equipment Tracker (React + Vite)

Equipment inventory UI for tracking PCs, digital devices, and network devices. Built with React 19, Vite (rolldown), React Router, Tailwind CSS, and a local `json-server` backend for data.

## Features
- Login screen (client-side only; no real auth yet)
- Dashboard with totals and charts
- Equipment list with search, condition/deployment filters, pagination
- Add/Edit equipment form
- CSV export (all or filtered)
- Category pages: PC, Digital Device, Network Device
- Light/Dark mode toggle and avatar menu

## Tech Stack
- React 19 + TypeScript
- Vite (rolldown build)
- React Router
- Tailwind CSS + Radix UI primitives
- Recharts for charts
- `json-server` for local API

## Getting Started
1) Install dependencies
```bash
npm install
```

2) Start the local API (json-server)
```bash
npm run server
```

3) Start the app (new terminal)
```bash
npm run dev
```

The frontend expects the API at `http://localhost:3000/equipments`.

## Scripts
- `npm run dev` - Start Vite dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run server` - Start json-server on port 3000

## Data
Local data is stored in `src/data/db.json` and served by `json-server`.

## Routes
- `/` Login
- `/dashboard` Dashboard
- `/equipments` All equipment
- `/equipments/add` Add equipment
- `/equipments/edit/:id` Edit equipment
- `/pc` PC inventory
- `/digital-device` Digital device inventory
- `/network-device` Network device inventory

## Notes
- The login form is UI-only; navigation is client-side.
- Update the API base URL if you run json-server on a different host/port.

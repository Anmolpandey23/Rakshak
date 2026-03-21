# RAKSHAK Dashboard

RAKSHAK is an industrial safety monitoring dashboard built with React and Vite.
It provides real-time worker tracking, pre-entry approval flows, alert timelines, ward risk mapping, worker profile management, and daily reporting.

## Tech Stack

### Frontend
- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS 3
- Lucide React (icons)
- CLSX (class composition)

### Data, Realtime, and Services
- Axios (API-ready HTTP layer)
- Socket.io-client (real-time stream integration hook)
- Mock services to mirror backend endpoints

### Visualization and Mapping
- Chart.js + react-chartjs-2
- Leaflet + react-leaflet

### Build and Quality
- ESLint 9
- PostCSS + Autoprefixer

## Key Features Implemented

- Live Monitoring dashboard with:
	- Real-time worker updates (mocked socket stream)
	- Alert sound trigger for danger/critical events
	- Worker filters (all, alerts only, by ward)
	- Worker search and selection
	- Interactive map markers and card focus actions

- Pre-Entry Gate:
	- Manhole status cards (SAFE, UNSAFE, PENDING)
	- Gas readings and reason display
	- Depth-based chart
	- Approve entry action with UNSAFE override confirmation

- Alert History:
	- Timeline cards
	- Severity/status filtering
	- Acknowledge action with feedback

- Risk Map:
	- Ward-based risk overlays
	- Legend and risk threshold filter
	- Solapur, Maharashtra map coordinates

- Worker Profiles:
	- Searchable worker table
	- Health trend charts
	- Assign jacket action
	- Emergency contact save action

- Daily Report:
	- KPI cards
	- Alerts by hour chart
	- Alerts table
	- Generate PDF via `window.print()`

- Settings:
	- Audio toggle
	- Refresh interval slider
	- Theme preference: White (default), Auto, Dark
	- Local persistence with reset defaults

- UI/UX system:
	- Reusable components (`Card`, `Badge`, `StatusDot`, `Loader`, `ChartWrapper`)
	- Loading, empty, and error states
	- Global error boundary fallback
	- Theme-aware chart colors and cross-theme surface contrast tuning

## Application Routes

- `/` -> Live Monitoring
- `/live` -> Live Monitoring
- `/gate` -> Pre-Entry Gate
- `/alerts` -> Alert History
- `/map` -> Risk Map
- `/workers` -> Worker Profiles
- `/report` -> Daily Report
- `/settings` -> Settings

## Project Structure

```text
src/
	app/
		App.jsx
		routes.jsx
	components/
		charts/
		map/
		ui/
		worker/
	constants/
	context/
	hooks/
	screens/
	services/
	styles/
	utils/
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

Open:
- `http://localhost:5173/`
- `http://localhost:5173/live`

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Deployment (Netlify)

Netlify SPA routing is configured through `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- Redirect: `/*` -> `/index.html` with status `200`

This ensures deep links like `/live`, `/alerts`, and `/workers` work after deployment.

## Theme Behavior

- Default theme: **White**
- Available options: **White**, **Auto (System)**, **Dark**
- Theme preference is saved in local storage (`rakshak.settings`)
- Auto mode follows OS color scheme changes

## Notes

- Current realtime and service responses are mock-driven but backend-ready.
- The API and hook structure is designed for easy replacement with real endpoints and socket events.

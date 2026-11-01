# EventAura — Event Experience & Booking Platform

EventAura is a premium React event discovery and booking prototype. Customers can explore curated experiences, personalize event details and decor, calculate an estimate, complete a mock advance-payment flow, and download a personalized ticket PDF with a unique QR code. Organizers have a demo admin dashboard with booking analytics and QR/manual ticket check-in.

## Features

- Event discovery and category browsing.
- Event customization: event name, date, city, guest count, theme and decor add-ons.
- Guest details and optional guest photo on the ticket.
- Booking summary, cancellation-condition demonstration and mock payment (no money is collected).
- Personalized ticket PDF with unique QR code and booking reference.
- Demo organizer dashboard: booking count, guest count, check-in count, estimated booking value, recent bookings and search.
- Ticket validation by live QR scanner or manual booking ID.
- First valid check-in is accepted; repeated attempts are rejected as already used; unknown IDs are rejected as invalid.
- Check-in timestamp stored with the booking in browser localStorage.

## Tech stack

- React 18 + Vite
- Express.js starter API
- Lucide React icons
- `qrcode` for ticket QR generation
- `html5-qrcode` for camera scanning
- `html2canvas` + `jsPDF` for ticket PDF export
- Browser localStorage for demo account and booking data

## Run locally

Requires Node.js 18 or later.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

Optional Express API, in a second terminal:

```bash
npm run server
```

API health endpoint: http://localhost:8080/api/health

Build production assets:

```bash
npm run build
```
## Proof of Work
1. Main Dashboard
   ![image alt](https://github.com/madhuradarshinirm/EventAura-Copy/blob/10cb3426873ded26f125e8ff775799dc4cf35baa/Screenshot%202026-11-01%20224200.png)
2. Admin Dashboard
4. Event Ticket
## Demo admin access

1. Sign out of any existing customer session.
2. Choose **Sign in**.
3. Use the demo organizer credentials shown in the sign-in panel:
   - Email: `admin@eventaura.demo`
   - Password: `EventAura@2026`
4. The Admin Dashboard opens. Use **Ticket check-in** to scan a QR code or enter a booking reference manually.

Create customer bookings in the same browser first. The demo admin dashboard reads the same browser's local booking store. If the browser has no bookings, the dashboard will be empty.

## Test ticket verification

1. Create a customer account and complete a demo booking.
2. Open **My bookings** and open the ticket; note the booking reference printed below the QR code.
3. Sign out and sign in using the demo admin credentials above.
4. Open **Ticket check-in**.
5. Either scan the QR code displayed on another screen/device or enter the booking reference manually.
6. A valid unused ticket shows **Verified successfully** and is marked checked in.
7. Enter the same ID again to see **Already used**. Enter an unknown ID to see **Invalid ticket**.

Camera scanning requires permission and is generally available on `localhost` or an HTTPS deployment. Manual code entry works without camera access.

## Important prototype limitations

- **Demo authentication only:** the demo admin credentials are visible in the project and role checks happen in the frontend. This is for a presentation prototype, not real security. Anyone with source access can discover the credentials.
- **Browser-local data:** accounts, bookings and check-ins are stored in localStorage. They are not synchronized across browsers, devices or organizers. Admin analytics only reflect bookings created in the same browser profile.
- **Not production ticket security:** QR contents contain a booking reference, not a signed or tamper-resistant token. Production verification must happen server-side against a shared database, with authenticated organizer roles, authorization checks, rate limiting, audit logs and signed/unguessable ticket tokens.
- **Mock payment only:** no actual payment is processed, no vendor reservation is created and availability is not confirmed. Displayed amounts are estimates only.
- **Cancellation terms:** sample terms are for UX demonstration. A real refund/cancellation policy must be reviewed for the applicable law and vendor contract before collecting payment.
- **AI planner:** responses are deterministic demo guidance; no external AI API is connected.
- **No SMS/email provider:** messaging integrations are intentionally not included in this version.

## Deployment

For a static frontend deployment, use build command `npm run build` and output directory `dist`. The Express API is a separate service unless deployed as a single Node service. For a combined Render-style Node service, use build command `npm install && npm run build` and start command `NODE_ENV=production npm start`.

Before production, replace localStorage auth/data with Firebase Authentication and Firestore (or another backend), enforce server-side organizer permissions, implement secure ticket tokens and server-side single-use check-in transactions, and connect a real payment provider with verified webhooks.

## Repository size

Do not commit `node_modules/`, `dist/`, `.env`, or real credentials. These are excluded by `.gitignore`.

## License

MIT

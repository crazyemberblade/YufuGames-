YufuGames v14 – profile home, followers, profile post creation, community UX and navigation fixes.

Firebase: publish firestore.rules after deploying.

## v16 — Smart Check Device redesign
- Replaced the old manual RAM / Storage / Chipset compatibility form.
- New flow: Device Name → Game Name → Analyze Compatibility → Result report.
- White first-background, premium playful card layout, mobile-first.
- Result area uses a subtle gray surface and is prepared for device-spec + game-requirement matching.
- The current static build uses the existing local game requirement reference for the first UI phase; a reliable live web-spec lookup layer requires a backend/API connection and should be wired in the next phase rather than pretending browser-side data is authoritative.

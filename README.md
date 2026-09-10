# YufuGames v3

Static GitHub Pages-ready prototype.

## Included
- Hero landing page with Enter, Need Help, Community and creator credit
- Community access gate
- Google sign-in UI/prototype state
- Expanded local game compatibility database
- Snapdragon, Dimensity, Helio, Exynos, Tensor and Unisoc chipsets
- No separate "Octa Processor" category
- Community categories for BGMI, Free Fire, Minecraft, Call of Duty, MadOut2 and Grand RP Mobile

## Important
The current sign-in flow is a prototype UI state. For real Google-only authentication, connect Firebase Authentication and replace the demo sign-in handler with Firebase GoogleAuthProvider.

## GitHub Pages
Upload all files to repository root, then enable Settings → Pages → Deploy from branch → main / root.

## YufuGames v12 — Player ID Card
- Adds a highlighted Player ID Card entry on the landing page.
- Google-signed-in users are sent to the ID Card creation screen if they do not yet have an ID.
- ID number format: `#441.Og#` (one or more digits + exactly two letters).
- ID number uniqueness is global through Cloud Firestore; the ID name does not need to be unique.
- Profile picture is selected from the device gallery and resized before saving.

### Firebase Firestore setup required
Enable **Cloud Firestore** in the Firebase console and publish the included `firestore.rules`. The website uses the collections `yufuUsers` and `yufuIdNumbers`.

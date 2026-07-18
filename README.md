# Ecommerce Mobile

Expo e-commerce app (display-only) with production-ready workspace setup.

## Prerequisites

- Node.js 20.19+ ([nodejs.org](https://nodejs.org)) — required for Expo SDK 54
- npm or yarn
- Expo Go app (for development) or Android emulator

## Run on Expo Go

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** app on your phone (same WiFi network).

**Test login**: any valid email + password (6+ chars), e.g. `test@test.com` / `123456`

## Scripts

| Command                 | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| `npm start`             | Start Expo dev server                                |
| `npm run android`       | Start on Android                                     |
| `npm run ios`           | Start on iOS                                         |
| `npm run typecheck`     | TypeScript check                                     |
| `npm run lint`          | ESLint                                               |
| `npm run test`          | Jest tests                                           |
| `npm run test:coverage` | Tests with coverage                                  |
| `npm run validate`      | Full verification (typecheck + lint + format + test) |
| `npm run doctor`        | Expo doctor health check                             |

## Build APK (EAS)

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

## Project Structure

```
app/           Screens (expo-router)
components/    Shared UI and feature components
hooks/         Custom hooks
store/         Zustand stores
data/          Mock data
lib/           Theme, storage, i18n
```

## Tech Stack

- Expo SDK 54 + expo-router
- React Native 0.81 + React 19.1
- NativeWind (Tailwind CSS)
- Zustand + AsyncStorage
- FlashList v2
- Jest + Testing Library

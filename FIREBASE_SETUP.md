# Firebase Setup Guide

Follow these steps to configure Firebase for Ryza Blog.

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **"Add project"**.
3. Enter a project name (e.g., `ryza-blog`).
4. Disable Google Analytics (optional, simplifies setup).
5. Click **"Create project"**.

## 2. Register Web App

1. In the Project Overview, click the **Web icon (</>)**.
2. Register app nickname: `Ryza Blog Web`.
3. Click **"Register app"**.
4. You will see a `firebaseConfig` object. Keep this tab open.

## 3. Configure Environment Variables

1. Copy `.env.example` to a new file named `.env`.
2. Fill in the values from your `firebaseConfig`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 4. Enable Services

### Authentication
1. Go to **Build > Authentication**.
2. Click **"Get started"**.
3. Select **Google** from Sign-in providers.
4. Enable it and set a support email.
5. Click **"Save"**.

### Firestore Database
1. Go to **Build > Firestore Database**.
2. Click **"Create database"**.
3. Choose a location (e.g., closest to your users).
4. Start in **Test mode** (we will secure this in Step 3).
5. Click **"Create"**.

### Storage
1. Go to **Build > Storage**.
2. Click **"Get started"**.
3. Start in **Test mode**.
4. Click **"Done"**.

🎉 **Setup Complete!** Restart your dev server (`npm run dev`) to load the new config.

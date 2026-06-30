import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';

// ⚠️  Replace these values with your Firebase project credentials.
// Go to Firebase Console → Project Settings → Your apps → Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Prevent duplicate app initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getDatabase(app);

// ── Types ──────────────────────────────────────────────────────────
export interface Account {
  id: string;
  level: string;
  age: string;
  totalShirts: string;
  totalBottom: string;
  totalMask: string;
  totalHead: string;
  totalShoes: string;
  evoGuns: string;
  price: string;
  description: string;
  status: 'available' | 'sold';
  images: string[];
}

// ── Database helpers ───────────────────────────────────────────────
export const fetchAccounts = async (): Promise<Account[]> => {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, 'accounts'));
    if (snapshot.exists()) {
      const data = snapshot.val() as Record<string, Omit<Account, 'id'>>;
      return Object.keys(data).map((key) => ({
        ...data[key],
        id: data[key].id || key,
        images: Array.isArray(data[key].images) ? data[key].images : [],
      }));
    }
    return [];
  } catch {
    // Firebase not configured — caller should fall back to mock data
    return [];
  }
};

export const fetchAccount = async (id: string): Promise<Account | null> => {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `accounts/${id}`));
    if (snapshot.exists()) {
      const data = snapshot.val() as Omit<Account, 'id'>;
      return {
        ...data,
        id: data.id || id,
        images: Array.isArray(data.images) ? data.images : [],
      };
    }
    return null;
  } catch {
    return null;
  }
};

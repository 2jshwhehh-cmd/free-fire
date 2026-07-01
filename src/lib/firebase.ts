import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';

// ⚠️  Replace these values with your Firebase project credentials.
// Go to Firebase Console → Project Settings → Your apps → Config
const firebaseConfig = {
  apiKey: "AIzaSyASv3rNnCZ_GaQosPW4KoNXfhtbJ72k2xo",
  authDomain: "free-fire-site-efcc3.firebaseapp.com",
  databaseURL: "https://free-fire-site-efcc3-default-rtdb.firebaseio.com",
  projectId: "free-fire-site-efcc3",
  storageBucket: "free-fire-site-efcc3.firebasestorage.app",
  messagingSenderId: "756939673076",
  appId: "1:756939673076:web:a6d01589edf1f098ed3da1"
};

// Prevent duplicate app initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getDatabase(app);

// ── Types ──────────────────────────────────────────────────────────
export interface Account {
  firebaseId?: string;

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

    const snapshot = await get(
      child(dbRef, 'accounts')
    );


    if (snapshot.exists()) {

      const data = snapshot.val() as Record<string, Account>;


      return Object.keys(data).map((key) => ({

        firebaseId: key,

        ...data[key],

        images: Array.isArray(data[key].images)
          ? data[key].images
          : [],

      }));

    }


    return [];


  } catch {

    return [];

  }
};

export const fetchAccount = async (id: string): Promise<Account | null> => {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `accounts/${id}`));
    if (snapshot.exists()) {
      const data = snapshot.val() as Account;
     return {
  firebaseId: id,
  ...data,
  images: Array.isArray(data.images)
    ? data.images
    : [],
};
    }
    return null;
  } catch {
    return null;
  }
};

import { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loginPending, setLoginPending] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUser({ ...firebaseUser, ...userDoc.data() });
          } else {
            // Create user doc if it doesn't exist
            const newUser = {
              uid: firebaseUser.uid,
              username: firebaseUser.displayName || 'Soldado_' + Math.floor(Math.random() * 1000),
              photoURL: firebaseUser.photoURL || `https://i.pravatar.cc/150?u=${firebaseUser.uid}`,
              isVerified: false,
              followersCount: 0,
              followingCount: 0,
              sensitivitiesCount: 0,
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
            setUser({ ...firebaseUser, ...newUser });
          }
        } catch (error) {
          console.error('Error fetching/setting user doc:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    if (loginPending) return;
    setLoginPending(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
        console.warn('Login popup was cancelled or closed by user.');
      } else {
        console.error('Login failed', error);
      }
    } finally {
      setLoginPending(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return { user, loading, login, logout, loginPending };
}

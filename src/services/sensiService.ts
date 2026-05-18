import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  where,
  serverTimestamp,
  doc,
  updateDoc,
  increment
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface SensiData {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  awm: number;
  phoneModel: string;
  dpi: number;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  gameStyle?: string;
  headshotRate?: number;
  isOneTap?: boolean;
}

export const sensitivityService = {
  async publish(data: SensiData) {
    try {
      const docRef = await addDoc(collection(db, 'sensitivities'), {
        ...data,
        likesCount: 0,
        commentsCount: 0,
        createdAt: serverTimestamp(),
        gameStyle: data.gameStyle || 'Rush',
        headshotRate: data.headshotRate || 0,
        isOneTap: data.isOneTap || false
      });
      
      const userRef = doc(db, 'users', data.authorId);
      await updateDoc(userRef, {
        sensitivitiesCount: increment(1),
        xp: increment(50) // Give XP for posting
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error publishing sensitivity', error);
      throw error;
    }
  },

  async getFeed(filter?: string) {
    try {
      const sensisCol = collection(db, 'sensitivities');
      let q = query(sensisCol, orderBy('createdAt', 'desc'), limit(20));
      
      if (filter === 'trends') {
        q = query(sensisCol, orderBy('likesCount', 'desc'), limit(20));
      } else if (filter === 'one-tap') {
        q = query(sensisCol, where('isOneTap', '==', true), orderBy('createdAt', 'desc'), limit(20));
      } else if (['Rush', 'Sniper', 'One Tap', 'Competitivo', 'Precisión'].includes(filter || '')) {
        q = query(sensisCol, where('gameStyle', '==', filter), orderBy('createdAt', 'desc'), limit(20));
      }
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching feed', error);
      return [];
    }
  },

  async getDailySensi() {
    try {
      const sensisCol = collection(db, 'sensitivities');
      const q = query(sensisCol, where('isDaily', '==', true), limit(1));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
      
      // Fallback to top liked
      const qFallback = query(sensisCol, orderBy('likesCount', 'desc'), limit(1));
      const snapFallback = await getDocs(qFallback);
      return snapFallback.empty ? null : { id: snapFallback.docs[0].id, ...snapFallback.docs[0].data() };
    } catch (error) {
      return null;
    }
  },

  async getRankings() {
    try {
      const usersCol = collection(db, 'users');
      const q = query(usersCol, orderBy('xp', 'desc'), limit(20));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching rankings', error);
      return [];
    }
  }
};


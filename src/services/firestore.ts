import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface FeedbackData {
  campaignId: string;
  userId: string; // or null if anonymous
  rating: number;
  metrics: { fun: number; informative: number; hook: number };
  comment: string;
}

export const submitFeedback = async (data: FeedbackData) => {
  try {
    const docRef = await addDoc(collection(db, "feedbacks"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    console.log("Feedback written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding feedback: ", e);
    
    // Mock success for dev if no permission/config
    if (import.meta.env.DEV) {
        return "mock-doc-id";
    }
    throw e;
  }
};

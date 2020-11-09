import { useEffect, useState } from "react";
import firebase from "firebase";

export interface User {
  email: string;
  displayName: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          email: firebaseUser.email!,
          displayName: firebaseUser.displayName!
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unSubscribe();
  }, []);
  return { isLoading, user };
};

export default useAuth;

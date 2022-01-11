import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState();

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // Sign in Using Google
  const signInUsingGoogle = () => {
    setIsLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, []);

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {})
      .finally(() => setIsLoading(false));
  };

  // Register with Email and Password

  const handleCreatingUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleUserLogin = (userEmail, userPassword, callback) => {
    return signInWithEmailAndPassword(auth, userEmail, userPassword);
  };

  const updateName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {});
  };

  return {
    user,
    setUser,
    isLoading,
    setIsLoading,
    signInUsingGoogle,
    logOut,
    handleCreatingUser,
    handleUserLogin,
    updateName,
    totalPrice,
    setTotalPrice,
  };
};

export default useFirebase;

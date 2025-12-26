import { useEffect, useState } from "react";


import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  const auth = getAuth(app);
  const createUserEP = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const provider = new GoogleAuthProvider();
  const googleLogin = () => {
    setloading(true);
    return signInWithPopup(auth, provider);
  };
  useEffect(() => {
    const userCheck = onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser);
      setloading(false);
    });
    return () => userCheck();
  }, []);

  const updateUser = (name, photo) => {
    setloading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
      
    }).then(()=>setloading(false));
  };
  const signIn = (email, password) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signout = () => {
    setloading(true);
    return signOut(auth);
  };
  const forgetPass = (email) => {
    setloading(true);
    return sendPasswordResetEmail(auth, email)
  };
  const authInfo = {
    createUserEP,
    user,
    googleLogin,
    updateUser,
    signout,
    signIn,
    forgetPass,
    loading,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};
export default AuthProvider;

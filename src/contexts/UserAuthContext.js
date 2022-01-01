import { createContext, useContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth, db } from "../firebase";

import { child, get, ref, set } from "firebase/database";
import { uid } from "uid";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const uuid = uid();

  function logIn(email, password) {
    get(child(ref(db), "/users")).then((data) => {
      const userAuth = Object.values(data.val()).filter(
        (item) => item.email === email && item.isAdmin === false
      );
      if (userAuth[0]) {
        return signInWithEmailAndPassword(auth, email, password);
      }
      alert("Please Sign in with User Account.");
      // return signInWithEmailAndPassword(auth, email, password);
    });
  }

  function signUp(email, password, name, number, id) {
    return createUserWithEmailAndPassword(auth, email, password).then(() => {
      set(ref(db, `users/${uuid}`), {
        email,
        name,
        number,
        id,
        isAdmin: false,
      });
    });
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

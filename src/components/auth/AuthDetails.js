import { onAuthStateChanged, signOut } from "firebase/auth";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Routing from "../Pages/Routes";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { setUserEmail } from "./UserEmail";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        const userEmail = user.email; // Get user's email
        setUserEmail(userEmail);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);
  const [page, setpage] = useState(false);
  const updateState = () => {
    setpage(!page);
  };
  useEffect(() => {}, [page]);
  return (
    <div>
      {authUser ? (
        <Routing />
      ) : page ? (
        <SignUp updateState={updateState} />
      ) : (
        <SignIn className="login" updateState={updateState} />
      )}
    </div>
  );
};

export default AuthDetails;

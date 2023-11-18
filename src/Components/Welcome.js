import React from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <main className="welcome w-full h-screen flex items-center justify-center flex-col">
      <h2 className="text-3xl text-slate-500 font-sans">Welcome to react chat app</h2>
      <button className="sign-in my-5 border p-3 bg-slate-500 text-white flex items-center justify-center" onClick={googleSignIn}>
      <FaGoogle className="mx-1" /><span className="mx-1">Sign In with Google</span>
      </button>
    </main>
  );
};
export default Welcome;

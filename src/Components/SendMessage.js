// SendMessage.js
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  return (
    <div className="mx-auto w-full h-screen mt-5">
      <form
        onSubmit={sendMessage}
        className="send-message w-[350px] p-6 mx-auto my-10 bg-white rounded-md shadow-md overflow-hidden border"
      >
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Xabar yozish"
            className="flex-1 px-3 py-2 mr-2 outline-none border border-gray-300 rounded-md focus:border-b-slate-500 text-slate-500"
          />
          <button
            type="submit"
            className="mx-2 flex items-center justify-center my-auto border p-2 rounded-full bg-slate-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mx-auto my-auto text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
        <div className="text-gray-500 text-sm">Press Enter to send</div>
      </form>
    </div>
  );
};

export default SendMessage;

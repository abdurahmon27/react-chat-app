// App.js
import React from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatBox from "./Components/ChatBox";
import Welcome from "./Components/Welcome";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App relative">
      {!user ? <Welcome /> : <ChatBox />}
    </div>
  );
}

export default App;

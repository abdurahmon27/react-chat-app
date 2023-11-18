// GroupSelection.js
import React from "react";

const GroupSelection = ({ onSelectGroup }) => {
  return (
    <main className="group-selection w-full h-screen flex items-center justify-center flex-col">
      <h2 className="text-3xl text-slate-500 font-sans">Choose a Group</h2>
      <button
        className="group-button my-3 border p-3 bg-slate-500 text-white"
        onClick={() => onSelectGroup("messages")}
      >
        Group 1
      </button>
      <button
        className="group-button my-3 border p-3 bg-slate-500 text-white"
        onClick={() => onSelectGroup("messages1", "1234")}
      >
        Group 2
      </button>
      <button
        className="group-button my-3 border p-3 bg-slate-500 text-white"
        onClick={() => onSelectGroup("messages2", "1111")}
      >
        Group 3
      </button>
    </main>
  );
};

export default GroupSelection;

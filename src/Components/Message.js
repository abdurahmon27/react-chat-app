import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { MdDeleteOutline } from "react-icons/md";

import { RiPencilLine } from "react-icons/ri";
import { HiOutlineReply } from 'react-icons/hi';

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  const isCurrentUser = user?.uid === message.uid;

  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.text);

  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleEdit = async () => {
    try {
      await updateDoc(doc(db, 'messages', message.id), {
        text: editedMessage,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error editing message:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'messages', message.id));
    } catch (error) {
      console.error('Error deleting message:', error.message);
    }
  };

  const handleReply = async () => {
    try {
      const replyData = {
        text: replyText,
        name: user.displayName,
        avatar: user.photoURL,
        createdAt: serverTimestamp(),
        uid: user.uid,
        replyTo: {
          messageId: message.id,
          name: message.name,
          text: message.text,
        },
      };

      await addDoc(collection(db, 'messages'), replyData);
      setIsReplying(false);
      setReplyText('');
    } catch (error) {
      console.error('Error replying to message:', error.message);
    }
  };

  return (
    <div className="w-[250px] h-auto mx-auto mt-[50px]">
      <div
        className={`flex items-start mb-4 ${
          isCurrentUser ? 'justify-end' : 'justify-start'
        }`}
      >
        <div className="flex items-center">
          {isCurrentUser ? (
            <>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editedMessage}
                    onChange={(e) => setEditedMessage(e.target.value)}
                  />
                  <button onClick={handleEdit}>
                    <RiPencilLine className="text-slate-500" />
                  </button>
                </>
              ) : (
                <>
                  <div
                    className={`p-2 rounded-lg ${
                      isCurrentUser
                        ? 'bg-slate-500 text-gray-300'
                        : 'bg-white text-slate-500'
                    }`}
                  >
                    <p
                      className={`text-md font-semibold ${
                        isCurrentUser
                          ? 'text-white'
                          : 'bg-white text-slate-500 '
                      }`}
                    >
                      {message.name}
                    </p>
                    <p className="text-sm">{message.text}</p>
                    {message.replyTo && (
                      <p className="text-xs text-white my-1 italic">
                        Replying to: {message.replyTo.name}: {message.replyTo.text}
                      </p>
                    )}
                  </div>
                  <img
                    className="w-8 h-8 rounded-full ml-2"
                    src={message.avatar}
                    alt="user avatar"
                  />
                  <button onClick={() => setIsEditing(true)} className="text-slate-500">
                    <RiPencilLine className='mx-1' />
                  </button>
                  <button onClick={handleDelete}>
                    <MdDeleteOutline className="text-slate-500 mx-1" />
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <img
                className="w-8 h-8 rounded-full mr-2"
                src={message.avatar}
                alt="user avatar"
              />
              <div
                className={`p-2 rounded-lg ${
                  isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                <p className="text-md font-semibold">{message.name}</p>
                <p className="text-sm">{message.text}</p>
                {message.replyTo && (
                  <p className="text-xs text-gray-500">
                    (Replying to: {message.replyTo.name}: {message.replyTo.text})
                  </p>
                )}
                <button onClick={() => setIsReplying(true)}>
                  <HiOutlineReply className="text-slate-500" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {isReplying && !isCurrentUser && (
        <div className="ml-8 mb-2">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Reply to this message"
          />
          <button onClick={handleReply}>
            <HiOutlineReply className="text-slate-500" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Message;

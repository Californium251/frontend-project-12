import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Message from './Message';
import { newMessage } from '../slices/messageSlice';
import Socket from './Socket';
import 'react-toastify/dist/ReactToastify.css';

function MessageBox() {
  const messages = useSelector((state) => state.messages);
  const activeChannelId = useSelector((state) => state.channels.activeId);
  const newMessageNotification = (message) => {
    toast(message);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    Socket.on('newMessage', ({
      id,
      text,
      username,
      channelId,
    }) => {
      newMessageNotification('ok');
      dispatch(newMessage({
        id,
        text,
        username,
        channelId,
      }));
    });
  }, []);
  return (
    <div id="message-box" className="chat-messages overflow-auto px-5">
      {Object.entries(messages)
        .filter(([, message]) => message.channelId === activeChannelId)
        .map(([id, { text, username }]) => (
          <Message username={username} text={text} key={id} />
        ))}
      <ToastContainer />
    </div>
  );
}

export default MessageBox;

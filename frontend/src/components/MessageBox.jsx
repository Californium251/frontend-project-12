import React from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';
import 'react-toastify/dist/ReactToastify.css';

function MessageBox() {
  const messages = useSelector((state) => state.messages);
  const activeChannelId = useSelector((state) => state.channels.activeId);
  return (
    <div id="message-box" className="chat-messages overflow-auto px-5">
      {Object.entries(messages)
        .filter(([, message]) => message.channelId === activeChannelId)
        .map(([id, { body, username }]) => (
          <Message username={username} body={body} key={id} />
        ))}
    </div>
  );
}

export default MessageBox;

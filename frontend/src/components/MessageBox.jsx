import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity'
import Message from './Message';
import 'react-toastify/dist/ReactToastify.css';

function MessageBox() {
  useEffect(() => {
    this.scrollDown();
  });
  useEffect(() => {
    filter.loadDictionary('ru');
  }, []);
  const messages = useSelector((state) => state.messages);
  const activeChannelId = useSelector((state) => state.channels.activeId);
  return (
    <div id="message-box" className="chat-messages overflow-auto px-5">
      {Object.entries(messages)
        .filter(([, message]) => message.channelId === activeChannelId)
        .map(([id, { body, username }]) => (
          <Message username={username} body={filter.clean(body)} key={id} />
        ))}
    </div>
  );
}

export default MessageBox;

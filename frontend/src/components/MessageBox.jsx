import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import Message from './Message';
import 'react-toastify/dist/ReactToastify.css';

const MessageBox = () => {
  useEffect(() => {
    filter.add(filter.getDictionary('ru'));
  }, []);
  const messages = useSelector((state) => state.messages);
  const activeChannelId = useSelector((state) => state.channels.activeId);
  const messageBox = useRef(null);
  useEffect(() => {
    messageBox.current.scrollTo({
      top: messageBox.current.clientHeight,
      left: 0,
    });
  }, [activeChannelId, messages]);
  return (
    <div ref={messageBox} id="message-box" className="chat-messages overflow-auto px-5">
      {Object.entries(messages)
        .filter(([, message]) => message.channelId === activeChannelId)
        .map(([id, { body, username }]) => (
          <Message username={username} body={filter.clean(body)} key={id} />
        ))}
    </div>
  );
}

export default MessageBox;

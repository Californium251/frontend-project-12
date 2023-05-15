import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Message from './Message';
import { newMessage } from '../slices/messageSlice';
import Socket from './Sokcet';

const messageToText = (message) => Object.keys(message)
  .filter((key) => !Number.isNaN(+key))
  .sort((a, b) => +a - +b)
  .map((key) => message[key])
  .join('');

function MessageBox() {
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  useEffect(() => {
    Socket.emit('newMessage', 'message');
    Socket.on('newMessage', (message) => {
      dispatch(newMessage({
        id: message.id,
        text: messageToText(message),
      }));
    });
  }, []);
  return (
    <div id="message-box" className="chat-messages overflow-auto px-5">
      {Object.entries(messages).map(([id, text]) => (
        <Message username="userhardcoded" text={text} key={id} />
      ))}
    </div>
  );
}

export default MessageBox;

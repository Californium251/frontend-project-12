import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addChannels, makeActive, newChannel } from '../slices/channelSlice';
import { addMessages } from '../slices/messageSlice';
import 'bootstrap';
import Channels from './Channels';
import MessageBox from './MessageBox';
import SendMessageForm from './SendMessageForm';
import ChatHeader from './ChatHeader';
import NewChannelModal from './NewChannelModal';
import AddChannelButton from './AddChannelButton';
import Socket from './Socket';

function Chat() {
  const modals = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  useEffect(() => {
    const getChats = async () => {
      const token = window.localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get('/api/v1/data', config);
      dispatch(addChannels(res.data.channels));
      dispatch(makeActive(res.data.currentChannelId));
      dispatch(addMessages(res.data.messages));
    };
    getChats();
  }, []);
  Socket.on('newChannel', (socket) => {
    if (socket.name) {
      dispatch(newChannel(socket));
    }
  });
  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">Chat</a>
          <button type="button" className="btn btn-primary">Выйти</button>
        </div>
      </nav>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 pe-2 p-4">
              <b>Каналы</b>
              <AddChannelButton />
            </div>
            <Channels />
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <ChatHeader />
              <MessageBox />
              <SendMessageForm />
            </div>
          </div>
        </div>
      </div>
      {modals.newChannel ? <NewChannelModal /> : null}
    </>
  );
}

export default Chat;

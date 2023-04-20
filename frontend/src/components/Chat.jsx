import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addChannels } from '../slices/channelSlice';

function Chat() {
  const channels = useSelector((state) => state.channels);
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
      dispatch(addChannels(['some data']));
    };
    getChats();
  });
  return (
    <>
      {channels.map((channel) => <div key={channel.id}>{channel.name}</div>)}
    </>
  );
}

export default Chat;

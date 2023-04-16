import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chat() {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    const getChats = async () => {
      const token = window.localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get('/api/v1/data', config);
      setChannels(res.data.channels);
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

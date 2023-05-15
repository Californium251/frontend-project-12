/* eslint-disable react/prop-types */
import React from 'react';

function Message({ username, text }) {
  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      :
      {' '}
      {text}
    </div>
  );
}

export default Message;

/* eslint-disable react/prop-types */
import React from 'react';

const Message = ({ username, body }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    :
    {' '}
    {body}
  </div>
);

export default Message;

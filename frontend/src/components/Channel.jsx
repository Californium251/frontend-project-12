/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { makeActive } from '../slices/channelSlice';

function Channel({ id, activeId, name }) {
  const dispatch = useDispatch();
  const onClick = (channelId) => () => {
    dispatch(makeActive(channelId));
  };
  return (
    <li key={id} className="nav-item w-100">
      <button onClick={onClick(id)} type="button" className={id === activeId ? 'w-100 rounded-0 text-start btn btn-secondary' : 'w-100 rounded-0 text-start btn'}>
        <span className="me-1">#</span>
        {name}
      </button>
    </li>
  );
}

export default Channel;

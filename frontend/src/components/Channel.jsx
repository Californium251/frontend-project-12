/* eslint-disable react/prop-types */
import React from 'react';

function Channel({ id, activeId, name }) {
  return (
    <li key={id} className="nav-item w-100">
      <button type="button" className={id === activeId ? 'w-100 rounded-0 text-start btn btn-secondary' : 'w-100 rounded-0 text-start btn'}>
        <span className="me-1">#</span>
        {name}
      </button>
    </li>
  );
}

export default Channel;

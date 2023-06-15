/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { editChannel } from '../slices/modalsSlice';

function EditChannelModal() {
  const dispatch = useDispatch();
  const ref = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (evt) => {
      if (ref.current && !ref.current.contains(evt.target)) {
        dispatch(editChannel(null));
      }
    };
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  return (
    <div ref={ref} className="dropdown-menu show" style={{ position: 'absolute', inset: '0px auto auto 0px', transform: 'translate3d(-8px, 40px, 0px)' }}>
      <a className="dropdown-item" role="button" tabIndex="0" href="#">Удалить</a>
      <a className="dropdown-item" role="button" tabIndex="0" href="#">Переименовать</a>
    </div>
  );
}

export default EditChannelModal;

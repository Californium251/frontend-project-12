/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeActive } from '../slices/channelSlice';
import { editChannel } from '../slices/modalsSlice';
import EditChannelModal from './EditChannelModal';

function Channels() {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.value);
  const activeId = useSelector((state) => state.channels.activeId);
  const channelToBeEdited = useSelector((state) => state.modals.editChannel);
  const onClick = (channelId) => () => {
    dispatch(makeActive(channelId));
  };
  const showEditChannelModal = (id) => () => {
    dispatch(editChannel(id));
  };
  return (
    <ul id="channel-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {Object.entries(channels).map(([id, { name }]) => (
        <li key={id} className="nav-item w-100">
          <div className="d-flex dropdown btn-group">
            <button onClick={onClick(id)} type="button" className={`w-100 rounded-0 text-start btn ${+id === +activeId ? 'btn-secondary' : ''}`}>
              <span className="me-1">#</span>
              {name}
            </button>
            {channels[id].removable
              ? (
                <button onClick={showEditChannelModal(id)} type="button" aria-expanded="false" className={`flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${+id === +activeId ? 'btn-secondary' : ''}`}>
                  <span className="visually-hidden">Управление каналом</span>
                </button>
              )
              : null}
            {channelToBeEdited === id ? (
              <EditChannelModal />
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Channels;

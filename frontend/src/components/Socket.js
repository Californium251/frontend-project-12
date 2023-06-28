import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import {
  makeActive, removeChannel, renameChannel, setChannelToBeChanged, newChannel,
} from '../slices/channelSlice';

const token = window.localStorage.getItem('token');
const Socket = io('http://localhost:3000/', {
  auth: { token },
});

const newChannelCallback = (socket) => {
  const dispatch = useDispatch();
  if (socket.name) {
    dispatch(newChannel(socket));
  }
};

const removeChannelCallback = ({ id }) => {
  const dispatch = useDispatch();
  const channelToBeChanged = useSelector((state) => state.channels.channelToBeChanged);
  const activeId = useSelector((state) => state.channels.activeId);
  if (+channelToBeChanged === +activeId) {
    dispatch(makeActive(1));
  }
  dispatch(removeChannel(id));
  dispatch(setChannelToBeChanged(null));
  toast.success('ok');
};

const renameChannelCallback = ({ id, name }) => {
  const dispatch = useDispatch();
  const channelToBeChanged = useSelector((state) => state.channels.channelToBeChanged);
  if (+channelToBeChanged === +id) {
    dispatch(renameChannel({ id, name }));
    dispatch(setChannelToBeChanged(null));
  }
};

Socket.on('newChannel', newChannelCallback);
Socket.on('removeChannel', removeChannelCallback);
Socket.on('renameChannel', renameChannelCallback);

export default Socket;

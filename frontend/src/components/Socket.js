import { io } from 'socket.io-client';

const token = window.localStorage.getItem('token');
const Socket = io('http://localhost:3000/', {
  auth: { token },
});

export default Socket;

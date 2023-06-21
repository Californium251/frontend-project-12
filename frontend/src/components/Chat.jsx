import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { addChannels, makeActive, newChannel } from '../slices/channelSlice';
import { addMessages } from '../slices/messageSlice';
import 'bootstrap';
import Channels from './Channels';
import MessageBox from './MessageBox';
import SendMessageForm from './SendMessageForm';
import ChatHeader from './ChatHeader';
import NewChannelModal from './NewChannelModal';
import AddChannelButton from './AddChannelButton';
import Socket from './Socket';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';
import AppHeader from './AppHeader';

function Chat() {
  const { t } = useTranslation();
  const modals = useSelector((state) => state.modals);
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
      dispatch(addChannels(res.data.channels));
      dispatch(makeActive(res.data.currentChannelId));
      dispatch(addMessages(res.data.messages));
    };
    getChats();
  }, []);
  Socket.on('newChannel', (socket) => {
    if (socket.name) {
      dispatch(newChannel(socket));
    }
  });
  return (
    <>
      <AppHeader />
      <Container bg="light" className="h-100 my-4 overflow-hidden rounded shadow">
        <Row bg="light" className="h-100 flex-md-row">
          <Col xs="4" md="2" bg="light" variant="light" className="border-end px-0 flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 pe-2 p-4">
              <b>{t('channels')}</b>
              <AddChannelButton />
            </div>
            <Channels />
          </Col>
          <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
              <ChatHeader />
              <MessageBox />
              <SendMessageForm />
            </div>
          </Col>
        </Row>
      </Container>
      {modals.newChannel ? <NewChannelModal /> : null}
      {modals.removeChannel ? <RemoveChannelModal /> : null}
      {modals.renameChannel ? <RenameChannelModal /> : null}
    </>
  );
}

export default Chat;

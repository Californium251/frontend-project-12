import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { channelSliceActoins } from '../slices/channelSlice';
import { addMessages } from '../slices/messageSlice';
import 'bootstrap';
import Channels from './Channels';
import MessageBox from './MessageBox';
import SendMessageForm from './SendMessageForm';
import ChatHeader from './ChatHeader';
import NewChannelModal from './NewChannelModal';
import AddChannelButton from './AddChannelButton';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';
import AppHeader from './AppHeader';
import useAuth from '../hooks/useAuth';
import routes from '../routes/index';

const Chat = () => {
  const { t } = useTranslation();
  const modals = useSelector((state) => state.modals);
  const { auth } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    const getChats = async () => {
      const { token } = auth;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        console.log(routes);
        const res = await axios.get(routes.data, config);
        dispatch(channelSliceActoins.addChannels(res.data.channels));
        dispatch(channelSliceActoins.makeActive(res.data.currentChannelId));
        dispatch(addMessages(res.data.messages));
      } catch (err) {
        if (!err.isAxiosError) {
          console.log('unknown error');
        } else {
          console.log('network error');
        }
      }
    };
    getChats();
  }, [dispatch]);
  return (
    <Container fluid className="vh-100 d-flex flex-column">
      <AppHeader />
      <Container bg="light" className="h-100 my-4 overflow-hidden rounded shadow">
        <Row bg="light" variant="light" className="h-100 flexmd-row">
          <Col xs="4" md="2" bg="light" variant="light" className="bg-light border-end px-0 flex-column h-100 d-flex">
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
    </Container>
  );
};

export default Chat;

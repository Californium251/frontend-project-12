/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { makeActive } from '../slices/channelSlice';
import { showRemoveChannel, showRenameChannel } from '../slices/modalsSlice';

function Channels() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.value);
  const activeId = useSelector((state) => state.channels.activeId);
  const onClick = (channelId) => () => {
    dispatch(makeActive(channelId));
  };
  const onDelClick = (id) => () => {
    dispatch(showRemoveChannel(id));
  };
  const onRenameClick = (id) => () => {
    dispatch(showRenameChannel(id));
  };
  return (
    <Nav variant="pills" align="start" as="ul">
      {Object.entries(channels).map(([id, { name, removable }]) => (
        <Nav.Item key={id} as="li" className={`w-100 ${+id === +activeId ? 'btn-secondary' : ''}`}>
          {removable
            ? (
              <Dropdown as={ButtonGroup} variant="light" className="w-100">
                <Nav.Link className={`w-100 rounded-0 text-start ${+id === +activeId ? 'btn-secondary' : ''}`} onClick={onClick(id)}>
                  #
                  {' '}
                  {name}
                </Nav.Link>
                <Dropdown.Toggle variant="light" split />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={onDelClick(id)} href="#">{t('removeChannel')}</Dropdown.Item>
                  <Dropdown.Item onClick={onRenameClick(id)} href="#">{t('renameChannel')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )
            : (
              <Nav.Link onClick={onClick(id)} className="w-100 rounded-0 text-start">
                #
                {' '}
                {name}
              </Nav.Link>
            )}
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default Channels;

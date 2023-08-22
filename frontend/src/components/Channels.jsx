/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { channelSliceActoins } from '../slices/channelSlice';
import { showRemoveChannel, showRenameChannel } from '../slices/modalsSlice';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.value);
  const activeId = useSelector((state) => state.channels.activeId);
  const onClick = (channelId) => () => {
    dispatch(channelSliceActoins.makeActive(+channelId));
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
              <Dropdown as={ButtonGroup} variant="light" className="w-100" align="start">
                <Button
                  variant={+id === +activeId ? 'secondary' : 'light'}
                  className="w-100 rounded-0 text-start text-truncate"
                  onClick={onClick(id)}
                >
                  <span className="me-1">
                    #
                    {' '}
                    {name}
                  </span>
                </Button>
                <Dropdown.Toggle variant={+id === +activeId ? 'secondary' : 'light'} split>
                  <span className="visually-hidden">{t('manageChannel')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={onDelClick(id)} href="#">{t('removeChannel')}</Dropdown.Item>
                  <Dropdown.Item onClick={onRenameClick(id)} href="#">{t('renameChannel')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )
            : (
              <Button
                variant={+id === +activeId ? 'secondary' : 'light'}
                onClick={onClick(id)}
                className="w-100 rounded-0 text-start"
              >
                #
                {' '}
                {name}
              </Button>
            )}
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default Channels;

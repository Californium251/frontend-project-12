/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import { makeActive } from '../slices/channelSlice';

function Channels() {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.value);
  const activeId = useSelector((state) => state.channels.activeId);
  const onClick = (channelId) => () => {
    dispatch(makeActive(channelId));
  };
  return (
    <Nav variant="pills" align="start">
      {Object.entries(channels).map(([id, { name, removable }]) => (
        <Nav.Item key={id} className={`w-100 ${+id === +activeId ? 'btn-secondary' : ''}`}>
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
                  <Dropdown.Item href="#">Удалить</Dropdown.Item>
                  <Dropdown.Item href="#">Переименовать</Dropdown.Item>
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

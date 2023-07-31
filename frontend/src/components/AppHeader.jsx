import React from 'react';
import {
  Navbar, Container, Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';

const AppHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const { token } = auth;
  const signOut = () => {
    logout();
    navigate('/login');
  };
  return (
    <Navbar expand="lg" bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">{t('appName')}</Navbar.Brand>
        {token ? (
          <Button variant="primary" onClick={signOut}>{t('signout')}</Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default AppHeader;

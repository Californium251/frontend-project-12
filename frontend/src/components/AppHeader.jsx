import React, { useContext } from 'react';
import {
  Navbar, Container, Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthContext from '../context/AuthProvider';

const AppHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth, unSetAuth } = useContext(AuthContext);
  const { token } = auth;
  const signOut = () => {
    unSetAuth();
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

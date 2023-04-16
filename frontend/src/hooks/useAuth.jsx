/* eslint-disable react/jsx-filename-extension */
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;

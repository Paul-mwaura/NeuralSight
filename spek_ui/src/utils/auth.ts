import jwtDecode from 'jwt-decode';
import { BACKEND_URL } from '../config';

export const isAuthenticated = () => {
  const permissions = localStorage.getItem('permissions');
  if (!permissions) {
    return false;
  }
  return !!(permissions === 'user' || permissions === 'admin');
};

export const login = async (email: string, password: string) => {
  // email and password not empty
  if (!(email.length > 0) || !(password.length > 0)) {
    throw new Error('Email or password not provided');
  }
  const formData = new FormData();
  // form data for OAuth2
  formData.append('username', email);
  formData.append('password', password);
  const request = new Request(`${BACKEND_URL}/login/access-token`, {
    method: 'POST',
    body: formData,
  });
  const response = await fetch(request);
  if (response.status === 500) {
    throw new Error('Internal server error');
  }
  const data = await response.json();
  
  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
      throw data.detail;
    }
    throw data;
  }
  if ('access_token' in data) {
    const decodedToken: any = jwtDecode(data.access_token);
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('permissions', decodedToken.permissions);
  }
  return data;
};

export const signUp = async (
  fullName: string,
  email: string,
  password: string,
  passwordConfirmation: string
) => {
  if (!(email.length > 0)) {
    throw new Error('Email was not provided');
  }
  if (!(password.length > 0)) {
    throw new Error('Password was not provided');
  }
  if (!(passwordConfirmation.length > 0)) {
    throw new Error('Password confirmation was not provided');
  }
  const request = new Request(`${BACKEND_URL}/users/`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      is_active: true,
      is_superuser: false,
      full_name: fullName,
      password: password,
    }),
  });
  const response = await fetch(request);
  if (response.status === 500) {
    throw new Error('Internal server error');
  }
  const data = await response.json();
  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
      throw data.detail;
    }
    throw data;
  }
  if ('access_token' in data) {
    const decodedToken: any = jwtDecode(data.access_token);
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('permissions', decodedToken.permissions);
  }
};
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('permissions');
};

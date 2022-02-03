import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

export const login = (user) => async dispatch => {
  const { credential, password } = user;

  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password, }),
  });

  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

export const restoreUser = () => async dispatch => {
  const res = await csrfFetch('/api/session');

  const { user } = await res.json();

  dispatch(setUser(user));
  return res;
};

export const signup = (user) => async dispatch => {
  const { username, email, password } = user;

  const res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

export const logout = () => async dispatch => {
  const res = await csrfFetch('/api/session', {
    method: 'DELETE'
  });

  dispatch(removeUser());
  return res;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  // let stateCopy;
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return {...state, user: null }
    default:
      return state;
  }
};

export default sessionReducer;

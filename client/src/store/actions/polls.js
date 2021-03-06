import API from '../../services/api';
import { SET_POLLS, SET_CURRENT_POLL } from '../actionTypes';
import { addError, removeError } from './error';

export const setPolls = polls => ({
  type: SET_POLLS,
  polls,
});

export const setCurrentPoll = poll => ({
  type: SET_CURRENT_POLL,
  poll,
});

// error was here in api call
export const getPolls = () => {
  return async dispatch => {
    try {
      const polls = await API.call('get', `poll`);
      dispatch(setPolls(polls));
      dispatch(removeError());
    } catch (err) {
      const { error } = err.response.data;
      console.log("error in get polls",error)
      dispatch(addError(error));
    }
  };
};

export const getUserPolls = () => {
  return async dispatch => {
    try {
      const polls = await API.call('get', 'poll/user');
      dispatch(setPolls(polls));
      dispatch(removeError());
    } catch (err) {
      const { error } = err.response.data;
      console.log("error in get user polls",error)
      dispatch(addError(error));
    }
  };
};

export const createPoll = data => {
  return async dispatch => {
    try {
      const poll = await API.call('post', 'poll', data);
      dispatch(setCurrentPoll(poll));
      dispatch(removeError());
    } catch (err) {
      const { error } = err.response.data;
      console.log("error in create polls",error)
      dispatch(addError(error));
    }
  };
};

export const getCurrentPoll = path => {
  return async dispatch => {
    try {
      const poll = await API.call('get', `poll/${path}`);
      dispatch(setCurrentPoll(poll));
      dispatch(removeError());
    } catch (err) {
      const { error } = err.response.data;
      console.log("error in get current polls",error)
      dispatch(addError(error));
    }
  };
};

export const vote = (path, data) => {
  return async dispatch => {
    try {
      const poll = await API.call('post', `poll/${path}`, data);
      dispatch(setCurrentPoll(poll));
    } catch (err) {
      const { error } = err.response.data;
      console.log("error in post vote",error)
      dispatch(addError(error));
    }
  };
};
/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const API_BASE =
  process.env.NODE_ENV === 'production'
    ? 'https://hellotender.com/api/'
    : 'http://localhost:5090/api/';

export const IMAGE_BASE =
  process.env.NODE_ENV === 'production'
    ? 'https://hellotender.com/'
    : 'http://localhost:5090/';

export const SET_USER = 'app/App/SET_USER';
export const SET_TOKEN = 'app/App/SET_TOKEN';
export const LOGOUT = 'app/App/LOGOUT';

export const LOGOUT_REQUEST = 'app/App/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'app/App/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'app/App/LOGOUT_FAILURE';

export const LOAD_CONTENT_REQUEST = 'app/App/LOAD_CONTENT_REQUEST';
export const LOAD_CONTENT_SUCCESS = 'app/App/LOAD_CONTENT_SUCCESS';
export const LOAD_CONTENT_FAILURE = 'app/App/LOAD_CONTENT_FAILURE';

export const LOAD_MEDIA_REQUEST = 'app/App/LOAD_MEDIA_REQUEST';
export const LOAD_MEDIA_SUCCESS = 'app/App/LOAD_MEDIA_SUCCESS';
export const LOAD_MEDIA_FAILURE = 'app/App/LOAD_MEDIA_FAILURE';
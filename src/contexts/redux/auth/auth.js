// action - state management
import { REGISTER, LOGIN, LOGOUT } from './actions';

// initial state
export const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  currentUser: '',
  roles: []
};

// ==============================|| AUTH REDUCER ||============================== //

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload;
      return {
        ...state,
        currentUser: user
      };
    }
    case LOGIN: {
      const { user, roles } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        currentUser: user,
        roles: roles
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        currentUser: ''
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default auth;

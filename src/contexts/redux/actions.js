// action - account reducer
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

export const loginAction = (user, roles) => ({
    type: LOGIN,
    payload: { user, roles }
});

export const logoutAction = () => ({
    type: LOGOUT
});

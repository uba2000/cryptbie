import { setLoggedIn, setLoginError } from '../../slices/globalSlice';
import { post } from '../../utilities/http';
import { Base } from '../Base';

export class UserService extends Base {
  constructor() {
    super('user');
  }

  globalState() {
    return this.rootState.global;
  }

  async login(matNo, password) {
    const { response, error } = await post({
      url: '/auth/login',
      data: { matNo, password },
    });

    if (error) {
      this.dispatch(
        setLoginError({
          displayMessage: error.message,
          errorId: error.name,
          errorMessage: error.message,
        })
      );
      return Promise.reject(false);
    }

    if (response) {
      const { data } = response;
      console.log('data.data', {
        ...data.data,
        token: data.token,
      });
      this.dispatch(
        setLoggedIn({
          isLoggedIn: true,
          user: {
            ...data.data,
            token: data.token,
          },
          logInDate: new Date(),
        })
      );
      return Promise.resolve(true);
    } else {
      // login failed - set a message
      this.dispatch(setLoggedOut());
    }

    return Promise.resolve(false);
  }

  async lecturerLogin(loginId, password) {
    const { response, error } = await post({
      url: '/auth/lecturer/login',
      data: { login_id: loginId, password },
    });

    if (error) {
      this.dispatch(
        setLoginError({
          displayMessage: error.message,
          errorId: error.name,
          errorMessage: error.message,
        })
      );
      return Promise.reject(false);
    }

    if (response) {
      const { data } = response;
      console.log('data.data', {
        ...data.data,
        token: data.token,
      });
      this.dispatch(
        setLoggedIn({
          isLoggedIn: true,
          user: {
            ...data.data,
            token: data.token,
          },
          logInDate: new Date(),
        })
      );
      return Promise.resolve(true);
    } else {
      // login failed - set a message
      this.dispatch(setLoggedOut());
    }

    return Promise.resolve(false);
  }

  async register({
    matNo,
    phoneNumber,
    firstname,
    password,
    lastname,
    email,
    currentLevel,
  }) {
    const { response, error } = await post({
      url: '/auth/register',
      data: {
        matNo,
        email,
        phoneNumber,
        currentLevel,
        firstname,
        password,
        lastname,
      },
    });

    if (error) {
      this.dispatch(
        setLoginError({
          displayMessage: error.message,
          errorId: error.name,
          errorMessage: error.message,
        })
      );
      return Promise.reject(false);
    }
    if (response) {
      const { status, message } = response.data;
      if (status === 'fail') {
        this.dispatch(
          setLoginError({
            displayMessage: message,
            errorId: 'Registration Error',
            errorMessage: message,
          })
        );
      } else {
        return Promise.resolve(true);
      }
    } else {
      // login failed - set a message
      this.dispatch(setLoggedOut());
    }

    return Promise.resolve(false);
  }
}

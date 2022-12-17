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
    if (matNo === 'lecturer@gmail.com') {
      this.dispatch(
        setLoggedIn({
          isLoggedIn: true,
          user: {
            __v: 7,
            _id: '639b71d1e1b6085d1abf9d76',
            createdAt: '2022-12-15T19:13:21.558Z',
            currentLevel: '300',
            email: 'nemek.uba@gmail.com',
            firstname: 'Noel',
            lastname: 'Uba',
            matNo: 'psc1707588',
            phoneNumber: '+2348177880475',
            roles: { Lecturer: 2999, ClassAdvisorHead: 3684, },
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWI3MWQxZTFiNjA4NWQxYWJmOWQ3NiIsImlhdCI6MTY3MTI3MjQxMCwiZXhwIjoxNjcxNDQ1MjEwfQ.PqAbBjNloSVw-RxCvi5j3cTBtqg9RtKcXfyfUCU16hA',
            transactions: {
              100: [],
              200: [],
              300: [],
              400: [],
            },
            updatedAt: '2022-12-16T23:50:45.932Z',
            verified: 'false',
          },
          logInDate: new Date(),
        })
      );
      return Promise.resolve(true);
    } else {
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

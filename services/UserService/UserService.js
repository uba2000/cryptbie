import { setLoggedIn, setLoginError } from "../../slices/globalSlice";
import { post } from "../../utilities/http";
import { Base } from "../Base";

export class UserService extends Base {
  constructor() {
    super("user");
  }

  globalState() {
    return this.rootState.global;
  }

  async login(email, password) {
    // const { response, error } = await post({
    //   url: "/login",
    //   data: { email, password },
    // });

    // if (error) {
    //   console.log();
    //   this.dispatch(
    //     setLoginError({
    //       displayMessage: "The username and password is not valid!",
    //       errorId: error.name,
    //       errorMessage: error.message,
    //     })
    //   );
    //   return Promise.reject(false);
    // }

    // if (response) {
    //   const { data } = response;
    this.dispatch(
      setLoggedIn({
        isLoggedIn: true,
        user: { email, role: email === "lecturer@gmail.com" ? "L" : "S" },
        logInDate: new Date(),
      })
    );
    return Promise.resolve(true);
    // } else {
    //   // login failed - set a message
    //   this.dispatch(setLoggedOut());
    // }

    // return Promise.resolve(false);
  }
}

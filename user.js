//let appID = "kid_B1uSUkp-w"
//let appKey = "51eface50e1e4ea79feb91a22cfa7523"

//How to disappear on user click

// document.getElementById("register").addEventListener("click", function() {
// document.getElementById("signup").hidden = false;
//   if(document.getElementById("sign-in").hidden == false) {
//       document.getElementById("sign-in").hidden = true;
//   }
// });

class User {
  constructor() {
    this._session = null;
  }

  get session() {
    if (!this._session) {
      const session = JSON.parse(sessionStorage.getItem("session"));
      if (!session) return false;
      this._session = session;
      return this._session;
    }
    return this._session;
  }

  // Note DVD
  // Validations: first and last name should be 2 characters long, username should be at least 3 characters long.
  // The password should be at least 6 characters long, The repeat password should be equal to the password
  // After a successful registration, a notification message "User registration successful." should be displayed and the app should redirect to the home page with the right navbar. DONE
  // In case of error (eg. invalid username/password), an appropriate error message should be displayed, and the user should be able to try to register again.
  // Keep the user session data in the browser's session storage. DONE in Login

  async register(context) { 
    let { params } = context
    notify('Signing up...', 'loading', context)
    console.log(params)
    const { password, repeatPassword } = params;// DVD Note add in correct keys for first and last name
    try {
      if (!password === repeatPassword) {
        throw "password and repeat password not equal"; // Note DVD error not throwing
      } 
      //Note DVD Put validations here
      // document.getElementById("defaultRegisterFormFirstName").value = "" //DVD Added
      // document.getElementById("defaultRegisterFormLastName").value = "" //DVD Added
      // document.getElementById("defaultRegisterFormUsername").value = "" //DVD Added
      // document.getElementById("defaultRegisterFormPassword").value = "" //DVD Added
      // document.getElementById("defaultRegisterRepeatPassword").value = "" //DVD Added

      let response = await fetch(`https://baas.kinvey.com/user/${appID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(appID + ":" + appKey)}`,
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        //DVD Note Change to already registered? Happens when trying to duplicate a user.
        if(response.statusText){
          throw 'User registration unsuccessful'
        } 
        throw response.statusText
      }

      console.log("registered");
      console.log(await response.json());
      window.location.href = "#/";
      notify('User registration successful', 'success', context)
    } catch (e) {
      console.log(e);
      notify(e, 'error', context)
    }
  }

  // Note DVD
  // After a successful login, a notification message "Login successful." should be shown and the user home screen should be displayed. DONE
  // In case of error, an appropriate error message should be displayed, and the user should be able to fill in the login form again. DONE
  // Keep the user session data in the browser's session storage. DONE
  // Clear all input fields after a successful login. DONE
  
  async login(context) { //we passed the context in the parameters when calling login
    // params are the values in the form, the variable name is the form input attribute name in this case the params object will be
    // {
    //     username: 'input value'
    //     password: 'input value'
    // }
    let { params } = context
    notify('Loading...','loading', context)
    try {
      let response = await fetch(
        `https://baas.kinvey.com/user/${appID}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(appID + ":" + appKey)}`,
          },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) { 
        throw response.statusText;
      }

      let session = await response.json();
      sessionStorage.setItem("session", JSON.stringify(session));
      console.log(session);
      console.log(session._id);//DVD Note: to pull the session id from for the recipes
      window.location.href = "#/";
      notify('Login successful', 'success', context)//DVD Added

    } catch (e) {
      notify('Invalid credentials. Please retry your request with correct credentials.', 'error', context)//DVD Added
      document.getElementById("defaultRegisterFormUsername").value = "" //DVD Added
      document.getElementById("defaultRegisterFormPassword").value = "" //DVD Added
      console.log(e);
    }
  }

  // Note DVD
  // Successfully logged in users should be able to logout from the app. DONE
  // After a successful logout, a notification message "Logout successful." should be displayed and the anonymous screen should be shown DONE
  // The "logout" REST service at the back-end must be called at logout. DONE
  // All local information in the browser (user session data) about the current user should be deleted. DONE

  async logout(context) { 
    console.log(this.session);
    if (this.session) {
      try {
        let response = await fetch(
          `https://baas.kinvey.com/user/${appID}/_logout`,
          {
            method: "POST",
            headers: {
              Authorization: `Kinvey ${this.session._kmd.authtoken}`,
            },
          }
        );

        if (!response.ok) {
          throw response.statusText;
        }
        sessionStorage.clear();
        this._session = null;
        window.location.href = "#/";
        notify('Logout successful', 'success', context) 
      } catch (e) {
        console.log(e);
      }
    }
  }
}

//let appID = "kid_B1uSUkp-w"
//let appKey = "51eface50e1e4ea79feb91a22cfa7523"

//How to make the notification stay for 5 seconds
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

  async register(context) {
    let { params } = context
    notify('signing up...', 'loading', context)
    const { password, repeatPassword } = params;
    try {
      if (!password === repeatPassword) {
        throw "password and repeat password not equal";
      }

      let response = await fetch(`https://baas.kinvey.com/user/${appID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(appID + ":" + appKey)}`,
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw response.statusText;
      }

      console.log("registered");
      notify('registration successfull', 'success', context)
      console.log(await response.json());
    } catch (e) {
      console.log(e);
      notify(e, 'error', context)
    }
  }

  async login(context) { //we passed the context in the parameters when calling login
    // params are the values in the form, the variable name is the form input attribute name in this case the params object will be
    // {
    //     username: 'input value'
    //     password: 'input value'
    // }
    let { params } = context
    notify('logging in...','loading', context)
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
      window.location.href = "#/";
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
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
      } catch (e) {
        console.log(e);
      }
    }
  }
}

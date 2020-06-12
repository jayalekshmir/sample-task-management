import Dashboard from "../dashboard/dashboard.controller";

export default class LogIn {

  public path = '/login';

  constructor(private isLoggedOut:boolean = false) {
    let html: string = `
    <div class="login">
    <div id="logged-out" class="success"></div>
    <form class="form-signin">
      <h4 class="h4 mb-3  text-center">Please sign in</h4>
      <div class="form-group">
        <label for="inputEmail">Email address </label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address" 
          autofocus=""
        />
      </div>
      <div class="form-group">
        <label for="inputPassword">Password </label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"  
        />
      </div>
      <div id="validation-error" class="validation-error"></div>
      <div class="checkbox mb-3 text-center">
        <label> <input type="checkbox" value="remember-me" /> Remember me </label>
      </div>
      <button id="login-btn" class="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
    </form>
    </div>

    `;
    document.getElementById("root").innerHTML = html;
    let loginBtn = document.getElementById('login-btn');
    this.isLoggedOut ? document.getElementById('logged-out').innerText = 'You have successfully logged out.': null;
    loginBtn.addEventListener('click', (e:Event)=>{
      e.preventDefault();
      let userName: string = (document.getElementById('inputEmail') as HTMLInputElement).value;
      let password: string = (document.getElementById('inputPassword') as HTMLInputElement).value;
      this.authenticate(userName,password);
    });
  }
  
  authenticate(userName: string, password: string) {
    if(!userName || !password || userName === "" || password === ""){
      document.getElementById("validation-error").innerText = "Please fill in the requiered fields.";
      return false;
    }
    if (userName == "admin" && password == "admin") {
      new Dashboard(userName);
      return true;
    } else {
      document.getElementById("validation-error").innerText = "Username and password does not match"
      return false;
    }
  }

}


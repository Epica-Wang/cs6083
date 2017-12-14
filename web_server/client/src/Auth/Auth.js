class Auth {
  static authenticateUser(token, userName){
    localStorage.setItem('token', token);
    localStorage.setItem('username', userName);
  }

  static isAuthenticated(){
    return localStorage.getItem('username') !== null;
  }

  static deauthenticateUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  static getToken(){
    return localStorage.getItem('token');
  }

  static getUsername(){
    return localStorage.getItem('username');
  }
}

export default Auth;

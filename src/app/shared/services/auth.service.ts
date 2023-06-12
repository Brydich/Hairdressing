export class AuthService{
  private isAuth = false;
  login(){
    this.isAuth = true;
  }
  logout(){
    this.isAuth=false;
  }
  public isLoggedIn(){
    return this.isAuth;
  }
}

import { refreshToken } from "./api";
class UserRefresh {

  constructor(id) {
    this._id = id
  }
  async refreshUserToken() {
    await refreshToken(this._id);
  }
  
  timeOut = () => {
    setTimeout(() => {
      this.refreshUserToken(this._id);
    }, 5000);
  };

  clearTiming = () => clearTimeout();
}

export default UserRefresh;

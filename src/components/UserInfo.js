export default class UserInfo {
  constructor({nameElementSelector, aboutElementSelector}) {
    this._nameElement = document.querySelector(nameElementSelector)
    this._aboutElement = document.querySelector(aboutElementSelector)
  }

  getUserInfo() {
    return {
      profileName: this._nameElement.textContent,
      profileAbout: this._aboutElement.textContent
    }
  }

  setUserInfo({profileName, profileAbout}) {
    this._nameElement.textContent = profileName
    this._aboutElement.textContent = profileAbout
  }
}

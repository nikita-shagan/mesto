export default class UserInfo {
  constructor({nameElementSelector, aboutElementSelector}) {
    this._nameElement = document.querySelector(nameElementSelector)
    this._aboutElement = document.querySelector(aboutElementSelector)
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    }
  }

  setUserInfo({name, about}) {
    this._nameElement.textContent = name
    this._aboutElement.textContent = about
  }
}

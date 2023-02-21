export default class UserInfo {
  constructor({nameElementSelector, aboutElementSelector, avatarElementSelector}) {
    this._nameElement = document.querySelector(nameElementSelector)
    this._aboutElement = document.querySelector(aboutElementSelector)
    this._avatarElement = document.querySelector(avatarElementSelector)
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src,
      _id: this._id
    }
  }

  setUserInfo({name, about, avatar, _id}) {
    this._nameElement.textContent = name
    this._aboutElement.textContent = about
    this._avatarElement.src = avatar
    this._id = _id
  }
}

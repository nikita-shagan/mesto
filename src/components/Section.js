export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  addItemToStart(itemData) {
    const elem = this._renderer(itemData)
    this._container.prepend(elem)
  }

  addItemToEnd(itemData) {
    const elem = this._renderer(itemData)
    this._container.append(elem)
  }

  clear() {
    this._container.innerHTML = ''
  }

  renderItems(items) {
    this.clear();
    items.forEach(itemData => {
      this.addItemToEnd(itemData)
    });
  }
}

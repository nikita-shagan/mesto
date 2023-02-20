export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  addItem(itemData) {
    const elem = this._renderer(itemData);
    this._container.prepend(elem)
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(items) {
    this.clear();
    items.forEach(itemData => {
      this.addItem(itemData)
    });
  }
}

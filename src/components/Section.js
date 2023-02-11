export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items
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

  renderItems() {
    this.clear();
    this._items.forEach(itemData => {
      this.addItem(itemData)
    });
  }
}

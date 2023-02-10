export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  renderItem(itemData) {
    return this._renderer(itemData);
  }

  addItem(elem) {
    this._container.prepend(elem)
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();
    this._items.forEach(itemData => {
      const elem  = this.renderItem(itemData)
      this.addItem(elem)
    });
  }
}

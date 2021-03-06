class Group {
  constructor() {
    this.elems = [];
    this.length = 0;
  }

  all() {
    return this.elems;
  }

  // Add element to the group
  add(e) {
    this.elems.push(e);
    this.length = this.elems.length;
  }

  update(deltaTime) {
    let del = [], i, el;
    for(i = this.elems.length; i--;) {
      el = this.elems[i];

      // Update element
      if (el['update']) el.update(deltaTime);
      // Mark to delete if not alive
      if (!el.alive) del.push(i);
    }

    // Delete from array
    if (del.length > 0) {
      this.elems = this.elems.filter((v, i) => {
        return del.indexOf(i) < 0;
      });
    }
    this.length = this.elems.length;
  }

  // Clear group
  clear() {
    this.elems = [];
  }

  // Returns element at index `i`
  at(i) {
    return this.elems[i];
  }
}

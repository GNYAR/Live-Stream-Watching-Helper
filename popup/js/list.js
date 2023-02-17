class List {
  set(arr) {
    const str = JSON.stringify(arr);
    localStorage.setItem("list", str);
  }

  get() {
    const str = localStorage.getItem("list");
    return JSON.parse(str) ?? [];
  }

  includes(id) {
    const list = this.get();
    return list.includes(id);
  }

  push(id) {
    if (this.includes(id)) return;
    const list = this.get();
    this.set([...list, id]);
  }

  remove(id) {
    if (!this.includes(id)) return;
    const list = this.get();
    this.set(list.filter((x) => x !== id));
  }
}

const list = new List();

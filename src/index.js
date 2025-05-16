class HashMap {
  constructor() {
    this.loadfactor = 0.75;
    this.capacity = 0;
    this.map = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  bucket(key) {
    let h = this.hash(key);
    return this.map[h % this.map.length];
  }

  entry(bucket) {
    for (let e of bucket) {
      e;
      return e;
    }
    return false;
  }

  set(key, value) {
    let b = this.bucket(key);
    let e = this.entry(b);
    if (!e) {
      const list = new LinkedList();
      list.prepend(key, value);
      b.push(list);
      this.capacity = this.capacity + 1;
      if (this.capacity > this.loadfactor * this.map.length) {
        this.grow();
      }
      return;
    }
    if (e.contains(key)) {
      let y = e.find(key);
      y.value = value;
      return;
    }
    e.append(key, value);
    this.capacity = this.capacity + 1;
    if (this.capacity > this.loadfactor * this.map.length) {
      this.grow();
    }
  }

  get(key) {
    let b = this.bucket(key);
    let e = this.entry(b);
    if (e.contains(key)) {
      let y = e.find(key);
      return y.value;
    }
    return null;
  }

  has(key) {
    let b = this.bucket(key);
    let e = this.entry(b);
    if (e.contains(key)) {
      return true;
    }
    return false;
  }

  remove(key) {
    let b = this.bucket(key);
    let e = this.entry(b);
    if (e.contains(key)) {
      e.removeAt(key);
      return true;
    }
    return false;
  }

  length() {
    let total = 0;
    for (let x = 0; x < this.map.length; x++) {
      if (this.map[x].length > 0) {
        total += this.map[x][0].size();
      }
    }
    return total;
  }

  clear() {
    this.map = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    this.capacity = 0;
  }

  keys() {
    let all = [];
    for (let x = 0; x < this.map.length; x++) {
      if (this.map[x].length > 0) {
        this.map[x][0].toArray(0, all);
      }
    }
    return all;
  }

  values() {
    let all = [];
    for (let x = 0; x < this.map.length; x++) {
      if (this.map[x].length > 0) {
        this.map[x][0].toArray(1, all);
      }
    }
    return all;
  }

  entries() {
    let all = [];
    for (let x = 0; x < this.map.length; x++) {
      if (this.map[x].length > 0) {
        this.map[x][0].toArray(2, all);
      }
    }
    return all;
  }

  grow() {
    let bigmap = new Array();
    let all = this.entries();
    this.capacity = 0;
    for (let y = 0; y < this.map.length * 2; y++) {
      bigmap.push([]);
    }
    this.map = bigmap;
    for (let x = 0; x < all.length; x++) {
      this.set(all[x][0], all[x][1]);
    }
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(key, value) {
    let contain = this.contains(key);
    if (contain) {
      let tmp = this.head;
      let x = 0;
      while (tmp != null) {
        if (tmp.key == key) {
          this.value == value;
          return;
        }
      }
    }
    const newNode = new Node(key, value, this.head);
    this.head = newNode;
    if (this.tail !== null) {
      this.tail = this.tail;
    } else {
      this.tail = newNode;
    }
  }

  append(key, value) {
    const newNode = new Node(key, value, null);
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    this.tail.next = newNode;
    this.tail = newNode;
  }

  contains(key) {
    let tmp = this.head;
    while (tmp != null) {
      if (tmp.key == key) {
        return true;
      }
      tmp = tmp.next;
    }
    return false;
  }

  find(key) {
    let tmp = this.head;
    let x = 0;
    while (tmp != null) {
      if (tmp.key == key) {
        return tmp;
      }
      x++;
      tmp = tmp.next;
    }
    return false;
  }

  removeAt(key) {
    let x = 0;
    let tmp = this.head;
    if (tmp.key == key) {
      this.head = tmp.next;
      return;
    }
    while (tmp != null) {
      if (tmp.next.key == key) {
        break;
      }
      tmp = tmp.next;
      x++;
    }
    if (tmp.next.next == null) {
      this.pop();
      return;
    }
    tmp.next = tmp.next.next;
  }

  pop() {
    let size = this.size();
    if (size == 1) {
      this.head = null;
      this.tail = null;
      return;
    }
    let tmp = this.head;
    for (let x = 0; x < size; x++) {
      if (tmp.next == null || tmp.next.next == null) {
        break;
      }
      tmp = tmp.next;
    }
    this.tail = tmp;
    tmp.next = null;
  }

  size() {
    let tmp = this.head;
    let s = 0;
    while (tmp != null) {
      tmp = tmp.next;
      s++;
    }
    return s;
  }

  toArray(y, array) {
    let size = this.size();
    let tmp = this.head;
    if (y == 0) {
      for (let x = 0; x < size; x++) {
        array.push(tmp.key);
        if (tmp.next == null) {
          return array;
        } else {
          tmp = tmp.next;
        }
      }
    }
    if (y == 1) {
      for (let x = 0; x < size; x++) {
        array.push(tmp.value);
        if (tmp.next == null) {
          return array;
        } else {
          tmp = tmp.next;
        }
      }
    }
    if (y == 2) {
      for (let x = 0; x < size; x++) {
        array.push([tmp.key, tmp.value]);
        if (tmp.next == null) {
          return array;
        } else {
          tmp = tmp.next;
        }
      }
    }
  }
}

class Node {
  constructor(key, value, next) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

let test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
console.log(test);

test.set("moon", "silver");

console.log(test);

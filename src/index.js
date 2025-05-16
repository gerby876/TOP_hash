class HashMap {
  constructor() {
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

  entry(bucket, key) {
    console.log(bucket);
    for (let e of bucket) {
      if (!e.contains(key)) {
        return e;
      }
      return null;
    }
  }

  set(key, value) {
    if (!value) {
      value = this.hash(key);
    }
    let b = this.bucket(key);
    let e = this.entry(b, key);
    if (e) {
      e.append(value);
      return;
    }
    const list = new LinkedList();
    list.prepend(value);
    b.push(list);
  }

  get(key) {
    let b = this.bucket(key);
    let e = this.entry(b, key);
    if (e) {
      console.log(e.find());
      return e.data;
    }
    return null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(value) {
    const newNode = new Node(value, this.head);

    this.head = newNode;
    if (this.tail !== null) {
      this.tail = this.tail;
    } else {
      this.tail = newNode;
    }
  }

  append(value) {
    const newNode = new Node(value, null);
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    this.tail.next = newNode;
    this.tail = newNode;
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

  at(index) {
    let tmp = this.head;
    for (let x = 0; x < index; x++) {
      tmp = tmp.next;
      if (tmp == null) {
        return alert("Node not found.");
      }
    }
    return tmp;
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

  contains(value) {
    let tmp = this.head;
    while (tmp != null) {
      if (tmp.data == value) {
        return true;
      }
      tmp = tmp.next;
    }
    return false;
  }

  find(value) {
    let tmp = this.head;
    let x = 0;
    while (tmp != null) {
      if (tmp.data == value) {
        return x;
      }
      x++;
      tmp = tmp.next;
    }
    return false;
  }

  toString() {
    let size = this.size();
    let tmp = this.head;
    let output = "";
    let newout = "";
    for (let x = 0; x < size; x++) {
      newout = output + `(${tmp.data}) -> `;
      output = newout;
      tmp = tmp.next;
      if (tmp == null) {
        newout = output + "null";
      }
    }
    return newout;
  }

  insertAt(value, index) {
    const newNode = new Node(value);
    let tmp = this.head;
    for (let x = 0; x < index; x++) {
      if (x === index - 1) {
        newNode.next = tmp.next;
        tmp.next = newNode;
      }
      tmp = tmp.next;
    }
  }

  removeAt(index) {
    let x = 0;
    let tmp = this.head;
    while (x < index - 1) {
      tmp = tmp.next;
      x++;
    }
    tmp.next = tmp.next.next;
  }
}

class Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

let newmap = new HashMap();

newmap.set("Sara");
newmap.set("raSa");
newmap.set("Sara");

newmap.get("raSa");

console.log(newmap);

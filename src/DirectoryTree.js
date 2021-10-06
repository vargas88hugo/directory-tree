export default class DirectoryTree {
  constructor(name, composites = []) {
    this.name = name;
    this.composites = composites.sort((x, y) => x.name - y.name);
  }

  print(tab = '') {
    console.log(`${tab}${this.name}`);
    this.composites.forEach(item => item.print(tab + ' '));
  }
}
export default class DirectoryTree {
  constructor(name, directories = []) {
    this.name = name
    this.directories = directories.sort((x, y) => x.name - y.name);
    this.root = false;
  }

  setRoot() {
    this.root = true;
    return this;
  }

  setDirectories(directories = []) {
    this.directories = directories;
  }

  print(tab = '') {   
    if (this.root) {
      this.directories.forEach(directory => directory.print())
    } else {
      console.log(`${tab}${this.name}`);
      this.directories.forEach(directory => directory.print(tab + ' '));
    }
  }
}
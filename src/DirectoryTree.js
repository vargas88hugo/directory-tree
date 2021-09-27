class DirectoryTree {
  // directoryTree = new Map([['a'], ['b', new Map([['c', new Map([['d'], ['f']])]])], ['g']]);
  directoryTree = new Map();

  create(directory) {
    this.directoryTree.set(directory, new Map());
  }

  move(directory, path) {

  }

  delete(directory) {

  }

  list() {
    this._printDirectory(this.directoryTree, '');
  }

  _printDirectory(directoryTree, space) {
    if (!directoryTree) return;

    const entries = Array.from(directoryTree.entries());

    for (const entry of entries) {
      const entryKey = entry[0];
      const entryValue = entry[1];
      console.log(space + entryKey)
      if (entryValue && entryValue instanceof Map) {
        this._printDirectory(entryValue, space + ' ');
      }
    }
  }

  find(directory) {
    this.directoryTree.get(directory);
  }


}

export default DirectoryTree;
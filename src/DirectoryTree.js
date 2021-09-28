import { DoesNotExistException, InvalidTypeException } from "./utils/exceptions";

class DirectoryTree {
  // directoryTree = new Map([['a'], ['b', new Map([['c', new Map([['d'], ['f']])]])], ['g']]);
  directoryTree = new Map();

  create(path) {
    // this.directoryTree.set(directory, new Map());
    this._validatePath(path);
    const splitPath = path.split('/');
    if (splitPath.length > 1) {
      this._createCompoundDirectory(splitPath);
    } else {
      const directory = splitPath[0];
      this.directoryTree.set(directory, new Map());
    }
  }

  move(directory, path) {

  }

  delete(directory) {

  }

  list() {
    // console.log({list:this.directoryTree})
    this._printDirectory(this.directoryTree, '');
  }

  _printDirectory(directoryTree, space) {
    if (!directoryTree) return;

    const entries = Array.from(directoryTree.entries());

    for (const entry of entries) {
      const [entryKey, entryValue] = entry;
      console.log(space + entryKey)
      if (entryValue && entryValue instanceof Map) {
        this._printDirectory(entryValue, space + ' ');
      }
    }
  }

  _validatePath(path) {
    if (!path) throw new DoesNotExistException('path');
    if (typeof path !== 'string' && !(path instanceof String)) throw new InvalidTypeException('path');
  }

  _validateSubDirectory(subdirectory) {
    if (!subdirectory) throw new DoesNotExistException('subdirectory');
    if (!(subdirectory instanceof Map)) throw new InvalidTypeException('subdirectory');
  }

  _createCompoundDirectory(path) {
    const workspace = path.slice(0, -1);
    const baseName = path[path.length - 1];
    const workspaceMap = this._getWorkspace(workspace);
    this._insertDirectoryInWorkspace(workspaceMap, baseName);
  }

  _getWorkspace(workspace) {
    let currentSubdirectory = this.directoryTree;
    for (const subdirectory of workspace) {
      currentSubdirectory = currentSubdirectory.get(subdirectory);
      this._validateSubDirectory(currentSubdirectory);
    }
    return currentSubdirectory;
  }

  _insertDirectoryInWorkspace(workspaceMap, baseName) {
    workspaceMap.set(baseName, new Map());
  }
}

export default DirectoryTree;
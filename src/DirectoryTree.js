import { NotCommandException } from './utils/exceptions';

class DirectoryTree {
  directoryTree = new Map();

  create(directory) {
    this.directoryTree.add(directory);
  }

  move(directory, path) {

  }

  delete(directory) {
    
  }

  find(directory) {
    this.directoryTree.get(directory);
  }


}

export default DirectoryTree;
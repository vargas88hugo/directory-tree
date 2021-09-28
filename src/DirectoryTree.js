import { DoesNotExistException, InvalidTypeException } from './utils/exceptions';
import logger from './utils/logger';

class DirectoryTree {
  constructor () {
  	this.directoryTree = new Map();
  }

  create (path, directory) {
  	this._validatePath(path);
  	const { workspace, baseName } = this._splitPath(path);
  	const keyValueDirectory = [baseName, directory || new Map()];
  	this._createDirectory(workspace, keyValueDirectory);
  }

  move (source, destiny) {
  	let path = destiny.split('/').slice(0, -1).join('/');
  	path = (path) ? path + '/' + destiny : destiny;
  	const deletedDirectory = this.delete(source);
  	this.create(path, deletedDirectory);
  }

  delete (path) {
  	this._validatePath(path);
  	const { workspace, baseName } = this._splitPath(path);
  	const deletedDirectory = this._deleteDirectory(workspace, baseName);
  	return deletedDirectory;
  }

  list () {
  	this._printDirectory(this.directoryTree, '');
  }

  _printDirectory (directoryTree, space) {
  	if (!directoryTree) return;
  	const entries = Array.from(directoryTree.entries());
  	for (const entry of entries.sort()) {
  		const [entryKey, entryValue] = entry;
  		logger.log(space + entryKey);
  		if (entryValue && entryValue instanceof Map) {
  			this._printDirectory(entryValue, space + ' ');
  		}
  	}
  }

  _validatePath (path) {
  	if (!path) throw new DoesNotExistException('path');
  	if (typeof path !== 'string' && !(path instanceof String)) throw new InvalidTypeException('path');
  }

  _validateSubDirectory (subdirectory) {
  	if (!subdirectory) throw new DoesNotExistException('subdirectory');
  	if (!(subdirectory instanceof Map)) throw new InvalidTypeException('subdirectory');
  }

  _createDirectory (workspace, keyValueDirectory) {
  	const [key, value] = keyValueDirectory;
  	const workspaceMap = this._getWorkspace(workspace);
  	const oldValues = workspaceMap.get(key);
  	workspaceMap.set(key, (oldValues) ? new Map([...value, ...oldValues]) : value);
  }

  _deleteDirectory (workspace, baseName) {
  	const workspaceMap = this._getWorkspace(workspace);
  	const directoryCopy = (workspace.length > 0) ? new Map(workspaceMap) : new Map([[baseName, workspaceMap.get(baseName)]]);
  	workspaceMap.delete(baseName);
  	return directoryCopy;
  }

  _getWorkspace (workspace) {
  	let currentSubdirectory = this.directoryTree;
  	for (const subdirectory of workspace) {
  		currentSubdirectory = currentSubdirectory.get(subdirectory);
  		this._validateSubDirectory(currentSubdirectory);
  	}
  	return currentSubdirectory;
  }

  _splitPath (path) {
  	const splitPath = path.split('/');
  	const workspace = splitPath.slice(0, -1);
  	const baseName = splitPath[splitPath.length - 1];
  	return { workspace, baseName };
  }
}

export default DirectoryTree;

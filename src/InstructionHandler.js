import { DoesNotExistException, InvalidTypeException } from './utils/exceptions';
import { VALID_COMMANDS } from './utils/constants';
import logger from './utils/logger.js';
import DirectoryTree from './DirectoryTree';

class InstructionHandler {
  constructor (directoryTree) {
    this._validateDirectoryTree(directoryTree);
    this._directoryTree = directoryTree;
    this._executionMap = new Map();
  }

  processInstructions (instructions) {
    for (const instruction of instructions) {
      try {
        this._processInstruction(instruction);
      } catch (error) {
        logger.error(error.message);
      }
    }
  }

  set executionMap (value) {
    this._executionMap = value;
  }

  get executionMap () {
    return this._executionMap;
  }

  _processInstruction (instruction) {
    if (!instruction || !instruction.length) throw new DoesNotExistException('instruction');
    const { command, path, destiny } = this._getCommandAndDirectory(instruction);
    this._validateCommand(command);
    this._executeCommand(command, path, destiny);
  }

  _getCommandAndDirectory (instruction) {
    const [command, path, destiny] = instruction.split(/\s+/);
    return { command, path, destiny };
  }

  _validateCommand (command) {
    if (!command || !command.length) throw new DoesNotExistException('command');
    if (!VALID_COMMANDS.includes(command.toUpperCase().trim())) throw new InvalidTypeException('command');
  }

  _validateDirectoryTree (directoryTree) {
    if (!directoryTree) throw new DoesNotExistException('directory tree');
    if (!(directoryTree instanceof DirectoryTree)) throw new InvalidTypeException('directory tree');
  }

  _executeCommand (command, path, destiny) {
    logger.log(`${command} ${path || ''} ${destiny || ''}`);
    const executionFunction = this._executionMap.get(command);
    const bindFunction = executionFunction.bind(this._directoryTree);
    bindFunction(path, destiny);
  }
}

export default InstructionHandler;

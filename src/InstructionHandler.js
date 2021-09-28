import { DoesNotExistException, InvalidTypeException } from './utils/exceptions';
import { COMMANDS_MAP } from './utils/constants';
import DirectoryTree from './DirectoryTree';

class InstructionHandler {
  constructor (directoryTree, logger) {
    this._validateDirectoryTree(directoryTree);
    this._directoryTree = directoryTree;
    this._executionMap = new Map();
    this.logger = logger;
  }

  processInstructions (instructions) {
    for (const instruction of instructions) {
      try {
        this._processInstruction(instruction);
      } catch (error) {
        this.logger.error(error.message);
      }
    }
  }

  set executionMap (value) {
    this._executionMap = value;
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
    if (!Object.values(COMMANDS_MAP).includes(command.toUpperCase().trim())) throw new InvalidTypeException('command', command);
  }

  _validateDirectoryTree (directoryTree) {
    if (!directoryTree) throw new DoesNotExistException('directory tree');
    if (!(directoryTree instanceof DirectoryTree)) throw new InvalidTypeException('directory tree', directoryTree);
  }

  _executeCommand (command, path, destiny) {
    let string = command;
    if (path) string += ` ${path}`;
    if (destiny) string += ` ${destiny}`;
    this.logger.log(string);
    const executionFunction = this._executionMap.get(command);
    const bindFunction = executionFunction.bind(this._directoryTree);
    bindFunction(path, destiny);
  }
}

export default InstructionHandler;

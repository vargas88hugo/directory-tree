import {
  NotInstructionException,
  NotCommandException,
  InvalidCommandException,
  NotDirectoryTreeException,
  InvalidDirectoryTreeException,
  DoesNotExistException,
  InvalidTypeException
} from './utils/exceptions';
import { VALID_COMMANDS } from './utils/constants';
import logger from './utils/logger.js';
import DirectoryTree from './DirectoryTree';

class InstructionHandler {
  constructor(directoryTree) {
    this.directoryTree = directoryTree;
    this._validateDirectoryTree(this.directoryTree);
  }

  processInstructions(instructions) {
    for (const instruction of instructions) {
      try {
        this._processInstruction(instruction);
      } catch (error) {
        logger.error(error);
      }
    }
  }

  _processInstruction(instruction) {
    if (!instruction || !instruction.length) throw new DoesNotExistException('instruction');
    const { command, directory } = this._getCommandAndDirectory(instruction);
    this._validateCommand(command);
    this._executeCommand(command, directory);
  }

  _getCommandAndDirectory(instruction) {
    const [command, directory] = instruction.split(/\s+/);
    return { command, directory };
  }

  _validateCommand(command) {
    if (!command || !command.length) throw new DoesNotExistException('command');
    if (!VALID_COMMANDS.includes(command.toUpperCase().trim())) throw new InvalidTypeException('command');
  }

  _validateDirectoryTree(directoryTree) {
    if (!directoryTree) throw new DoesNotExistException('directory tree');
    if (!(directoryTree instanceof DirectoryTree)) throw new InvalidTypeException('directory tree');
  }

  _executeCommand(command, directory) {
    if (command === 'LIST') {
      this.directoryTree.list();
    } else if (command === 'CREATE') {
      this.directoryTree.create(directory);
    }
  }
}

export default InstructionHandler;
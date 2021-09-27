import { NotInstructionException, NotCommandException, InvalidCommandException } from './utils/exceptions';
import { VALID_COMMANDS } from './utils/constants';
import logger from './utils/logger.js';

class InstructionHandler {
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
    if (!instruction || !instruction.length) throw new NotInstructionException();
    const command = this._getCommand(instruction);
    this._validateCommand(command);
  }

  _getCommand(instruction) {
    const command = instruction.split(/\s+/)[0];
    return command;
  }

  _validateCommand(command) {
    if (!command || !command.length) throw new NotCommandException();
    if (!VALID_COMMANDS.includes(command.toUpperCase().trim())) throw new InvalidCommandException(command);
  }

  _executeCommand(command, directoryTree) {

  }


  _verifyDirectory(path) {

  }
}

export default InstructionHandler;
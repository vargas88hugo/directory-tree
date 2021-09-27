import { NotInstructionException, NotCommandException, InvalidCommandException } from './utils/exceptions';
import { VALID_COMMANDS } from './utils/constants';

class InstructionHandler {
  processInstructions(instructions) {
    for (const instruction of instructions) {
      this._processInstruction(instruction);
    }
  }

  _processInstruction(instruction) {
    if (!instruction || !instruction.length) throw NotInstructionException();
    this._getCommand(instruction);
  }

  _getCommand(instruction) {
    const command = instruction.split(/\s+/)[0];
    if (!command || !command.length) throw NotCommandException();
    if (isNotValidCommand(command)) throw InvalidCommandException(command)
    return command
  }

  _isNotValidCommand(command) {
    if (VALID_COMMANDS.includes(command.toUpperCase().trim())) return false;
    return true;
  }

  _executeCommand(command, directoryTree) {

  }


  _verifyDirectory(path) {

  }
}

export default InstructionHandler;
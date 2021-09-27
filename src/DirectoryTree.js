import { NotCommandException } from './utils/exceptions';

class DirectoryTree {
  processInstructions(instructions) {
    for (const instruction of instructions) {
      this._processInstruction(instruction);
    }
  }

  _processInstruction(instruction) {
    if (!instruction.length) throw NotCommandException();
    
  }

  _getCommand(instruction) {

  }

  _verifyCommand(command) {

  }

  _executeCommand(command) {

  }


  _findDirectory(path) {

  }
}

export default DirectoryTree;
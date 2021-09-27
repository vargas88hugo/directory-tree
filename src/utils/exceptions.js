export class NotCommandException extends Error {
  description;

  constructor() {
      super();
      this.message = 'Command is empty';
  }
}

export class NotInstructionException extends Error {
  description;

  constructor() {
      super();
      this.message = 'Instruction is empty'
  }
}

export class InvalidCommandException extends Error {
  description;

  constructor(command) {
      super();
      this.message = `Command ${command} is invalid`;
  }
}
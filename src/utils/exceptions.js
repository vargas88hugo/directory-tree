export class NotCommandException extends Error {  
  constructor() {
      super();
      this.message = `Command doesn't exist`;
  }
}

export class NotInstructionException extends Error {
  constructor() {
      super();
      this.message = `Instruction doesn't exist`;
  }
}

export class NotDirectoryTreeException extends Error {
  constructor() {
    super();
    this.message = `Directory tree doesn't exist`;
  }
}

export class InvalidCommandException extends Error {
  constructor(command) {
      super();
      this.message = `Command ${command} is invalid`;
  }
}

export class InvalidDirectoryTreeException extends Error {
  constructor() {
      super();
      this.message = `Directory Tree is invalid`;
  }
}

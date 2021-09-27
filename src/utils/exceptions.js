export class NotCommandException extends Error {
  description;

  constructor(msg, description){
      super();
      this.message = msg;
      this.description = description;
  }
}

export class NotInstructionException extends Error {
  description;

  constructor(msg, description){
      super();
      this.message = msg;
      this.description = description;
  }
}

export class InvalidCommandException extends Error {
  description;

  constructor(msg, description){
      super();
      this.message = msg;
      this.description = description;
  }
}
// export class NotCommandException extends Error {
//   constructor() {
//       super();
//       this.message = `Command doesn't exist or is empty`;
//   }
// }

// export class NotPathException extends Error {
//   constructor() {
//       super();
//       this.message = `Path doesn't exist or is empty`;
//   }
// }

// export class NotInstructionException extends Error {
//   constructor() {
//       super();
//       this.message = `Instruction doesn't exist or is empty`;
//   }
// }

// export class NotDirectoryTreeException extends Error {
//   constructor() {
//     super();
//     this.message = `Directory tree doesn't exist or is empty`;
//   }
// }
export class DoesNotExistException extends Error {
  constructor (property) {
    super();
    this.message = `${property || 'property'} doesn't exist or is empty`;
  }
}

// export class InvalidCommandException extends Error {
//   constructor(command) {
//       super();
//       this.message = `Command ${command} is invalid`;
//   }
// }

// export class InvalidDirectoryTreeException extends Error {
//   constructor() {
//       super();
//       this.message = `Directory Tree is invalid`;
//   }
// }
export class InvalidTypeException extends TypeError {
  constructor (property) {
    super();
    this.message = `${property || 'property'} is invalid`;
  }
}

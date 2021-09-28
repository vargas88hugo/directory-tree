export class DoesNotExistException extends Error {
  constructor (property) {
    super();
    this.message = `Error: ${property || 'property'} doesn't exist or is empty`;
  }
}

export class InvalidTypeException extends TypeError {
  constructor (property, value) {
    super();
    this.message = `Error: ${property || 'property'} ${value || ''} is invalid`;
  }
}

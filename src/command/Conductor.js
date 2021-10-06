export default class Conductor {
  constructor(directory) {
    this.directory = directory;
  }
  
  run(command) {
    command.execute();
  }
}
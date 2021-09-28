import fs from 'fs';

class FileReader {
  constructor (logger) {
    this.logger = logger;
  }

  readFile (path) {
    try {
      const rowData = fs.readFileSync(path);
      const parsedData = rowData.toString().split('\n').filter((line) => line !== '');
      return parsedData;
    } catch (error) {
      this._catchError(error);
    }
  }

  _catchError (error) {
    this.logger.error(`File reader ${error}`);
    process.exit(1);
  }
}

export default FileReader;

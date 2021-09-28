import fs from 'fs';
import logger from './utils/logger';

class FileReader {
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
    logger.error(`File reader ${error}`);
    process.exit(1);
  }
}

export default FileReader;

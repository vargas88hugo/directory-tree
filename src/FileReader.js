import fs from 'fs';

class FileReader {
  
  readFile(path) {
    const data = fs.readFileSync(path).toString().split('\n').filter(line => line !== '');

    return data;
  }
}

export default FileReader;
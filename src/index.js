import 'dotenv/config';
import path from 'path';
import FileReader from './FileReader';
import DirectoryTree from './DirectoryTree';

const fileReader = new FileReader();
const filePath = path.resolve(__dirname, process.env.FILE_PATH);
const instructions = fileReader.readFile(filePath);

const directoryTree = new DirectoryTree();
directoryTree.processInstructions(instructions);
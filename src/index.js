import 'dotenv/config';
import path from 'path';
import FileReader from './FileReader';
import DirectoryTree from './DirectoryTree';
import InstructionHandler from './InstructionHandler';

const fileReader = new FileReader();
const filePath = path.resolve(__dirname, process.env.FILE_PATH);
const instructions = fileReader.readFile(filePath);
// const instructions = ['LIST']

const instructionHandler = new InstructionHandler(new DirectoryTree());
instructionHandler.processInstructions(instructions);

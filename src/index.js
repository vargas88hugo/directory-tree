import 'dotenv/config';
import path from 'path';
import FileReader from './FileReader';
import DirectoryTree from './DirectoryTree';
import InstructionHandler from './InstructionHandler';

const fileReader = new FileReader();
const filePath = path.resolve(__dirname, process.env.FILE_PATH);
const instructions = fileReader.readFile(filePath);

const directoryTree = new DirectoryTree();
const instructionHandler = new InstructionHandler(directoryTree);
const executionMap = new Map();

executionMap.set('CREATE', directoryTree.create);
executionMap.set('DELETE', directoryTree.delete);
executionMap.set('MOVE', directoryTree.move);
executionMap.set('LIST', directoryTree.list);
instructionHandler.executionMap = executionMap;

instructionHandler.processInstructions(instructions);

import 'dotenv/config';
import path from 'path';
import FileReader from './FileReader';
import DirectoryTree from './DirectoryTree';
import InstructionHandler from './InstructionHandler';
import { COMMANDS_MAP } from './utils/constants';

const fileReader = new FileReader();
const filePath = path.resolve(__dirname, process.env.FILE_PATH);
const instructions = fileReader.readFile(filePath);

const directoryTree = new DirectoryTree();
const instructionHandler = new InstructionHandler(directoryTree);
const executionMap = new Map();

executionMap.set(COMMANDS_MAP.create, directoryTree.create);
executionMap.set(COMMANDS_MAP.delete, directoryTree.delete);
executionMap.set(COMMANDS_MAP.move, directoryTree.move);
executionMap.set(COMMANDS_MAP.list, directoryTree.list);
instructionHandler.executionMap = executionMap;

instructionHandler.processInstructions(instructions);

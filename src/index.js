import 'dotenv/config';
import path from 'path';
import FileReader from './FileReader';
import DirectoryTree from './DirectoryTree';
import InstructionHandler from './InstructionHandler';
import { COMMANDS_MAP } from './utils/constants';
import logger from './utils/logger.js';

const fileReader = new FileReader(logger);
const filePath = path.resolve(__dirname, process.env.FILE_PATH);
const instructions = fileReader.readFile(filePath);

const directoryTree = new DirectoryTree(logger);
const instructionHandler = new InstructionHandler(directoryTree, logger);
const executionMap = new Map();

executionMap.set(COMMANDS_MAP.create, directoryTree.create);
executionMap.set(COMMANDS_MAP.delete, directoryTree.delete);
executionMap.set(COMMANDS_MAP.move, directoryTree.move);
executionMap.set(COMMANDS_MAP.list, directoryTree.list);
instructionHandler.executionMap = executionMap;

instructionHandler.processInstructions(instructions);

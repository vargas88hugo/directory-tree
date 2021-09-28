import DirectoryTree from '../src/DirectoryTree';
import InstructionHandler from '../src/InstructionHandler';
import { COMMANDS_MAP } from '../src/utils/constants';

let directoryTree;
let instructionHandler;
let executionMap;
let logger;
describe('Directory Tree', () => {
  beforeEach((done) => {
    logger = {
      error (message) {
        return message;
      },
      log (message) {
        return message;
      }
    };
    jest.spyOn(logger, 'log').mockImplementation(x => x);
    jest.spyOn(logger, 'error').mockImplementation(x => x);
    directoryTree = new DirectoryTree(logger);
    instructionHandler = new InstructionHandler(directoryTree, logger);
    executionMap = new Map();
    executionMap.set(COMMANDS_MAP.create, directoryTree.create);
    executionMap.set(COMMANDS_MAP.delete, directoryTree.delete);
    executionMap.set(COMMANDS_MAP.move, directoryTree.move);
    executionMap.set(COMMANDS_MAP.list, directoryTree.list);
    instructionHandler.executionMap = executionMap;
    done();
  });

  it('test', () => {
  });

  afterEach((done) => {
    jest.clearAllMocks();
    done();
  });

  it('it should response ok with one creation', () => {
    const instructions = ['CREATE test', 'LIST'];
    instructionHandler.processInstructions(instructions);
    expect(logger.log).toHaveNthReturnedWith(1, 'CREATE test');
    expect(logger.log).toHaveNthReturnedWith(2, 'LIST');
    expect(logger.log).toHaveNthReturnedWith(3, 'test');
  });

  it('it should response ok with nested creation', () => {
    const instructions = ['CREATE test01', 'CREATE test01/test02', 'LIST'];
    instructionHandler.processInstructions(instructions);
    expect(logger.log).toHaveNthReturnedWith(1, 'CREATE test01');
    expect(logger.log).toHaveNthReturnedWith(2, 'CREATE test01/test02');
    expect(logger.log).toHaveNthReturnedWith(3, 'LIST');
    expect(logger.log).toHaveNthReturnedWith(4, 'test01');
    expect(logger.log).toHaveNthReturnedWith(5, ' test02');
  });

  it('it should response ok with a nested move', () => {
    const instructions = ['CREATE test01', 'CREATE test01/test02', 'CREATE test03', 'MOVE test03 test01/test02', 'LIST'];
    instructionHandler.processInstructions(instructions);
    expect(logger.log).toHaveNthReturnedWith(1, 'CREATE test01');
    expect(logger.log).toHaveNthReturnedWith(2, 'CREATE test01/test02');
    expect(logger.log).toHaveNthReturnedWith(3, 'CREATE test03');
    expect(logger.log).toHaveNthReturnedWith(4, 'MOVE test03 test01/test02');
    expect(logger.log).toHaveNthReturnedWith(5, 'LIST');
    expect(logger.log).toHaveNthReturnedWith(6, 'test01');
    expect(logger.log).toHaveNthReturnedWith(7, ' test02');
    expect(logger.log).toHaveNthReturnedWith(8, '  test03');
  });

  it('it should response with one path error because path is null', () => {
    const instructions = ['CREATE'];
    instructionHandler.processInstructions(instructions);
    expect(logger.error).toHaveNthReturnedWith(1, 'Error: path doesn\'t exist or is empty');
  });

  it('it should response with one command error because command is invalid', () => {
    const instructions = ['WRONG'];
    instructionHandler.processInstructions(instructions);
    expect(logger.error).toHaveNthReturnedWith(1, 'Error: command WRONG is invalid');
  });

  it('it should response with one instruction error because instruction is null', () => {
    const instructions = [''];
    instructionHandler.processInstructions(instructions);
    expect(logger.error).toHaveNthReturnedWith(1, 'Error: instruction doesn\'t exist or is empty');
  });

  it('it should throw an error because directory tree is null', () => {
    expect(() => new InstructionHandler(null, logger)).toThrow();
  });

  it('it should throw an error because directory tree is insvalid', () => {
    expect(() => new InstructionHandler({}, logger)).toThrow();
  });

  it('complex queries should response ok', () => {
    const instructions = [
      'CREATE fruits ',
      'CREATE vegetables ',
      'CREATE grains ',
      'CREATE fruits/apples ',
      'CREATE fruits/apples/fuji ',
      'LIST ',
      'CREATE grains/squash ',
      'MOVE grains/squash vegetables ',
      'CREATE foods ',
      'MOVE grains foods ',
      'MOVE fruits foods ',
      'MOVE vegetables foods ',
      'LIST ',
      'DELETE fruits/apples ',
      'DELETE foods/fruits/apples ',
      'LIST '
    ];
    instructionHandler.processInstructions(instructions);
    expect(logger.log).toHaveNthReturnedWith(1, 'CREATE fruits');
    expect(logger.log).toHaveNthReturnedWith(2, 'CREATE vegetables');
    expect(logger.log).toHaveNthReturnedWith(3, 'CREATE grains');
    expect(logger.log).toHaveNthReturnedWith(4, 'CREATE fruits/apples');
    expect(logger.log).toHaveNthReturnedWith(5, 'CREATE fruits/apples/fuji');
    expect(logger.log).toHaveNthReturnedWith(6, 'LIST');
    expect(logger.log).toHaveNthReturnedWith(7, 'fruits');
    expect(logger.log).toHaveNthReturnedWith(8, ' apples');
    expect(logger.log).toHaveNthReturnedWith(9, '  fuji');
    expect(logger.log).toHaveNthReturnedWith(10, 'grains');
    expect(logger.log).toHaveNthReturnedWith(11, 'vegetables');
    expect(logger.log).toHaveNthReturnedWith(12, 'CREATE grains/squash');
    expect(logger.log).toHaveNthReturnedWith(13, 'MOVE grains/squash vegetables');
    expect(logger.log).toHaveNthReturnedWith(14, 'CREATE foods');
    expect(logger.log).toHaveNthReturnedWith(15, 'MOVE grains foods');
    expect(logger.log).toHaveNthReturnedWith(16, 'MOVE fruits foods');
    expect(logger.log).toHaveNthReturnedWith(17, 'MOVE vegetables foods');
    expect(logger.log).toHaveNthReturnedWith(18, 'LIST');
    expect(logger.log).toHaveNthReturnedWith(19, 'foods');
    expect(logger.log).toHaveNthReturnedWith(20, ' fruits');
    expect(logger.log).toHaveNthReturnedWith(21, '  apples');
    expect(logger.log).toHaveNthReturnedWith(22, '   fuji');
    expect(logger.log).toHaveNthReturnedWith(23, ' grains');
    expect(logger.log).toHaveNthReturnedWith(24, ' vegetables');
    expect(logger.log).toHaveNthReturnedWith(25, '  squash');
    expect(logger.log).toHaveNthReturnedWith(26, 'DELETE fruits/apples');
    expect(logger.error).toHaveNthReturnedWith(1, 'Error: subdirectory doesn\'t exist or is empty');
    expect(logger.log).toHaveNthReturnedWith(27, 'DELETE foods/fruits/apples');
    expect(logger.log).toHaveNthReturnedWith(28, 'LIST');
    expect(logger.log).toHaveNthReturnedWith(29, 'foods');
    expect(logger.log).toHaveNthReturnedWith(30, ' fruits');
    expect(logger.log).toHaveNthReturnedWith(31, ' grains');
    expect(logger.log).toHaveNthReturnedWith(32, ' vegetables');
    expect(logger.log).toHaveNthReturnedWith(33, '  squash');
  });
});

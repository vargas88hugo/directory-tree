import DirectoryTree from "./DirectoryTree";

const nestedOne = new DirectoryTree('nestedOne');
const nestedTwo = new DirectoryTree('nestedTwo');
const one = new DirectoryTree('one', [nestedOne, nestedTwo]);
const two = new DirectoryTree('two');
const root = new DirectoryTree('root', [one, two]).setRoot();

root.print();
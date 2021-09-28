# Directory Tree

## Description

Directory Tree is a program that accepts commands to execute actions like create, delete, move and list directories. It doesn't create folders on the host machine but persist the data in memory.

## Prerequisites
Basically you need to have Node.js version 10 or higher and npm on your computer

## File Directory
```
├── README.md
├── __tests__
│   └── index.spec.js
├── babel.config.json
├── jest.config.js
├── package-lock.json
├── package.json
└── src
    ├── DirectoryTree.js
    ├── FileReader.js
    ├── InstructionHandler.js
    ├── index.js
    ├── input
    └── utils
        ├── constants.js
        ├── exceptions.js
        └── logger.js

3 directories, 14 files
```

## Installation
Inside the root folder of the project execute the next command.
```bash
$ npm i
```

## Execution
Inside the root folder of the project execute the next command. It's important to use the src/input file that has the commads to execute.
```bash
$ npm run start
```

## Test
Inside the root folder of the project execute the next command.
```bash
$ npm run test
```

## Coverage
<img src="https://i.imgur.com/y3LCsPu.png" />


import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Define o diretório raiz onde o Jest começará a procurar os arquivos
  rootDir: './', 

  // Diretório onde os arquivos de teste serão buscados (por padrão, o Jest vai procurar em qualquer pasta dentro de 'src')
  testMatch: [
    '**/?(*.)+(spec|test).ts',  // Localiza arquivos com sufixo '.test.ts' ou '.spec.ts'
  ],

  // Define o ambiente do teste como Node.js
  testEnvironment: 'node',

  // Usando ts-jest para transformar arquivos TypeScript para JavaScript
  preset: 'ts-jest',

  // Configurações de transformação, aqui configuramos o ts-jest para transformar arquivos '.ts'
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  // Configurações adicionais de Jest
  collectCoverage: true,  // Ativa a coleta de cobertura de testes
  coverageDirectory: './coverage',  // Define o diretório onde os relatórios de cobertura serão armazenados

  // Padrões de busca de módulos
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  moduleNameMapper: {
    // '^@/(.*)$': '<rootDir>/src/$1', // Mapeia aliases, como "@/module" para "src/module"
    "@config/(.*)": "<rootDir>/src/config/$1",
    "@modules/(.*)": "<rootDir>/src/modules/$1",
    "@shared/(.*)": "<rootDir>/src/shared/$1",
  },
  moduleDirectories: ['node_modules', 'src'],
  
  // Pasta de arquivos que o Jest deve ignorar ao buscar por arquivos de teste
  testPathIgnorePatterns: ['/node_modules/'],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
  resetMocks: true,

  // Você pode adicionar mais opções conforme a necessidade, como configurações para mocks, caches, etc.
};

export default config;

import fs from 'fs';
import * as pathMod from 'path';
import * as yaml from 'js-yaml';

const readFile = (path) => {
  let currentDir = process.cwd() // узнать в какой папке 
  path = pathMod.resolve(currentDir, path)
  return fs.readFileSync(path, { encoding: 'utf8', flag: 'r' }) // path: String ->  type: String
}

export const parseYaml = (data) => yaml.load(data); // data: String -> type: Object

export const parseJson = (data) => JSON.stringify(data) // return -> type: Object


export const parseYamlFile = (path) => parseYaml(readFile(path)) //  path: str -> Object

export const parseJsonFile = (path) => parseJson(readFile(path)) //  -> Object


export const parseFile = (path) => {
  // path: str -> Object
  if (path.endsWith('.yaml') || path.endsWith('.yml')) {
    return parseYamlFile(path)
  }
  if (path.endsWith('.json')) {
    return parseJsonFile(path)
  }
  console.log('File is not support: ', path)
}

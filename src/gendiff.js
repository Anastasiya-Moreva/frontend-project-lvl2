import { parseFile } from './parsers.js';
import { program } from 'commander';
import { getDiff} from './core.js'


const main = (path1, path2) => {
  console.log('mainnnnn')
  const obj1 = parseFile(path1)
  const obj2 = parseFile(path2)
  const result = getDiff(obj1, obj2) 
  console.log(result)
}

program
  .description(`Compares two configuration files and shows a difference.`)
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    console.log(filepath1, filepath2, '-----')
    main(filepath1, filepath2)
  })

program.parse()


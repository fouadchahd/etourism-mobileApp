const fs = require('fs')

const imageFileNames = () => {
  const array = fs
    .readdirSync('./app/assets/countries_flags')
    .filter((file) => {
      return file.endsWith('.png')
    })
    .map((file) => {
      return file.replace('@2x.png', '').replace('@3x.png', '').replace('.png','')
    })
    
return Array.from(new Set(array))
}

const generate = () => {
    let modifiedName;
  let properties = imageFileNames()
    .map((name) => {
        for(let i in name){
           modifiedName = name.replace('-','_');
           modifiedName=name.replace(' ','');
        }
      return `${modifiedName}: require('../assets/countries_flags/${name}.png')`
    })
    .join(',\n  ')
    
const string = `const flags = {
  ${properties}
}

export default flags
`

fs.writeFileSync('./app/res/flags.js', string, 'utf8')
}

generate()
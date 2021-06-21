const fs = require('fs')

const imageFileNames = () => {
  const array = fs
    .readdirSync('./app/assets')
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
      return `${modifiedName}: require('../assets/${name}.png')`
    })
    .join(',\n  ')
    
const string = `const images = {
  ${properties}
}

export default images
`

fs.writeFileSync('./app/res/images.js', string, 'utf8')
}

generate()
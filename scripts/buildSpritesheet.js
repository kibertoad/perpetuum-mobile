const Spritesmith = require('spritesmith')
const program = require('commander')
const path = require('path')
const fs = require('fs')

program.version('1.0.0')

program
  .command('generate <sourceDir> <targetDir')
  .description('Generate spriteSheet from given files')
  .action((sourceDir, targetDir) => {
    const listOfImages = []
    fs.readdirSync(sourceDir).forEach(file => {
      listOfImages.push(path.resolve(sourceDir, file))
    })

    Spritesmith.run({ src: listOfImages }, (err, result) => {
      if (err) {
        console.error(err)
      }
      const imageFileName = 'spritesheet.png'

      // Thanks, Parcel: https://github.com/parcel-bundler/parcel/issues/501
      const jsonFileName = 'spritesheet.metadata'

      const atlas = Object.entries(result.coordinates).reduce(
        (acc, [imagePath, imageMeta]) => {
          const imageEntry = {
            frame: {
              x: imageMeta.x,
              y: imageMeta.y,
              w: imageMeta.width,
              h: imageMeta.height
            },
            rotated: false,
            trimmed: false
          }

          const imageId = path.basename(imagePath).split('.')[0]
          acc.frames[imageId] = imageEntry
          return acc
        },
        {
          frames: {},
          meta: {
            size: {
              w: result.properties.width,
              h: result.properties.height
            },
            image: imageFileName
          }
        }
      )

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir)
      }

      fs.writeFileSync(path.resolve(targetDir, imageFileName), result.image)
      fs.writeFileSync(path.resolve(targetDir, jsonFileName), JSON.stringify(atlas))

      //result.coordinates; // Object mapping filename to {x, y, width, height} of image
      //result.properties; // Object with metadata about spritesheet {width, height}
      process.exit()
    })
  })

program.parse(process.argv)

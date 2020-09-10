const maybeAddPrefix = (prefix, path) => {
  if (prefix !== null) {
    return `${prefix}.${path}`
  }
  return path
}

const generatePaths = ({ paths, pathPrefix = null, mongoose }) => {
  return Object.keys(paths).reduce((validPaths, currentPath) => {
    if (
      paths[currentPath] instanceof mongoose.Schema.Types.DocumentArray ||
      paths[currentPath] instanceof mongoose.Schema.Types.Embedded
    ) {
      return [
        ...validPaths,
        ...generatePaths({
          paths: paths[currentPath].schema.paths,
          pathPrefix: maybeAddPrefix(pathPrefix, currentPath),
          mongoose,
        }),
      ]
    } else if (paths[currentPath] instanceof mongoose.Schema.Types.Mixed) {
      /*
       * To get a mixed object properties, we MAY add `currentKeys` to
       * the mongoose mixed object definition, for example:
       *
       * new mongoose.Schema({
       *  custom: {
       *    type: mongoose.Schema.Types.Mixed,
       *    currentKeys: ['foo', 'bar']
       *  }
       * })
       *
       * Now, we should get 'custom.foo' and 'custom.bar'
       *
       */
      if (!paths[currentPath].options.currentKeys) {
        return [...validPaths]
      }
      return [
        ...validPaths,
        ...paths[currentPath].options.currentKeys.map(
          key => `${maybeAddPrefix(pathPrefix, currentPath)}.${key}`,
        ),
      ]
    } else {
      return [...validPaths, maybeAddPrefix(pathPrefix, currentPath)]
    }
  }, [])
}

export default generatePaths

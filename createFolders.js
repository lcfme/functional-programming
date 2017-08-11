const fs = require('fs')
const path = require('path')

const maketree = (dirname) => {
  const _f = (self) => {
    return (dirname) => {
      var _n = {}
      _n._filelist = []
      try {
        var fileList = fs.readdirSync(dirname)
      } catch (e) {
        return {}
      }
      fileList.forEach((file) => {
        if (fs.statSync(path.resolve(dirname, file)).isDirectory()) {
          _n[file] = self(self)(path.resolve(dirname, file))
        } else {
          _n._filelist.push(file)
        }
      })
      return _n
    }
  }
  return _f(_f)(dirname)
}

const createFolder = (dir, callback) => {
  const _f = (self) => {
    return (dir) => {
      return (callback) => {
        fs.stat(dir, (err, info) => {
          if (err) {
            self(self)(path.dirname(dir))(() => {
              fs.mkdir(dir, () => {
                callback && callback(info)
              })
            })
          } else {
            callback && callback(info)
          }
        })
      }
    }
  }
  _f(_f)(dir)(callback)
}

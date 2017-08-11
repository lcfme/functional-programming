const path = require('path')
const fs = require('fs')
module.exports.createFolder = (dir, callback) => {
  const _f = (self) => {
    return (dir) => {
      return (callback) => {
        fs.stat(dir, (err, info) => {
          if (err) {
            self(self)(path.dirname(dir))(()=>{
              fs.mkdir(dir, ()=> {
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

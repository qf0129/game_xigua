import { res_list } from '../res_list'

export default class ResLoader {
  static load(callback) {
    let obj = null
    for (let [name, path] of res_list) {
      if (path.split('.')[1] == 'png' || path.split('.')[1] == 'jpg') {
        obj = wx.createImage()
        obj.src = path

        if (obj.complete) {
          db.res[name] = obj
        } else {
          obj.onload = function () {
            db.res[name] = obj
          }
        }

      } else {
        obj = wx.createInnerAudioContext()
        obj.path = path
        obj.onLoad
        db.res[name] = obj
      }
    }



  }
}
import './lib/weapp-adapter'

var Matter = require('lib/matter.min.js')
GameGlobal.Matter = Matter

import Database from 'src/database'
GameGlobal.db = new Database().reset()

import Main from './src/main'

var obj = wx.createInnerAudioContext()
obj.path = 'res/audio1.mp3'
obj.autoplay = true
obj.onCanplay(()=>{
  console.log(obj)
})
obj.play()

new Main().run()

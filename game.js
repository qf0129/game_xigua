import './lib/weapp-adapter'

GameGlobal.log = function(obj){console.log(obj)}

GameGlobal.Matter = require('lib/matter.js')

import Database from 'src/database'
GameGlobal.db = new Database().reset()

import Main from './src/main'

// var obj = wx.createInnerAudioContext()
// obj.path = 'res/audio1.mp3'
// obj.autoplay = true
// obj.onCanplay(()=>{
//   console.log(obj)
// })
// obj.play()

new Main().run()

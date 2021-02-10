import './lib/weapp-adapter'

GameGlobal.log = function(...obj){console.log('##',...obj)}


GameGlobal.Matter = require('lib/matter/module/main.js')

import Database from 'src/database'
GameGlobal.db = new Database().reset()

import Main from './src/main'
new Main().run()

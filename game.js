import './lib/weapp-adapter'

var Matter = require('lib/matter.min.js')
GameGlobal.Matter = Matter

import Database from 'src/database'
GameGlobal.db = new Database().reset()

import Main from './src/main'
new Main().run()

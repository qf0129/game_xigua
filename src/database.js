import Score from 'base/score'

export default class Database {
  constructor() {
    this.reset()
  }

  reset() {
    this.res = {}
    this.world = null
    this.render = null
    this.engine = null
    this.context = null
    this.cur_item = null
    this.isGameOver = false
    this.score = 0
    this.add_score = Score.add
    return this
  }
}
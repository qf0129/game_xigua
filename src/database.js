export default class Database {
  constructor() {
    this.reset()
  }

  reset() {
    this.res = {}
    this.world = null
    this.engine = null
    this.cur_item = null
    this.isGameOver = false
    this.score = 0
    return this
  }
}
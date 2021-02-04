export default class Database {
  constructor() {
    this.reset()
  }

  reset() {
    this.default_x = canvas.width / 2
    this.default_y = 100
    this.cur_item = null
    this.world = null
    this.engine = null
    this.isGameOver = false
    this.score = 0
    return this
  }
}
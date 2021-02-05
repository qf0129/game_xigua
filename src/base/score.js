export default class Store {
  static x = 100
  static y = 30

  static init() {
    db.context.font = '25px Arial'
    db.context.fillStyle = '#52ff0a'
    db.context.fillText(`分数 0`, this.x, this.y)
  }
  static add(number) {
    db.score += number
    db.context.fillText(`分数 ${db.score}`, this.x, this.y)
  }
}
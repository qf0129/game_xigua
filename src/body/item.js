export default class Item {
  static radius = 10
  static default_x = canvas.width / 2
  static default_y = 100

  static create(options) {
    if (!options) options = {}
    var x = options.x || this.default_x
    var y = options.y || this.default_y
    var level = options.level || Matter.Common.choose([1, 2, 3, 4, 5, 6])
    var isStatic = typeof options.isStatic !== 'undefined' ? options.isStatic : true
    var isCurrent = typeof options.isCurrent !== 'undefined' ? options.isCurrent : true

    let item = this.create_circle(x, y, level)
    Matter.World.add(db.world, item)
    if (isStatic) Matter.Body.setStatic(item, true)
    if (isCurrent) db.cur_item = item
    return this
  }

  static git_middle_pos(pos1, pos2) {
    return {
      x: (pos1.x + pos2.x) / 2,
      y: (pos1.y + pos2.y) / 2
    }
  }

  static create_circle(x, y, level) {
    var radius = this.radius * level;
    return Matter.Bodies.circle(x, y, radius, {
      level: level,
      frictionAir: 0.06,
      friction: 0.01,
      mass: 0,
    });
  }

}
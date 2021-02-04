export default class Item {

  static default_radius = 10

  static get(x = db.default_x, y = db.default_y, level = null) {
    if (level == null) {
      level = Matter.Common.choose([1, 2, 3, 4, 5, 6])
    }
    return this.create_circle(x, y, level)
  }

  static git_middle_pos(pos1, pos2) {
    return {
      x: (pos1.x + pos2.x) / 2,
      y: (pos1.y + pos2.y) / 2
    }
  }

  static create_circle(x, y, level) {
    var radius = this.default_radius * level;
    return Matter.Bodies.circle(x, y, radius, {
      level: level,
      isStatic: true,
      frictionAir: 0.06,
      friction: 0.01,
      mass: 0,
    });
  }

}
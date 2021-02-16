export default class Item {
  static radius = 10
  static default_x = canvas.width / 2
  static default_y = 100

  static create(options) {
    if (!options) options = {}
    var x = options.x || this.default_x
    var y = options.y || this.default_y
    var level = options.level || Matter.Common.choose([1,2,3])
    var isStatic = typeof options.isStatic !== 'undefined' ? options.isStatic : true
    var isCurrent = typeof options.isCurrent !== 'undefined' ? options.isCurrent : true

    let item = this.create_img_circle(x, y, level)
    // let item = this.create_circle(x, y, level)
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
  static create_img_circle(x, y, level) {
    if (level > 10) level = 10
    let img = db.img.get('item'+ level)
    let radius = img.width/2;
    return Matter.Bodies.circle(x, y, radius, {
      level: level,
      // frictionAir: 0.9,
      restitution: 0.001,
      friction: 0.5,
      frictionStatic: 9,
      density: 0.1,
      render: {
        visible: true,
        sprite: {
          texture: 'img/item'+level+'.png'
        }
      }
    });

  }

  static create_circle(x, y, level) {
    var radius = this.radius * level * 1.3;
    return Matter.Bodies.circle(x, y, radius, {
      level: level,
      friction: 0.01,
      frictionAir: 0.01,
      frictionStatic: 0.1,
      density: 0.01,
      restitution: 0.001
    });
  }

}
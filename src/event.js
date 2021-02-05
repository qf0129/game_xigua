import Item from 'body/item'
import Border from 'body/border'

export default class Event {
  constructor() {
    this.new_x = 0
    this.playedBoom = false
  }
  register_item_event() {
    canvas.addEventListener('touchstart', e => {
      this._handle_event('touchstart', e)
    })
    canvas.addEventListener('touchmove', e => {
      this._handle_event('touchmove', e)
    })
    canvas.addEventListener('touchend', e => {
      this.playedBoom = false
      this._handle_event('touchend', e)
    })
  }
  register_collision_event() {
    Matter.Events.on(db.engine, 'collisionStart', function (event) {
      var pairs_list = event.pairs
      var canMerge = true
      for (let pairs of pairs_list) {
        let body_a = pairs.bodyA
        let body_b = pairs.bodyB
        if (body_a.label == body_b.label && body_a.level == body_b.level) {
          if (canMerge) {
            db.music.playBoom()
            canMerge = false
            let { x, y } = Item.git_middle_pos(body_a.position, body_a.position)
            Matter.World.remove(db.world, body_a)
            Matter.World.remove(db.world, body_b)
            Item.create({
              x: x,
              y: y,
              level: body_a.level + 1,
              isStatic: false,
              isCurrent: false
            })
            db.add_score(body_a.level)
          }
        }
      }
    });
  }
  _handle_event(e_name, e) {
    if (!db.isGameOver) {
      switch (e_name) {
        case 'touchstart':
          break;
        case 'touchmove':
          if (!db.cur_item) {
            return
          }
          this.new_x = e.touches[0].clientX
          if (this.new_x < db.cur_item.circleRadius + Border.size) {
            return
          }
          if (this.new_x > canvas.width - db.cur_item.circleRadius - Border.size) {
            return
          }
          Matter.Body.setPosition(db.cur_item, {
            x: this.new_x,
            y: Item.default_y
          })
          break;
        case 'touchend':
          if (!db.cur_item) {
            return
          }
          Matter.Body.setStatic(db.cur_item, false)
          db.cur_item = null
          setTimeout(function () {
            Item.create()
          }, 800)
          break;
        default:
          break;
      }
    }
  }
}
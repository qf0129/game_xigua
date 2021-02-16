import Item from 'body/item'
import Score from 'base/score'
import End from 'base/end'

export default class Event {
  static new_x = 0
  static gameover_y = 500
  static playedBoom = false
  // static first_collision = false

  static remove_all_event() {
    canvas.removeEventListener('touchstart', this._handle_event)
    canvas.removeEventListener('touchmove', this._handle_event)
    canvas.removeEventListener('touchend', this._handle_event)
  }
    static register_item_event() {
      canvas.addEventListener('touchstart', this._handle_event)
      canvas.addEventListener('touchmove', this._handle_event)
      canvas.addEventListener('touchend', this._handle_event)
  }
  static register_render_event() {
    Matter.Events.on(db.render, 'beforeRender', e => {
      db.render.context.drawImage(db.img.get('bg'), 0, 0, canvas.width, canvas.height)
      db.context.fillStyle = "#f33"
      db.context.fillRect(canvas.width - 20, this.gameover_y, 20, 2)
    });
    Matter.Events.on(db.render, 'afterRender', e => {
      Score.show()
    });
  }
  static register_collision_event() {
    Matter.Events.on(db.engine, 'collisionStart', event => {
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
  static _check_gameover() {
    if (db.cur_item.position.y < this.gameover_y) {
      log('game over')
      End.show()
    }
  }

  static _make_static() {
    log(Matter.Composite.allBodies(db.world))
    Matter.Composite.allBodies(db.world).forEach(body => {
      if (!body.isStatic) {
        Matter.Body.setStatic(body, true)
      }
    });
  }

  static _handle_event(e) {
    if (!db.isGameOver) {
      if (e.type == 'touchstart' || e.type == 'touchmove') {
        if (!db.cur_item) {
          return
        }
        this.new_x = e.touches[0].clientX
        if (this.new_x < db.cur_item.circleRadius) {
          this.new_x = db.cur_item.circleRadius
        }
        if (this.new_x > canvas.width - db.cur_item.circleRadius) {
          this.new_x = canvas.width - db.cur_item.circleRadius
        }
        Matter.Body.setPosition(db.cur_item, {
          x: this.new_x,
          y: Item.default_y
        })
      }
      if (e.type == 'touchend') {
        if (!db.cur_item) {
          return
        }
        Matter.Body.setStatic(db.cur_item, false)
        setTimeout(function () {
          Event._check_gameover()
          db.cur_item = null
          Item.create()
        }, 1000)
      }
    }
  }
}
import Item from 'body/item'
import Score from 'base/score'
import End from 'base/end'

export default class Event {
  static new_x = 0
  static gameover_y = 180
  // static gameover_y = canvas.height-100
  static playedBoom = false
  static press_item = false

  static register_item_event() {
    Matter.Events.on(db.mouseConstraint, 'mousedown', this._handle_event)
    Matter.Events.on(db.mouseConstraint, 'mousemove', this._handle_event)
    Matter.Events.on(db.mouseConstraint, 'mouseup', this._handle_event)
    Matter.Events.on(db.render, 'restart', e => {
      End.hide()
    })
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
      let merged = false
      for (let pairs of pairs_list) {
        let body_a = pairs.bodyA
        let body_b = pairs.bodyB
        if (body_a.label == body_b.label && body_a.level == body_b.level) {
          if (canMerge) {
            db.music.playBoom()
            merged = true
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
            db.add_score(body_a.level*2)
          }
        }
      }
      if(!merged&&!db.played_merge){
        db.music.playMerge()
        db.played_merge = true
      }
    });
  }
  static _check_gameover(item) {
    if (!db.isGameOver && item.position.y < this.gameover_y) {
      db.isGameOver = true
      End.show()
      log('game over')
    }
  }

  static _make_static() {
    Matter.Composite.allBodies(db.world).forEach(body => {
      if (!body.isStatic) {
        Matter.Body.setStatic(body, true)
      }
    });
  }

  static _handle_event(e) {
    if (!db.isGameOver) {
      if (e.name == 'mousedown' || e.name == 'mousemove') {
        if (!db.cur_item) {
          return
        }
        this.press_item = true
        this.new_x = e.mouse.absolute.x
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
      if (e.name == 'mouseup') {
        if (!db.cur_item || !this.press_item) {
          return
        }
        const _item = db.cur_item
        db.played_merge = false
        Matter.Body.setStatic(db.cur_item, false)
        db.cur_item = null
        this.press_item = false
        setTimeout(function () {
          Event._check_gameover(_item)
          Item.create()
        }, 1500)
      }
    } else {
      if (e.name == 'mousedown') {
        for (let i = 0; i < Matter.Composite.allBodies(db.world).length; i++) {
          const body = Matter.Composite.allBodies(db.world)[i];
          if (Matter.Bounds.contains(body.bounds, e.mouse.position)) {
            if (body.event_name) {
              Matter.Events.trigger(db.render, body.event_name, e)
            }
          }
        }
      }
    }
  }
}
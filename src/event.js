import Item from 'body/item'

export default class Event {
  constructor() {}
  register_item_event() {
    canvas.addEventListener('touchstart', e => {
      this._handle_event('touchstart', e)
    })
    canvas.addEventListener('touchmove', e => {
      this._handle_event('touchmove', e)
    })
    canvas.addEventListener('touchend', e => {
      this._handle_event('touchend', e)
    })
  }
  register_collision_event() {
    Matter.Events.on(db.engine, 'collisionStart', function (event) {
      console.log(event)
      var pairs_list = event.source.pairs.list;
      for(let pairs of pairs_list){
        let body_a = pairs.bodyA
        let body_b = pairs.bodyB
        if (body_a.label == body_b.label && body_a.level == body_b.level){
          console.log('remove')
          Matter.World.remove(db.world, body_a)
          Matter.World.remove(db.world, body_b)
          let {x, y} = Item.git_middle_pos(body_a.position, body_a.position)
          Matter.World.add(db.world, Item.get(body_a.position.x, body_a.position.y, body_a.level+1));
          db.score += body_a.level
          console.log('Score :',db.score)
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
          Matter.Body.setPosition(db.cur_item, {
            x: e.touches[0].clientX,
            y: db.default_y
          })
          break;
        case 'touchend':
          if (!db.cur_item) {
            return
          }
          Matter.Body.setStatic(db.cur_item, false)
          db.cur_item = null
          setTimeout(function () {
            db.cur_item = Item.get()
            Matter.World.add(db.world, db.cur_item);
          }, 800)
          break;
        default:
          break;
      }
    }
  }
}
import Item from 'body/item'
import Border from 'body/border'
import Event from 'event'
import ImgLoader from 'base/img_loader'
import Music from 'base/music'


export default class Main {

  run() {
    new ImgLoader().onload((res_map)=>{
      db.img = res_map
      db.music = new Music()
      this._init_engine()
      this._init_bodies()
      this._init_event()
    })
  }

  _init_bodies() {
    Border.create()
    Item.create()
  }

  _init_event() {
    Event.register_item_event()
    Event.register_collision_event()
    Event.register_render_event()
  }

  _init_engine() {
    let engine = Matter.Engine.create()
    db.engine = engine
    db.world = engine.world
    db.world.gravity.y = 4
    
    let render = Matter.Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        height: canvas.height,
        width: canvas.width,
        wireframes: false,
        background: '#fff',
        showSleeping: false,
      }
    });
    db.render = render
    db.context = render.context

    Matter.Engine.run(engine);
    Matter.Render.run(render);

    Matter.Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: canvas.width, y: canvas.height }
    })
  }
}
import Item from 'body/item'
import Border from 'body/border'
import Event from 'event'


export default class Main {
  constructor() {}

  run() {
    this._init_engine()
    this._init_bodies()
    this._init_event()
  }
  
  _init_bodies(){
    Border.create()
    Item.create()
  }
  
  _init_event(){
    let event = new Event()
    event.register_item_event()
    event.register_collision_event()
  }

  _init_engine(){
    let engine = Matter.Engine.create()
    db.engine = engine
    db.world = engine.world
    db.world.gravity.y = 2
    let render = Matter.Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        height: canvas.height,
        width: canvas.width,
        wireframes: false,
        showAngleIndicator: false,
        background: '#666',
      }
    });
    Matter.Render.run(render);
    Matter.Runner.run(Matter.Runner.create(), engine);
    Matter.Engine.run(engine);
  }
  
}
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
    Matter.World.add(db.world, new Border().get_borders());
    db.cur_item = Item.get()
    Matter.World.add(db.world, db.cur_item);
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
    let render = Matter.Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        height: canvas.height,
        width: canvas.width,
        wireframes: true,
        showAngleIndicator: false,
        background: '#666',
      }
    });
    Matter.Render.run(render);
    Matter.Runner.run(Matter.Runner.create(), engine);
    Matter.Engine.run(engine);
  }
  
}
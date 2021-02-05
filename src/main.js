import Item from 'body/item'
import Border from 'body/border'
import ScoreBar from 'body/score_bar'
import Event from 'event'
import ImgLoader from 'base/img_loader'
import Score from 'base/score'
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
    ScoreBar.init()
  }

  _init_event() {
    let event = new Event()
    event.register_item_event()
    event.register_collision_event()
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
        showAngleIndicator: false,
        background: 'res/bg.png',
      }
    });
    Matter.Render.run(render);
    Matter.Runner.run(Matter.Runner.create(), engine);
    // Matter.Engine.run(engine);
    db.context = render.context

    log(render)
    log(render.context)
    
    render.context.font = "48px serif";
    render.context.textBaseline = "hanging";
    render.context.strokeText("Hello world", 100, 300);
    render.context.fillText(`XXX`, 100, 200)
    
  }

}
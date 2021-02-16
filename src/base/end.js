import Item from '../body/item'
import Btn from '../body/btn'

export default class End {
  static panel_w = 200
  static panel_h = 200
  static line_h = 25
  static panel_x = canvas.width / 2 - 200 / 2
  static panel_y = canvas.height / 2 - 200 / 2


  static hide() {
    db.reset()
    // Matter.Composite.allBodies(db.world).forEach(body => {
    //   if (body.is_item) {
    //     Matter.World.remove(db.world, body)
    //   }
    // });
    Matter.World.clear(db.world, true)
    Matter.World.remove(db.world, db.shadow_btn)
    Matter.World.remove(db.world, db.restart_btn)
    Matter.World.remove(db.world, db.score_btn)
    Item.create()
  }
  static show() {
    db.shadow_btn = Btn.create_shadow_btn() 
    db.score_btn = Btn.create_score_btn()
    db.restart_btn = Btn.create_restart_btn()
    Matter.World.add(db.world, db.shadow_btn)
    Matter.World.add(db.world, db.score_btn)
    Matter.World.add(db.world, db.restart_btn)
    // Matter.Events.on(db.render, 'afterRender', e => {
    //   db.context.font = "25px Arial";
    //   db.context.fillStyle = "#33333399"
    //   db.context.fillRect(this.panel_x, this.panel_y, this.panel_w, this.panel_h)
    //   db.context.fillStyle = "#999"
    //   db.context.fillRect(this.panel_x + this.panel_w /8, this.panel_y + this.line_h * 5, this.panel_w*0.75, this.line_h * 2)
    //   db.context.fillStyle = '#fff';
    //   db.context.fillText('游戏结束', this.panel_x + this.panel_w /4, this.panel_y + this.line_h);
    //   db.context.fillText('得分:'+db.score, this.panel_x + this.panel_w /4, this.panel_y + this.line_h * 3);
    //   db.context.fillText('重新开始', this.panel_x + this.panel_w /4, this.panel_y + this.line_h * 5.5);
    // });
  }
}
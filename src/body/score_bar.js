import Border from 'border'

export default class ScoreBar {
  static w = 80
  static h = 24

  static init() {
    let score_bar = Matter.Bodies.rectangle(Border.size + this.w/2, Border.size + this.h/2, this.w, this.h,  {
      isStatic:true,
      render: {
        visible: true,
        text: {
          content: '分数：0',
          color: "#eee",
          size: 16,
          family: "Arial",
        }
      }
    })
    Matter.World.add(db.world, score_bar)

    
    db.context.textBaseline = "middle";
    db.context.textAlign = "center";
    db.context.fillStyle = 'yellow';
    db.context.font = '14px Arial';                    
    db.context.fillText('1234', Border.size + this.w/2, Border.size + this.h/2, 100);


  }

  static add(score) {
    db.score += score
  }

}
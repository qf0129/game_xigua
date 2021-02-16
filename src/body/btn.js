
export default class Btn {

  static create_restart_btn() {
    return this.create_text_btn(canvas.width/2, canvas.height*0.75, 150, 75, 'restart', '重新开始') 
  }
  static create_score_btn() {
    return Matter.Bodies.rectangle(canvas.width/2, canvas.height/2, canvas.width, 50, {
      event_name: 'score',
      isStatic: true,
      isSensor: true,
      render: {
        fillStyle: 'transparent',
        text: {
          content: '得分：' + db.score,
          color: "#fff",
          size: 40,
        },
      }
    })
  }
  static create_shadow_btn() {
    return Matter.Bodies.rectangle(canvas.width/2, canvas.height/2, canvas.width, canvas.height, {
      event_name: 'shadow',
      isStatic: true,
      isSensor: true,
      render: {
        fillStyle: '#000',
        opacity: 0.8
      }
    })
  }

  static create_text_btn(x, y, w, h, event_name, text) {
    const btn = Matter.Bodies.rectangle(x, y, w, h, {
      event_name: event_name,
      isStatic: true,
      isSensor:true,
      render: {
        fillStyle: '#333',
        text: {
          content: text,
          color: "#fff",
          size: 25,
        },
      }
    })
    db.btns.push(btn)
    return btn
  }

}
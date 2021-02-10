import Border from '../body/border'

export default class Score {
  
  static show(){
    db.context.font = "22px Arial";
    db.context.textBaseline = "hanging";
    db.context.fillStyle = '#eee';
    db.context.fillText("分数：" + db.score, Border.size + 10, Border.size + 50);
  }

  static add(score) {
    db.score += score
  }
}
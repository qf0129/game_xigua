import Border from '../body/border'

export default class Score {
  
  static show(){
    db.context.font = "25px Arial";
    db.context.textBaseline = "hanging";
    db.context.fillStyle = '#222';
    const score_x = db.score > 999 ? 50 : 25
    db.context.fillText(db.score, score_x, 50);
  }

  static add(score) {
    db.score += score
  }
}
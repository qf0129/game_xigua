import Border from '../body/border'

export default class Score {
  
  static show(){
    db.context.font = "22px Arial";
    db.context.textBaseline = "hanging";
    db.context.fillStyle = '#222';
    db.context.fillText(db.score, 10, 50);
  }

  static add(score) {
    db.score += score
  }
}
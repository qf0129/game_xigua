import Border from '../body/border'

export default class Score {
  
  static show(){
    db.context.font = "25px Arial";
    db.context.textBaseline = "hanging";
    db.context.fillStyle = '#222';
    db.context.fillText(db.score, 20, 50);
  }

  static add(score) {
    db.score += score
  }
}
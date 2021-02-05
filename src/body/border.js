
export default class Border {
  static size = 30
  static w = canvas.width
  static h = canvas.height

  static create(){
    Matter.World.add(db.world, [
        this._create_border(this.w/2, this.size/2, this.w, this.size),
        this._create_border(this.w/2, this.h-this.size/2, this.w, this.size),
        this._create_border(this.size/2, this.h/2, this.size, this.h),
        this._create_border(this.w-this.size/2, this.h/2, this.size, this.h),
      ]);
  }

  static _create_border(x, y, width, height) {
    return Matter.Bodies.rectangle(x, y, width, height,  {
      isStatic:true
    });
  }
}

export default class Border {
  constructor() {
    this.size = 2
    this.w = canvas.width
    this.h = canvas.height
  }

  get_borders() {
    return [
      this._create_border(this.w/2, this.size/2, this.w, this.size),
      this._create_border(this.w/2, this.h-this.size/2, this.w, this.size),
      this._create_border(this.size/2, this.h/2, this.size, this.h),
      this._create_border(this.w-this.size/2, this.h/2, this.size, this.h),
    ]
  }

  _create_border(x, y, width, height) {
    return Matter.Bodies.rectangle(x, y, width, height,  {
      isStatic:true
    });
  }
}
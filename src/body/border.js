
export default class Border {
  static size = 50
  static w = canvas.width
  static h = canvas.height

  static create(){
    const ground = db.img.get('ground')
    Matter.World.add(db.world, [
        this._create_border(this.w/2, -this.size/2, this.w, this.size),  // top
        // this._create_border(this.w/2, this.h-this.size/2, this.w, this.size),  // bottom
        this._create_border(-this.size/2, this.h/2, this.size, this.h),  // left
        this._create_border(this.w+this.size/2, this.h/2, this.size, this.h),  // right
        Matter.Bodies.rectangle(this.w/2, this.h-ground.height/2, this.w, ground.height, {
          isStatic:true,
          render: {
            visible: true,
            sprite: {
              texture: ground.src
            }
          }
        }),
      ]);
  }

  static _create_border(x, y, width, height) {
    return Matter.Bodies.rectangle(x, y, width, height,  {
      isStatic:true,
      render: {
        // fillStyle:'transparent'
        fillStyle:'#000'
      }
    });
  }
}
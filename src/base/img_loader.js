export default class ImgLoader {
  constructor() {
    this.imageCount = 0

    this.map = new Map([
      ['bg', 'img/bg.png'],
      ['ground', 'img/ground.png'],
      ['ball', 'img/ball.png'],
      ['item1', 'img/item1.png'],
      ['item2', 'img/item2.png'],
      ['item3', 'img/item3.png'],
      ['item4', 'img/item4.png'],
      ['item5', 'img/item5.png'],
      ['item6', 'img/item6.png'],
      ['item7', 'img/item7.png'],
      ['item8', 'img/item8.png'],
      ['item9', 'img/item9.png'],
      ['item10', 'img/item10.png'],
    ])
    let res = null
    for (let [name, src] of this.map) {
      res = wx.createImage()
      res.src = src
      this.map.set(name, res)
    }
  }

  onload(callback) {
    let loadCount = 0
    for (let res of this.map.values()) {
      res.onload = () => {
        loadCount++
        if (loadCount >= this.map.size) {
          callback(this.map)
        }
      }
    }
  }

}

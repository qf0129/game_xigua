let instance

export default class Music {
  constructor() {
    if (instance) return instance
    instance = this

    // this.bgmAudio = new Audio()
    // this.bgmAudio.loop = true
    // this.bgmAudio.src = 'audio/bgm.mp3'

    this.boomAudio = new Audio()
    this.boomAudio.src = 'audio/boom.mp3'

    // this.playBgm()
  }

  // playBgm() {
  //   this.bgmAudio.play()
  // }


  playBoom() {
    this.boomAudio.currentTime = 0
    this.boomAudio.play()
  }
}

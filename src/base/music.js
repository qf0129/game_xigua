let instance

export default class Music {
  constructor() {
    if (instance) return instance
    instance = this
    // this.bgmAudio = new Audio()
    // this.bgmAudio.loop = true
    // this.bgmAudio.src = 'audio/bgm.mp3'
    this.boomAudio = new Audio()
    this.boomAudio.src = 'audio/audio6.mp3'
    this.mergeAudio = new Audio()
    this.mergeAudio.src = 'audio/audio7.mp3'
  }

  playMerge() {
    this.mergeAudio.currentTime = 0
    this.mergeAudio.play()
  }
  playBoom() {
    this.boomAudio.currentTime = 0
    this.boomAudio.play()
  }
}

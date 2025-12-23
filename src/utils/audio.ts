class AudioManager {
  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  getAudio() {
    return this.audio;
  }

  play() {
    return this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  setSrc(src: string) {
    this.audio.src = src;
  }

  setVolume(volume: number) {
    this.audio.volume = volume;
  }

  addEventListener(event: string, callback: EventListener) {
    this.audio.addEventListener(event, callback);
  }

  removeEventListener(event: string, callback: EventListener) {
    this.audio.removeEventListener(event, callback);
  }
}

export const audioManager = new AudioManager();

import store from "@/store";
import { setCurrent } from "@/store/music";

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

  setLoop(loop: boolean) {
    this.audio.loop = loop;
  }

  addEventListener(event: string, callback: EventListener) {
    this.audio.addEventListener(event, callback);
  }

  removeEventListener(event: string, callback: EventListener) {
    this.audio.removeEventListener(event, callback);
  }

  async next(direct: number) {
    const state = store.getState();
    const currentTrack = state.music.current;
    const localMusic = state.music.local;
    const defaultPosition = direct === 1 ? 0 : localMusic.length - 1;

    for (let index = 0; index < localMusic.length; index++) {
      const item = localMusic[index];
      if (item.id === currentTrack.id) {
        const next = localMusic[index + direct] || localMusic[defaultPosition];
        const url = next.url || URL.createObjectURL(await next.method!());
        store.dispatch(setCurrent({ ...next, url, isPlaying: true }));
        return;
      }
    }
  }
}

export const audioManager = new AudioManager();

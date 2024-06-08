import { Howl } from 'howler';

class SoundManager {
    constructor() {
        this.sounds = {
            move: new Howl({ src: ['./assets/move.mp3'] }),
            win: new Howl({ src: ['./assets/win.mp3'] }),
            error: new Howl({ src: ['./assets/error.mp3'] })
        };
    }

    play(sound) {
        if (this.sounds[sound]) {
            this.sounds[sound].play();
        }
    }
}

export default SoundManager;

cc.Class({
    extends: cc.Component,

    properties: {
        gameoverAudio: {
            default: null,
            url: cc.AudioClip
        },

        popStarAudio: {
            default: null,
            url: cc.AudioClip
        },

        selectAudio: {
            default: null,
            url: cc.AudioClip
        },

        buttonAudio: {
            default: null,
            url: cc.AudioClip
        },

        cheersAudio: {
            default: null,
            url: cc.AudioClip
        },

        applauseAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    playMusic: function() {
        // cc.audioEngine.playMusic( this.bgm, true );
    },

    pauseMusic: function() {
        cc.audioEngine.pauseMusic();
    },

    resumeMusic: function() {
        cc.audioEngine.resumeMusic();
    },

    _playSFX: function(clip) {
        cc.audioEngine.playEffect( clip, false );
    },

    play_1: function() {
        this._playSFX(this.gameoverAudio);
    },

    play_2: function() {
        this._playSFX(this.popStarAudio);
    },

    play_3: function() {
        this._playSFX(this.selectAudio);
    },

    play_4: function() {
        this._playSFX(this.cheersAudio);
    },
    play_5: function() {
        this._playSFX(this.applauseAudio);
    },

    playButton: function() {
        this._playSFX(this.buttonAudio);
    }
});

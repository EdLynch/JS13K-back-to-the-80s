let musicPlaying = false
function playMusic(){
    musicPlaying = true
    try{
        var t0 = new Date()
        var sPlayer = new CPlayer()
        sPlayer.init(song)
        
        // Generate music...
        var done = false
        var playPromise

        const tryStartSong = setInterval(function () {
            if (done) {
                return
            }
            done = sPlayer && sPlayer.generate() >= 1;
        
            if (done) {
                // Put the generated song in an Audio element.
                var wave = sPlayer.createWave()
                var audio = document.createElement("audio")
                audio.addEventListener('ended', function() {
                    this.currentTime = 0

                    playPromise = this.play()
                
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            // Automatic playback started!
                            // Show playing UI.
                        })
                        .catch(error => {
                        });
                    }
                }, false);
                audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}))
                playPromise = audio.play();
                if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Automatic playback started!
                    // Show playing UI.
                })
                .catch(error => {
                });
                }
            }
        }, 0);
    }catch(e){
    }
}

const sounds = {
    bonus: bonusSound,
    music: song,
}

function playSound(sound, loop){
    if(sound === 'music'){
        musicPlaying = true
    }

    try{
        var t0 = new Date()
        var sPlayer = new CPlayer()
        sPlayer.init(sounds[sound])
        
        // Generate music...
        var done = false
        var playPromise

        setInterval(function () {
            if (done) {
                return
            }
            done = sPlayer && sPlayer.generate() >= 1;
        
            if (done) {
                // Put the generated song in an Audio element.
                var wave = sPlayer.createWave()
                var audio = document.createElement("audio")
                if(loop){
                    audio.addEventListener('ended', function() {
                        this.currentTime = 0
    
                        playPromise = this.play()
                    
                        if (playPromise !== undefined) {
                            playPromise.then(_ => {
                                // Automatic playback started!
                                // Show playing UI.
                            })
                            .catch(error => {
                            });
                        }
                    }, false);
                }
                audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}))
                playPromise = audio.play();
                if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Automatic playback started!
                    // Show playing UI.
                })
                .catch(error => {
                });
                }
            }
        }, 0);
    }catch(e){
    }
}
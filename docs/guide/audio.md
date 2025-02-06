# Audio Plugin
Built on the native Web Audio API that lets you manage audio channels, route sound, and play both recorded audio and synthesized notes.

## Quick Start

``` js
plugin.load("audio", { path: "core" });
```
then

``` js
// preload audio file, create a music channel and play loop
assets.preload([{ name: "song", path: "assets/music/song.mp3" }], () => {
    audio.createChannel('music', 0.7);
    audio.playAudio('song', assets.use('song'), 'music', true);
});
```

## Core Features
### Channel Management
Create and manage audio channels to organize your sound output:

``` js
audio.createChannel('synth', 0.7);
audio.routeChannel('synth', 'master');
audio.removeChannel('synth');
```

### Playing Audio
#### Synthesized Notes

``` json
// instrument.json
{
    "bpm": 120,
    "ticks_per_beat": 4,
    "instruments": {
        "lead": {
            "oscillator": "sine",
            "envelope": {
                "attack_time": 0.1,
                "attack_gain": 1,
                "decay_time": 0.2,
                "sustain_gain": 0.7,
                "release_time": 0.3
            },
            "filter": {
                "frequency": 2000,
                "resonance": 1
            }
        }
    },
    "patterns": [
        {
            "instrument": "lead",
            "notes": ["C4", "E4", "G4", "B4"],
            "timing": [0, 4, 8, 12]
        }
    ],
    "tempos": {
        "0": 120,
        "16": 140
    }
}
```

``` js
assets.preload([{ name: "inst", path: "assets/instrument.json" }], () => {
    audio.play(assets.use('inst'), 'synth');
})
```

#### Audio Files

``` js
audio.playAudio('bg-music', myAudioBuffer, 'sfx', true);
```

### Volume Control
``` js
audio.setVolume('master', 0.8);
```

### Playback Control

``` js
audio.pauseAll();
audio.resumeAll();
audio.stopAllSounds('sfx');
```

## Advanced Features
### Note Processing

``` js
const [pitch, octave] = audio.parseNote('C4');
const noteNumber = audio.noteToNumber('C', 4);
const frequency = audio.calculateFrequency(60);
```

### Sound Shaping

``` js
const noiseBuffer = audio.createNoiseBuffer();
audio.applyEnvelope(gainNode, {
    attack_time: 0.1,
    attack_gain: 1,
    decay_time: 0.2,
    sustain_gain: 0.7,
    release_time: 0.3
}, audio.audioContext.currentTime);
```

### Analysis

``` js
audio.detectPitch(analyser);
```
### Unmount Plugin

``` js
audio.unmount();
```

## API Reference
### Channel Functions
`createChannel(name, volume = audio.defaultVolume)`  
Creates a new audio channel with specified name and volume. Volume defaults to system default if not provided.

`removeChannel(channel)`  
Removes the specified channel and disconnects its gain node.  

`routeChannel(sourceChannel, destinationChannel)`  
Routes audio from source channel to destination channel.  

### Playback Functions
`play(params, channel = 'synth')`  
Plays a sequence of synthesized notes. Parameters include:  

bpm: Beats per minute
ticks_per_beat: Number of ticks per beat
instruments: Instrument settings
patterns: Array of pattern objects
tempos: Optional tempo changes by tick  

`playNote(id, instrument, combinedNote, startTime, channel = 'master')`  
Plays a single synthesized note with specified parameters.  

`playAudio(id, audioBuffer, channel = 'sfx', loop = false)`  
Plays an audio buffer on specified channel with optional looping.  

### Control Functions

`pauseAll()`  
Suspends all audio playback.  

`resumeAll()`  
Resumes suspended audio playback.  

`stopAllSounds(channel)`  
Stops all playing sounds on specified channel.  

`setVolume(channel, volume)`  
Sets volume for specified channel (0 to 1).  

### Utility Functions

`parseNote(combinedNote)`  
Parses note string (e.g., "C4") into pitch and octave.  

`noteToNumber(pitch, octave)`  
Converts pitch and octave to numeric value.  

`calculateFrequency(noteNumber)`  
Calculates frequency in Hz from note number.  

`createNoiseBuffer()`  
Generates white noise buffer.  

`applyEnvelope(gainNode, envelope, startTime)`  
Applies ADSR envelope to shape audio amplitude.  

`detectPitch(analyser)`  
Analyzes audio data to detect pitch in real-time.  

### System Functions

`start()`  
Initializes audio context and master channel.  

`unmount()`  
Closes audio context and stops processing.  
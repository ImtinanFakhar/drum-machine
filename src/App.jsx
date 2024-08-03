import React, { useState, useEffect } from 'react';
import './App.css';

const sounds = [
  { key: 'Q', id: 'Heater-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', id: 'Heater-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', id: 'Heater-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', id: 'Heater-4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', id: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', id: 'Kick-n-Hat', url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', id: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
];

const DrumMachine = () => {
  const [display, setDisplay] = useState('');
  const [volume, setVolume] = useState(0.5);

  const playSound = (key, id) => {
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
    setDisplay(id);
  };

  const handleKeyPress = (e) => {
    const sound = sounds.find(s => s.key === e.key.toUpperCase());
    if (sound) {
      playSound(sound.key, sound.id);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [volume]);

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div className="pads">
        {sounds.map(sound => (
          <div 
            key={sound.key} 
            id={sound.id} 
            className="drum-pad" 
            onClick={() => playSound(sound.key, sound.id)}
          >
            {sound.key}
            <audio className="clip" id={sound.key} src={sound.url}></audio>
          </div>
        ))}
      </div>
      <div className="volume-control">
        <label htmlFor="volume">Volume: </label>
        <input 
          type="range" 
          id="volume" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={(e) => setVolume(e.target.value)} 
        />
      </div>
    </div>
  );
};

export default DrumMachine;

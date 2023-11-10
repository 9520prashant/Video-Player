// AudioWaveform.js

import React, { useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

function AudioWaveform({ audioUrl, videoPlayerRef }) {
  const waveformRef = useRef(null);
  let wavesurfer = null;

  console.log("audioUrl ", audioUrl)
  console.log("videoPlayerRef ", videoPlayerRef)

    if(videoPlayerRef === null){ 
        return (
            <h1>Loading...</h1>
        )
    }


  useEffect(() => {
    if (!wavesurfer) {
      wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        responsive: true,
      });

      wavesurfer.load(audioUrl);
      
      // Listen to the video player's play/pause events
      if (videoPlayerRef.current) {
          videoPlayerRef.current.getInternalPlayer().addEventListener('play', () => {
              wavesurfer.play()
        });
        videoPlayerRef.current.getInternalPlayer().addEventListener('pause', () => {
          wavesurfer.pause();
        });
      }
    }

    return () => {
      if (wavesurfer) {
        wavesurfer.destroy();
        wavesurfer = null;
      }
    };
  }, [audioUrl, videoPlayerRef]);

  return (
    <div>
      <div ref={waveformRef}></div>
    </div>
  );
}

export default AudioWaveform;

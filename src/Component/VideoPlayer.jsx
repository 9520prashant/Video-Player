import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import './VideoPlayer.css';
import AudioWaveform from './AudioWaveform.jsx' 

function VideoPlayer() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoTitle,setVideoTitle] = useState("");
  const [videoDuration, setVideoDuration] = useState(0);
  const playerRef = useRef(null);


  function hasAudio (video) {
    return video.mozHasAudio ||
    Boolean(video.webkitAudioDecodedByteCount) ||
    Boolean(video.audioTracks && video.audioTracks.length);
}

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    console.log("file ", file);
  
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoTitle(file.name);

    video.onloadedmetadata = () => {
      setVideoDuration(video.duration);
    };
  };

  const checkAudio = () =>{
    const video = document.getElementsByTagName('video');
    console.log(video)
     if (hasAudio(video)) {
      alert("video has audio")
    } else {
      alert("Video must have audio. Please choose a different file.");
    }
  }

  const handlePlayPause = () => {
    playerRef.current.getInternalPlayer().paused ? playerRef.current.getInternalPlayer().play() : playerRef.current.getInternalPlayer().pause();
  };
  
  console.log("playerRef in VideoPlayer ", playerRef);
  return (
    <div>
      {
        !videoFile? <input type="file" accept="video/*" onChange={handleVideoSelect} />: <button onClick={()=>setVideoFile(null)}>Choose Different File 📂</button>
      }
      {videoFile && (
        <div style={{margin:"30px", display:'flex', gap:'5rem'}}>
          <ReactPlayer
            ref={playerRef}
            url={URL.createObjectURL(videoFile)}
            controls
            />
          <div>
          <button >MetaData 👇</button>
           <div>
                <h2 style={{color:'aqua'}}>Title: {videoTitle}</h2>
                <h4>Video Duration: {videoDuration} seconds</h4>
           </div>
          </div>
        </div>
      )}
      {
        videoFile && playerRef && <AudioWaveform audioUrl={URL.createObjectURL(videoFile)} videoPlayerRef={playerRef}/> 
      }
    </div>
  ); 
}

export default VideoPlayer;        

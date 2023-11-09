import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import './VideoPlayer.css';
import AudioWaveform from './AudioWaveform.jsx' 

function VideoPlayer() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoTitle,setVideoTitle] = useState("");
  const [videoDuration, setVideoDuration] = useState(0);
  const playerRef = useRef(null);


  const hasAudio = (video) =>{
    try {
        const audioTracks = video.audioTracks;
        
        if (audioTracks.length > 0) {
            console.log("Auido hai");
        } else {
          console.log("No audio tracks found");
        }
      } catch (error) {
        console.error("Error checking for audio tracks:", error);
      }
  }

  const handleVideoSelect =  (e) => {
    const file =  e.target.files[0];
    console.log("file ", file)
    setVideoFile(file);
    setVideoTitle(file.name)


    const video =  document.createElement('video');
    video.src =  URL.createObjectURL(file);
    video.onloadedmetadata = () => {
      setVideoDuration(video.duration);
    };

    video.oncanplay = (event) => {
      console.log("Video can start,", event);
    };
  };

  const handlePlayPause = () => {
    playerRef.current.getInternalPlayer().paused ? playerRef.current.getInternalPlayer().play() : playerRef.current.getInternalPlayer().pause();
  };
  
  console.log("playerRef in VideoPlayer ", playerRef);
  return (
    <div>
      {
        !videoFile? <input type="file" accept="video/*" onChange={handleVideoSelect} />: <button onClick={()=>setVideoFile(null)}>Choose Different File</button>
      }
      {videoFile && (
        <div style={{margin:"30px", display:'flex', gap:'5rem'}}>
          <ReactPlayer
            ref={playerRef}
            url={URL.createObjectURL(videoFile)}
            controls
            />
          <div>
          <button >See MetaData</button>
           <div>
                <h2>Title: {videoTitle}</h2>
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

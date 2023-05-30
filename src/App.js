import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import axios from 'axios';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  };

  const onStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob);
    setBlobURL(recordedBlob.blobURL);
  };

  const handleUpload = async () => {
    try {
      const response = await axios.post('http://localhost:5000/recordings', {
        audio: blobURL,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Voice Recorder</h1>
      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        mimeType="audio/mp3"
      />
      {blobURL && (
        <div>
          <audio controls src={blobURL} />
        </div>
      )}
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <button onClick={handleUpload} disabled={!blobURL}>
        Upload
      </button>
    </div>
  );
}

export default App;

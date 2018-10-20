import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            recorder: null
        };
        this.audioInput = React.createRef();
        this.download = React.createRef();
    }

    componentDidMount(){
        this.download.current.download = 'audio.mp3';
        // get audio stream from user's mic
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then((stream) => {
            this.setState({
                recorder: new MediaRecorder(stream)
            });

            // listen to dataavailable, which gets triggered whenever we have
            // an audio blob available
            this.state.recorder.addEventListener('dataavailable', (e) => {this.onRecordingReady(e)});
        });
    };

    onStop = (blob) => {
        console.log(blob);
    };

    startRecording(){
        this.state.recorder.start();
    }

    stopRecording(){
        this.state.recorder.stop();
    }

    onRecordingReady(e) {
        let audio = this.audioInput.current;
        // e.data contains a blob representing the recording
        const blobURL = URL.createObjectURL(e.data);
        audio.src = blobURL;
        this.download.current.href = blobURL;
        audio.play();
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <button onClick={() => {this.startRecording()}}>Start Recording</button>
            <button onClick={() => {this.stopRecording()}}>Stop Recording</button>
            <audio id="player" controls ref={this.audioInput}/>
            <a href="#" ref={this.download}>Download</a>
        </header>
      </div>
    );
  }
}

export default App;

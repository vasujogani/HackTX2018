import React, { Component } from 'react';
import './App.css';
import hark from 'hark';

class LandingPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            recorder: null,
            recording: false,
            apiEndpoint: 'http://127.0.0.1:5000/find',
            stream: null
        };
        this.audioInput = React.createRef();
        this.download = React.createRef();
        this.button = React.createRef();
    }

    componentDidMount(){
        this.download.current.download = 'audio-TEST.mp3';
        // get audio stream from user's mic
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then((stream) => {
            this.setState({
                recorder: new MediaRecorder(stream)
            });

            this.setState({speech: hark(stream, {})});

            this.state.speech.on('stopped_speaking', () => {
                if(this.state.recording) {
                    console.log('Stopped Speaking!');
                    this.toggleRecordState();
                }
            });

            // listen to dataavailable, which gets triggered whenever we have
            // an audio blob available
            this.state.recorder.addEventListener('dataavailable', (e) => {this.onRecordingReady(e)});
        });
    };

    startRecording(){
        this.state.recorder.start();
    }

    stopRecording(){
        this.state.recorder.stop();
    }

    // When we have an audio 'blob' that we can use, we create a URL so that it can be used.
    onRecordingReady(e) {
        let audio = this.audioInput.current;
        // e.data contains a blob representing the recording
        const blobURL = URL.createObjectURL(e.data);
        audio.src = blobURL;
        this.download.current.href = blobURL;
        this.sendRequest(e.data);
        audio.play();
    }

    // This function toggles recording on/off, based on whether we're currently recording or not.
    toggleRecordState(){
        if(this.state.recording){
            this.setState({recording: false});
            this.stopRecording();
        }else{
            this.setState({recording: true});
            this.startRecording();
        }
    }

    sendRequest(blob){
        let form = new FormData();
        form.append("speech", blob);
        fetch(this.state.apiEndpoint, {
            method: 'PUT',
            body: form
        }).then((response) => response.json())
            .catch((error) => console.error('Error:', error))
            .then((response) => console.log('Success:', JSON.stringify(response)));
    }

  render() {
    return (
      <div className="App">
          <div className="content">
              <button ref={this.button} className={this.state.recording ? "record red" : "record green"} onClick={() => {this.toggleRecordState()}}/>
              <audio style={{display: "none"}} id="player" controls ref={this.audioInput}/>
              <a style={{display: "none"}} href="#" ref={this.download}>Download</a>
          </div>
      </div>
    );
  }
}

export default LandingPage;

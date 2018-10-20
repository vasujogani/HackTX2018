import React, { Component } from 'react';
import './App.css';

class LandingPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            recorder: null,
            recording: false,
            apiEndpoint: '127.0.0.1:5000/find'
        };
        this.audioInput = React.createRef();
        this.download = React.createRef();
        this.button = React.createRef();
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
        let button = this.button.current;
        if(this.state.recording){
            this.setState({recording: false});
            button.className = "red";
            this.stopRecording();
        }else{
            this.setState({recording: true});
            button.className = "green";
            this.startRecording();
        }
    }

    sendRequest(blob){
        let req = new XMLHttpRequest();
        let form = new FormData();
        form.append("speech", blob);
        req.open("POST", this.state.apiEndpoint, true);
        req.onload = function (oEvent) {
            console.log(oEvent);
        };
        console.log(form);
        req.send(form);
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <div className="navbar" />
        </header>
          <div className="content">
              <button ref={this.button} className={this.state.recording ? "red" : "green"} onClick={() => {this.toggleRecordState()}}/>
              <audio id="player" controls ref={this.audioInput}/>
              <a href="#" ref={this.download}>Download</a>
          </div>
      </div>
    );
  }
}

export default LandingPage;

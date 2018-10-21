import React, { Component } from 'react';
import './App.css';

class LandingPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            recorder: null,
            recording: false,
            apiEndpoint: 'http://127.0.0.1:5000/find',
            stream: null
        };
        this.button = React.createRef();
    }

    componentDidMount(){
        let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = new SpeechRecognition();
        this.setState({recorder: recognition});

        recognition.onspeechend = () => {
            this.toggleRecordState();
        };

        recognition.onresult = (event) => {

            // event is a SpeechRecognitionEvent object.
            // It holds all the lines we have captured so far.
            // We only need the current one.
            let current = event.resultIndex;

            // Get a transcript of what was said.
            let transcript = event.results[current][0].transcript;

            // Add the current transcript to the contents of our Note.
            this.sendRequest(transcript);
            console.log(transcript);
        };
    };

    startRecording(){
        this.state.recorder.start();
    }

    stopRecording(){
        this.state.recorder.stop();
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

    sendRequest(text){
        let form = new FormData();
        form.append("speech", text);
        fetch(this.state.apiEndpoint, {
            method: 'POST',
            body: form
        }).then((response) => {return response.json()})
            .then((data) => {console.log(data)})
            .catch((error) => console.error('Error:', error));
    }

  render() {
    return (
      <div className="App">
          <div className="content">
              <button ref={this.button} className={this.state.recording ? "record red" : "record green"} onClick={() => {this.toggleRecordState()}}/>
          </div>
      </div>
    );
  }
}

export default LandingPage;

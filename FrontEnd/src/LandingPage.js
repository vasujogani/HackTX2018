import React, { Component } from 'react';
import './App.css';
import PropTypes from "prop-types";

class LandingPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            recorder: null,
            recording: false,
            apiEndpoint: 'http://127.0.0.1:5000/process',
            stream: null
        };
        this.button = React.createRef();
        this.preview = React.createRef();
    }

    componentDidMount(){
        let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = new SpeechRecognition();
        this.setState({recorder: recognition});

        recognition.onspeechend = () => {
            this.toggleRecordState();
            this.showLoading();
        };

        recognition.onresult = (event) => {

            // event is a SpeechRecognitionEvent object.
            // It holds all the lines we have captured so far.
            // We only need the current one.
            let current = event.resultIndex;

            // Get a transcript of what was said.
            let transcript = event.results[current][0].transcript;
            this.preview.current.innerHTML = "Searching for \"" + transcript + "\"...";
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
            this.stopRecording();
            this.setState({recording: false});
        }else{
            this.startRecording();
            this.setState({recording: true});
        }
    }

    static contextTypes = {
        router: PropTypes.object
    };

    sendRequest(text){
        let form = new FormData();
        form.append("speech", text);
        fetch(this.state.apiEndpoint, {
            method: 'POST',
            body: form
        }).then((response) => {return response.json()})
            .then((data) => {
                this.props.updateRecipeList(data);
                this.context.router.history.push('/dashboard');
            }).catch((error) => console.error('Error:', error));
    }

    showLoading(){
        this.button.current.classList.add("onclick");
        this.preview.current.classList.add("visible");
    }

  render() {
    return (
      <div className="App">
          <div className="content">
              <button ref={this.button} className={this.state.recording ? "record red" : "record green"} onClick={() => {this.toggleRecordState()}}/>
              <h1 ref={this.preview} className="preview" />
          </div>
      </div>
    );
  }
}

export default LandingPage;

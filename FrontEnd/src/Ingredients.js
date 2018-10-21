import React, {Component, Fragment} from 'react';
import './App.css';
import hark from "hark";
import firebase from 'firebase';



class Ingredients extends Component {

    constructor(props){
        super(props);
        this.state = {
            recorder: null,
            recording: false,
            apiEndpoint: '127.0.0.1:5000/find',
            stream: null,
            ingredients: [],
            loaded: false,
            db: firebase.firestore()
        };
        this.audioInput = React.createRef();
        this.download = React.createRef();
        this.button = React.createRef();
        this.input = React.createRef();
    }

    componentDidMount(){
        this.state.db.collection("ingredients").get().then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                this.state.ingredients.push(doc.id);
            })
        }).then( () => {
            this.setState({loaded: true});
        });
        this.input.current.onkeyup = (e) => {this.addIngredient(e)};
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
        //this.sendRequest(e.data);
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

    addIngredient(e){
        if(e.keyCode === 13 && e.target.value && e.target.value.trim()) {
            this.state.ingredients.push(e.target.value.trim());
            this.setState({ingredients: this.state.ingredients});
            this.state.db.collection("ingredients").doc(e.target.value.trim()).set({});
            e.target.value = '';
        }
    }

    deleteItem(e){
        this.state.db.collection("ingredients").doc(e.target.innerHTML).delete();
        let index = this.state.ingredients.indexOf(e.target.innerHTML);
        this.state.ingredients.splice(index, 1);
        this.setState({ingredients: this.state.ingredients});
    }

  render() {
    return (
        <Fragment>
            <input ref={this.input} type="text" placeholder="Enter an ingredient!" />
            <div className="content">
                <button style={{display: "none"}} ref={this.button} className={this.state.recording ? "red" : "green"} onClick={() => {this.toggleRecordState()}}/>
                <audio style={{display: "none"}} id="player" controls ref={this.audioInput}/>
                <a style={{display: "none"}} href="#" ref={this.download}>Download</a>
                <h1 className="ingredients-header">Your Current Ingredients</h1>
                <div className="flex-container">
                    {this.state.ingredients.map((item, index) => {
                        return(<h2 key={index} className="flex-item ingredient" onClick={(e) => {this.deleteItem(e)}}>{item}</h2>);
                    })}
                </div>
            </div>
        </Fragment>
    );
  }
}

export default Ingredients;

import React, {Component, Fragment} from 'react';
import './App.css';
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
        let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = new SpeechRecognition();
        this.setState({recorder: recognition});

        recognition.onspeechend = () => {
            this.toggleRecordState();
        };

        recognition.onstart = () => {
            console.log("started")
        };

        recognition.onresult = (event) => {
            // event is a SpeechRecognitionEvent object.
            // It holds all the lines we have captured so far.
            // We only need the current one.
            let current = event.resultIndex;

            // Get a transcript of what was said.
            let transcript = event.results[current][0].transcript;

            // Add the current transcript to the contents of our Note.
            this.addIngredient(null, transcript);
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

    addIngredient(e, string){
        if(string){
            this.state.ingredients.push(string.trim());
            this.setState({ingredients: this.state.ingredients});
            this.state.db.collection("ingredients").doc(string.trim()).set({});
        }else{
            if(e.keyCode === 13 && e.target.value && e.target.value.trim()) {
                this.state.ingredients.push(e.target.value.trim());
                this.setState({ingredients: this.state.ingredients});
                this.state.db.collection("ingredients").doc(e.target.value.trim()).set({});
                e.target.value = '';
            }
        }
    }

    deleteItem(e){
        this.state.db.collection("ingredients").doc(e.target.innerHTML).delete();
        let index = this.state.ingredients.indexOf(e.target.innerHTML);
        this.state.ingredients.splice(index, 1);
        this.setState({ingredients: this.state.ingredients});
    }

    getCustomRecipes(e){
        fetch(this.state.apiEndpoint, {
            method: 'GET'
        }).then((response) => {return response.json()})
            .then((data) => {
                this.props.updateRecipeList(data);
                this.context.router.history.push('/dashboard');
            }).catch((error) => console.error('Error:', error));
    }

  render() {
    return (
        <Fragment>
            <div className="inputs">
                <button ref={this.button} className={this.state.recording ? "red" : "green"} onClick={() => {this.toggleRecordState()}}/>
                <h1>or</h1>
                <input ref={this.input} type="text" placeholder="Enter an ingredient!" />
            </div>
            <div style={{textAlign: "center"}} className="content">
                <audio style={{display: "none"}} id="player" controls ref={this.audioInput}/>
                <h1 style={{marginBottom: "40px"}}className="ingredients-header">Your Current Ingredients</h1>
                <div className="flex-container">
                    {this.state.ingredients.map((item, index) => {
                        return(<h2 key={index} className="flex-item ingredient" onClick={(e) => {this.deleteItem(e)}}>{item}</h2>);
                    })}
                </div>
                <button className="custom-recipes" onClick={ (e) => {this.getCustomRecipes(e)}}>What can I make with this?</button>
            </div>
        </Fragment>
    );
  }
}

export default Ingredients;

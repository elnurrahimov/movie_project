import React, { Component } from "react";
import "./SearchBox.css";
import { addMovies } from "../../redux/actions";
import { connect } from "react-redux";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
class SearchBox extends Component {
  
  state = {
    searchLine: "",
  };
  
  searchLineChangeHandler = (e) => {
    this.setState({searchLine: e.target.value});
  };
  

   Dictaphone = (props) => {
    const { transcript, resetTranscript } = useSpeechRecognition()
    
    return (
      
      <div>
        
        <button className="buttons-speech" onClick={SpeechRecognition.startListening}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.6em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M16,12V6c0-2.217-1.785-4.021-3.979-4.021c-0.069,0-0.14,0.009-0.209,0.025C9.693,2.104,8,3.857,8,6v6c0,2.206,1.794,4,4,4 S16,14.206,16,12z M10,12V6c0-1.103,0.897-2,2-2c0.055,0,0.109-0.005,0.163-0.015C13.188,4.06,14,4.935,14,6v6c0,1.103-0.897,2-2,2 S10,13.103,10,12z"></path><path d="M6,12H4c0,4.072,3.061,7.436,7,7.931V22h2v-2.069c3.939-0.495,7-3.858,7-7.931h-2c0,3.309-2.691,6-6,6S6,15.309,6,12z"></path></svg></button>
        <button className="buttons-speech"  onClick={()=>this.updateSearchline(transcript)}><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.6em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button>
        <button className="buttons-speech"  onClick={resetTranscript}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.6em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M20,8 C18.5974037,5.04031171 15.536972,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 L12,21 C16.9705627,21 21,16.9705627 21,12 M21,3 L21,9 L15,9"></path></svg></button>
        <p className="paragraf">{transcript}</p>
      </div>
    
    )
    
  }

  updateSearchline=(transcript)=>{
    SpeechRecognition.stopListening();
    this.setState({...this.state,searchLine:transcript})
  }
  searchBoxSubmitHandler = (e) => {
    e.preventDefault();
    let searchText = this.state.searchLine;
    const key = "d3496eed";
    fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=${key}`)
      .then((res) => res.json())
      .then((data) => {
        this.props.dispatch(addMovies(data.Search));
      })
      .catch(error => {
       alert("We couldnt find your movie. Be sure you typed it right.")
      })
    
  };

  
  render() {
    const { searchLine } = this.state;
    return (
      <div className="search-box">
        
        <form
          className="search-box__form"
          onSubmit={this.searchBoxSubmitHandler}
        >
          <label className="search-box__form-label">
           
            <input
              value={searchLine}
              type="text"
              className="search-box__form-input"
              placeholder=" Enter a film name"
              onChange={this.searchLineChangeHandler}
            />
          </label>
          <button
            type="submit"
            className="search-box__form-submit"
            disabled={!searchLine}
          >
           Search
          </button>
          
          
        </form>
        <this.Dictaphone/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};

export default connect(mapStateToProps)(SearchBox);

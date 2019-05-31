import React from 'react';
import When from './When';
import './design/training.scss';

class Training extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      i: 0,
      active: false,
      showQuote: false
    };
  }
  
  beginReader = () => {

    if(localStorage.length){
      let index = JSON.parse(localStorage.getItem('index'));
      console.log('!!!!!!!!!!', index);
      this.setState({ i: index })
    }

    if(!this.state.active){
      this.setState({ active: true }, () => {
        this.runTimer();
      });
    }
  }

  pauseReader = () => {
    this.setState({ active: false })
    let stringI = JSON.stringify(this.state.i);
    let stringBook = JSON.stringify(this.props.textArr);
    localStorage.setItem('index', stringI);
    localStorage.setItem('book', stringBook);

    console.log('??????????????', stringI);
  }
  
  runTimer() {
    let word = this.props.textArr[this.state.i];
    let lastCharacter = word[this.props.textArr[this.state.i].length - 1];
    let nextWord = this.props.textArr[this.state.i+1];

    if(this.state.active){
      this.setState({ i: this.state.i + 1 });

      if(nextWord[0] === '"' && this.state.showQuote === false){
        this.setState({ showQuote: true });
        console.log('turning quotes on')
      } else if(lastCharacter === '"' && this.state.showQuote === true){
        this.setState({ showQuote: false });
        console.log('turning quotes off');
      }

      if(word && word.length < 8){
        setTimeout(this.runTimer.bind(this), this.props.speed*50);
      } else {
        setTimeout(this.runTimer.bind(this), this.props.speed*50+200);
      }
    }
  }

  previoudWord = () => {
    this.pauseReader();
    this.setState({ i: this.state.i - 1});
  }
  
  render(){
    let word = this.props.textArr[this.state.i];
    
    return(
      <section id="display">
        <When condition={this.state.showQuote}>
          <h2 id="quoteOne">"</h2>
          <h2 id="quoteTwo">"</h2>
        </When>
        <h2 id="word"> { word.replace(/"/g,'') } </h2>
        <div id="buttons">
          <button onClick={this.previoudWord}>Go Back</button>
          <When condition={this.state.active === false}>
            <button onClick={this.beginReader}>Go</button>
          </When>
          <When condition={this.state.active}>
            <button onClick={this.pauseReader}>Pause</button>
          </When>
        </div>
      </section>
    )
  }
}

export default Training;
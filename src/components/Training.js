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
    if(!this.state.active){
      this.setState({ active: true }, () => {
        this.runTimer();
      });
    }
  }

  pauseReader = () => {
    this.setState({ active: false })
  }
  
  runTimer() {
    if(this.state.active){
      this.setState({ i: this.state.i + 1 });

      if(this.props.textArr[this.state.i].includes('"') && this.state.showQuote === false){
        console.log('in the turn on quote')
        this.setState({ showQuote: true });
      } else if(this.props.textArr[this.state.i].includes('"') && this.state.showQuote === true){
        console.log('in the turn off quote')
        this.setState({ showQuote: false });
      }

      if(this.props.textArr[this.state.i][this.props.textArr[this.state.i].length - 1] === '"'){
        this.setState({ showQuote: false });
      }

      if(this.props.textArr[this.state.i] && this.props.textArr[this.state.i].length < 8){
        setTimeout(this.runTimer.bind(this), this.props.speed*50);
      } else {
        setTimeout(this.runTimer.bind(this), this.props.speed*50+200);
      }
    }
  }

  previoudWord = () => {
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
        <h2 id="word"> { word } </h2>
        <div id="buttons">
          <button onClick={this.previoudWord}>Go Back</button>
          <button onClick={this.beginReader}>Go</button>
          <button onClick={this.pauseReader}>Pause</button>
        </div>
      </section>
    )
  }
}

export default Training;
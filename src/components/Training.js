import React from 'react';
import When from './When';

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
    console.log('in begin reader with text arr', this.props.textArr)
    this.setState({ active: true }, () => {
      this.runTimer();
    });
  }

  pauseReader = () => {
    this.setState({ active: false })
  }
  
  runTimer() {
    if(this.state.active){
      this.setState({ i: this.state.i + 1 });

      if(this.props.textArr[this.state.i] && this.props.textArr[this.state.i][0] === '"'){
        this.setState({ showQuote: true });
      }

      if(this.props.textArr[this.state.i] && this.props.textArr[this.state.i][this.props.textArr[this.state.i].length-1] === '"'){
        this.setState({ showQuote: false });
      }

      if(this.props.textArr[this.state.i] && this.props.textArr[this.state.i].length < 8){
        setTimeout(this.runTimer.bind(this), this.props.speed*50);
      } else {
        setTimeout(this.runTimer.bind(this), this.props.speed*50+200);
      }
    }
  }
  
  render(){
    let word = this.props.textArr[this.state.i];
    return(
      <>
        <When condition={this.state.showQuote}>
          <h2>""</h2>
        </When>
        <h1> { word } </h1>
        <p>I'm the Training</p>
        <button onClick={this.beginReader}>Go</button>
        <button onClick={this.pauseReader}>Pause</button>
      </>
    )
  }
}

export default Training;
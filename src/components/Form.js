import React from 'react';
import Training from './Training';
import When from './When';
import './design/form.scss';

class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      textArr: [],
      speed: 0,
      displayForm: true,
      displayTraining: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ displayForm: false });
    this.setState({ displayTraining: true });

    let textInput = e.target.words.value;

    this.setState({ textArr: textInput.split(' ')});
  }

  updateSpeed = (e) => {
    let speedInput = Number(e.target.value);

    switch(speedInput) {
      case 1:
        speedInput = 10;
        break;
      case 2:
        speedInput = 9;
        break;
      case 3:
        speedInput = 8;
        break;
      case 4:
        speedInput = 7;
        break;
      case 5:
        speedInput = 6;
        break;
      case 6:
        speedInput = 5;
        break;
      case 7:
        speedInput = 4;
        break;
      case 8:
        speedInput = 3;
        break;
      case 9:
        speedInput = 2;
        break;
      case 10:
        speedInput = 1;
        break;
      default:
        speedInput = 5;
    }
    console.log('the speed is', this.state.speed);
    this.setState({ speed: speedInput });
  }

  render(){
    return(
      <>
        <When condition={this.state.displayTraining}>
          <Training textArr={this.state.textArr} speed={this.state.speed} />
        </When>
        <form onSubmit={this.handleSubmit}>

        <When condition={this.state.displayForm}>
          <label>Enter Text</label>
          <textarea type="text" name="words"></textarea>
        </When>

          <div id="speed">
            <label>Reading Speed:</label>
            <input onChange={this.updateSpeed} type="range" id="start" name="speed" min="1" max="10"></input>
          </div>

          <When condition={this.state.displayForm}>
            <button type="submit">Submit</button>
          </When>
        </form>
      
        
      </>
    )
  }
}

export default Form;


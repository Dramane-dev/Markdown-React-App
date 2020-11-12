import './App.css';
import marked from 'marked';
import { Component } from 'react';
import { sampleText } from './sampleText';

class App extends Component {
  state = {
    text: sampleText 
  }

  componentDidMount() {
    const text = localStorage.getItem('text');

    if (!text) {
      this.setState({ text: sampleText });
    } else {
      this.setState({ text });
    }
  }

  componentDidUpdate() {
    const { text } = this.state;
    localStorage.setItem('text', text);
  }

  handlChange = event => {
    event.preventDefault();
    const text = event.target.value
    this.setState({ text })
  }

  renderText = text => {
    const __html = marked(text, { sanitize: true });
    return { __html };
  }

  render() {
    return(
      <div className='container'>
        <div className='row'>
          <div className='col-sm-6'>
            <textarea
              className='form-control'
              onChange={ this.handlChange }
              value={ this.state.text }
              cols='50'
              rows="30" />
          </div>
          <div className='col-sm-6'>
            <h1>Résultat</h1>
            <div dangerouslySetInnerHTML={ this.renderText(this.state.text) }></div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;

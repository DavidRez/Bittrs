import React from 'react';
import ReactDOM from 'react-dom';
import MakeBitters from './components/MakeBitters.jsx';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MakeBitters />
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
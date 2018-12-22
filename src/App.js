import React from 'react';
import { initSnow, updateSnow } from './snow';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.canvas = React.createRef();
    this.state = {
      mX: -100,
      mY: -100,
      flakeCount: 400,
    };
  }

  componentDidMount() {
    const { flakeCount } = this.state;
    const canvas = this.canvas.current;

    initSnow(canvas, flakeCount);

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { mX, mY, flakeCount } = this.state;
    const canvas = this.canvas.current;

    if (prevState.mX !== mX || prevState.mY !== mY) {
      updateSnow(canvas, mX, mY, flakeCount);
    }
  }

  onMouseMoveSnow = e => {
    this.setState({
      mX: e.clientX,
      mY: e.clientY,
    });
  };

  render() {
    return (
      <div className="app">
        <canvas
          className="canvas"
          ref={this.canvas}
          onMouseMove={this.onMouseMoveSnow}
          onTouchEnd={this.onMouseMoveSnow}
          onTouchMove={this.onMouseMoveSnow}
        />
        <div className="content">
          <code className="title">
            Wishes you a <br />
            Great Holiday season!
          </code>
          <br />
          <a
            className="link"
            href="https://github.com/tiennguyen1293"
            target="_blank"
            rel="noopener noreferrer"
          >
            <code>
              by Tien Nguyen{' '}
              <span role="img" aria-label="Heart">
                ❤️
              </span>
            </code>
          </a>
        </div>
      </div>
    );
  }
}

export default App;

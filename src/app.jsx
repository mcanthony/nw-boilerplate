var React = require('react');

var AppStyle = require('./app.less');

class Application extends React.Component {
  render() {
    return <div className="application"><h1>Application Body</h1></div>;
  }
}

React.render(<Application />, document.body);

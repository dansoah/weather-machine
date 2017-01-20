import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './hello-component.jsx';
import World from './world-component.jsx';

class HelloWorldContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div><Hello /> <World /></div>);
    }

}
 
ReactDOM.render(<HelloWorldContainer/>, document.getElementById('app'));
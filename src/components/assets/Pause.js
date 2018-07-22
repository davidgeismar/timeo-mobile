
import React, { Component } from 'react';
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

class Pause extends Component {

    render() {
        return (

            <Svg viewBox="0 0 12 14" version="1.1"    style={this.props.style}>
              <Path d="M0,14 L4,14 L4,0 L0,0 L0,14 Z M8,0 L8,14 L12,14 L12,0 L8,0 Z"/>
            </Svg>
        );
    }
}

export default Pause;

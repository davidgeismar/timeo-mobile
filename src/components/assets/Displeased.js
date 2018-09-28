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




class Displeased extends Component {
    render() {
        return (
          <Svg style={this.props.style} viewBox="0 0 64 64" enable-background="new 0 0 64 64">
          <Circle cx="32" cy="32" r="30" fill="#ffdd67"/>
          <G fill="#664e27">
          <Circle cx="20.5" cy="26.6" r="5"/>
          <Circle cx="43.5" cy="26.6" r="5"/>
          <Path d="m23 47.6c5.8-4.8 12.2-4.8 18 0 .7.6 1.3-.4.8-1.3-1.8-3.4-5.3-6.5-9.8-6.5s-8.1 3.1-9.8 6.5c-.5.9.1 1.9.8 1.3"/>
          </G>
          </Svg>
        );
    }
}

export default Displeased;

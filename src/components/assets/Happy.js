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


class Happy extends Component {
    render() {
        return (
          <Svg style={this.props.style} viewBox="0 0 64 64" enable-background="new 0 0 64 64">
          <Circle cx="32" cy="32" r="30" fill="#ffdd67"/>
          <G fill="#664e27"><Circle cx="20.5" cy="26.6" r="5"/>
          <Circle cx="43.5" cy="26.6" r="5"/>
          <Path d="m44.6 40.3c-8.1 5.7-17.1 5.6-25.2 0-1-.7-1.8.5-1.2 1.6 2.5 4 7.4 7.7 13.8 7.7s11.3-3.6 13.8-7.7c.6-1.1-.2-2.3-1.2-1.6"/>
          </G></Svg>
        );
    }
}

export default Happy;

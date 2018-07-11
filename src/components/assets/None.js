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


class None extends Component {
    render() {
        return (
          <Svg style={this.props.style} viewBox="0 0 64 64" enable-background="new 0 0 64 64">
          <Circle cx="32" cy="32" r="30" fill="#ffdd67"/>
          <G fill="#664e27"><Circle cx="20.5" cy="27.6" r="5"/>
          <Circle cx="43.5" cy="27.6" r="5"/>
          <Path d="m38.9 48h-13.8c-1.5 0-1.5-4 0-4h13.7c1.6 0 1.6 4 .1 4"/></G>
          </Svg>
        );
    }
}

export default None;

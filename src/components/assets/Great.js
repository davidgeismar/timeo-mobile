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


class Great extends Component {
    render() {
        return (
          <Svg style={this.props.style} viewBox="0 0 64 64" enable-background="new 0 0 64 64">
          <Circle cx="32" cy="32" r="30" fill="#ffdd67"/>
          <Path d="m49.7 34.4c-.4-.5-1.1-.4-1.9-.4-15.8 0-15.8 0-31.6 0-.8 0-1.5-.1-1.9.4-3.9 5 .7 19.6 17.7 19.6 17 0 21.6-14.6 17.7-19.6" fill="#664e27"/>
          <Path d="m33.8 41.7c-.6 0-1.5.5-1.1 2 .2.7 1.2 1.6 1.2 2.8 0 2.4-3.8 2.4-3.8 0 0-1.2 1-2 1.2-2.8.3-1.4-.6-2-1.1-2-1.6 0-4.1 1.7-4.1 4.6 0 3.2 2.7 5.8 6 5.8 3.3 0 6-2.6 6-5.8-.1-2.8-2.7-4.5-4.3-4.6" fill="#4c3526"/>
          <Path d="m24.3 50.7c2.2 1 4.8 1.5 7.7 1.5 2.9 0 5.5-.6 7.7-1.5-2.1-1.1-4.7-1.7-7.7-1.7s-5.6.6-7.7 1.7" fill="#ff717f"/>
          <Path d="m47 36c-15 0-15 0-29.9 0-2.1 0-2.1 4-.1 4 10.4 0 19.6 0 30 0 2 0 2-4 0-4" fill="#fff"/>
          <G fill="#664e27">
          <Circle cx="20.5" cy="23" r="5"/><Circle cx="43.5" cy="23" r="5"/></G></Svg>
        );
    }
}

export default Great;

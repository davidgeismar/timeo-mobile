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

class Sick extends Component {
    render() {
        return (
          <Svg style={this.props.style} viewBox="0 0 64 64" enable-background="new 0 0 64 64">
          <Circle cx="32" cy="32" r="30" fill="#ffdd67"/>
          <G fill="#664e27">
          <Circle cx="43.5" cy="30.3" r="5"/>
          <Circle cx="20.5" cy="30.3" r="5"/>
          </G>
          <G fill="#917524">
          <Path d="m25.6 15.2c-3.2 2.7-7.5 3.9-11.7 3.1-.6-.1-1.1 2-.4 2.2 4.8.9 9.8-.5 13.5-3.6.5-.5-1-2.1-1.4-1.7"/>
          <Path d="m50.1 18.2c-4.2.7-8.5-.4-11.7-3.1-.4-.4-2 1.2-1.4 1.7 3.7 3.2 8.7 4.5 13.5 3.6.7-.2.2-2.3-.4-2.2"/>
          </G>
          <Path d="m4.4 38.7l24.2 14.2 4.6-6.5-21.4-18.1c-6.4-4.5-13.7 5.9-7.4 10.4" fill="#e5e5e5"/>
          <Path d="m5.8 36.5l23.8 15 2.8-3.9-22.2-17.3c-3.7-2.6-8.1 3.6-4.4 6.2" fill="#fff"/>
          <Path fill="#ed4c5c" d="m7.5 36.2l22.1 14.4 1.9-2.6-21.1-16z"/>
          <G fill="#51575b"><Path d="m18.1 41.5l-2 2.8-.9-.5 2-2.9z"/>
          <Path d="m20.5 43.2l-1.9 2.7-.9-.5 1.9-2.8z"/>
          <Path d="m23 44.9l-1.9 2.6-.8-.5 1.8-2.6z"/>
          <Path d="m25.4 46.6l-1.6 2.4-.9-.6 1.7-2.3z"/>
          <Path d="m27.9 48.3l-1.5 2.2-.9-.6 1.5-2.1z"/>
          </G>
          <Path d="m41.5 43.9c-6 .3-11.6 3.3-15.2 8-.9 1.2 2.2 3.5 3.1 2.3 2.4-3.1 6.8-6.2 12.3-6.5 1.4 0 1.3-3.8-.2-3.8" fill="#664e27"/>
          </Svg>
        );
    }
}

export default Sick;

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
class Attachment extends Component {
  render() {
      return (
        <Svg
         style={this.props.style}
         viewBox="0 0 11 22"
         >
          <Path
            fill={this.props.fill}
            d="M9.5,5 L9.5,16.5 C9.5,18.71 7.71,20.5 5.5,20.5 C3.29,20.5 1.5,18.71 1.5,16.5 L1.5,4 C1.5,2.62 2.62,1.5 4,1.5 C5.38,1.5 6.5,2.62 6.5,4 L6.5,14.5 C6.5,15.05 6.05,15.5 5.5,15.5 C4.95,15.5 4.5,15.05 4.5,14.5 L4.5,5 L3,5 L3,14.5 C3,15.88 4.12,17 5.5,17 C6.88,17 8,15.88 8,14.5 L8,4 C8,1.79 6.21,0 4,0 C1.79,0 0,1.79 0,4 L0,16.5 C0,19.54 2.46,22 5.5,22 C8.54,22 11,19.54 11,16.5 L11,5 L9.5,5 Z"/>
        </Svg>
      );
  }
}

export default Attachment;

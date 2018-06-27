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
class Absent extends Component {
  render() {
      return (
        <Svg
          style={this.props.style}
          viewBox="0 0 64 64"
          enable-background="new 0 0 64 64">
          <Path d="m32 2c-16.6 0-30 13.4-30 30 0 16.6 13.4 30 30 30s30-13.4 30-30c0-16.6-13.4-30-30-30m22 30c0 4.6-1.4 8.9-3.9 12.5l-30.6-30.6c3.6-2.5 7.9-3.9 12.5-3.9 12.2 0 22 9.9 22 22m-44 0c0-4.6 1.4-8.9 3.9-12.5l30.6 30.6c-3.6 2.5-7.9 3.9-12.5 3.9-12.1 0-22-9.9-22-22"
                fill={this.props.fill}/>
        </Svg>
      );
  }
}

export default Absent;

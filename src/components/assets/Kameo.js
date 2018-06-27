
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


class Kameo extends Component {
    render() {
        return (
          <Svg
           style={this.props.style}
           viewBox="0 0 21.71 33.25"
           >
            <G id="Calque_2" data-name="Calque 2">
              <G id="Calque_1-2" data-name="Calque 1">
                <Path class="kameo-1"
                      fill={this.props.fill}
                      d="M.1,22.62h3v3H.1Zm3.79,0h3v3h-3ZM.1,26.42h3v3H.1Zm3.79,0h3v3h-3Zm3.8,0h3v3h-3Zm-3.8,3.79h3v3h-3Zm3.8,0h3v3h-3Z"/>
                <Path class="kameo-2"
                      fill={this.props.fill}
                      d="M18.81,3.12a10.65,10.65,0,0,0-8-3.12A10.64,10.64,0,0,0,2.9,3.12,10.46,10.46,0,0,0,0,10.75v9.92H4.3V10.75A6.84,6.84,0,0,1,5.85,6.08a6.3,6.3,0,0,1,5-2.21,6.3,6.3,0,0,1,5,2.21,6.89,6.89,0,0,1,1.55,4.67V22.57a6.86,6.86,0,0,1-1.55,4.66,6,6,0,0,1-3.23,2v4a10.2,10.2,0,0,0,6.18-3,10.47,10.47,0,0,0,2.9-7.63V10.75A10.41,10.41,0,0,0,18.81,3.12Z"/>
              </G>
            </G>
          </Svg>
        );
    }
}

export default Kameo;

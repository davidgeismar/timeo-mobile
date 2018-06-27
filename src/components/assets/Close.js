
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


class Close extends Component {
    render() {
        return (

          <Svg
            style={this.props.style}
            viewBox="0 0 24 24" >
            <Path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill={this.props.fill}/>
            <Path d="M0 0h24v24H0z" fill="none"/>
          </Svg>

        //   <Svg
        //       style={this.props.style}
        //       viewBox="0 0 75 87.5"
        //   >
        //     <Path
        //       fill={this.props.fill}
        //       d="M66.8,26.76A37.41,37.41,0,1,1,37.5,12.5a38.13,38.13,0,0,1,23.44,8.4l5.86-6.06a41.61,41.61,0,0,1,5.86,5.86ZM37.5,79.3A29.2,29.2,0,1,0,8.4,50,29.09,29.09,0,0,0,37.5,79.3ZM50,0V8.4H25V0Z"/>
        //     <Polyline
        //       fill={this.props.fill}
        //       points="31.9 63.35 31.9 37.35 50.1 50.35"/>
        // </Svg>
        );
    }
}

export default Close;

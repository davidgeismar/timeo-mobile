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


class Sad extends Component {
    render() {
        return (
        <Svg style={this.props.style} viewBox="0 0 64 64" enable-background="new 0 0 64 64">
        <Circle cx="32" cy="32" r="30" fill="#ffdd67"/>
        <G fill="#664e27">
        <Path d="m25.5 28.4c1.4 2.9-.4 6.6-3.9 8.3-3.5 1.6-7.5.6-8.9-2.3-.8-1.9 12-7.9 12.8-6"/>
        <Path d="m38.5 28.4c-1.4 2.9.4 6.6 3.9 8.3 3.5 1.6 7.5.6 8.9-2.3.8-1.9-12-7.9-12.8-6"/>
        </G><G fill="#917524">
        <Path d="m22.7 19.8c-2.7 3.3-9.2 6.3-13.5 6.3-.6 0-.7 2.2 0 2.2 4.9 0 12-3.3 15.2-7.1.5-.5-1.3-1.8-1.7-1.4"/>
        <Path d="m41.3 19.8c2.7 3.3 9.2 6.3 13.5 6.3.6 0 .7 2.2 0 2.2-4.9 0-12-3.3-15.2-7.1-.5-.5 1.3-1.8 1.7-1.4"/>
        </G>
        <Path d="m40.6 46.4c-5.4-2.5-11.8-2.5-17.2 0-1.3.6.3 4.2 1.7 3.5 3.6-1.7 8.9-2.3 13.9 0 1.3.6 3-2.8 1.6-3.5" fill="#664e27"/>
        </Svg>
        );
    }
}

export default Sad;

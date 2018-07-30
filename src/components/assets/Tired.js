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


class Tired extends Component {
    render() {
        return (
          <Svg style={this.props.style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enable-background="new 0 0 64 64">
            <Path d="M62,32c0,16.6-10.8,30-30,30C15.4,62,2,48.6,2,32C2,15.4,15.4,2,32,2S62,15.4,62,32z" fill="#ffdd67"/>
            <G fill="#467591">
            <Path d="m26.8 21.3c-.2-.4-.7-.6-1.1-.3l-2 1.2.7-5c0-.2 0-.4-.1-.5l-.6-1.2c-.1-.2-.3-.3-.5-.4-.2-.1-.4 0-.6.1l-4.9 2.9c-.2.1-.3.3-.4.5-.1.2 0 .4.1.6l.7 1.3c.2.4.7.6 1.1.3l1.9-1.1-.7 4.9c0 .2 0 .4.1.5l.7 1.3c.2.3.5.5.9.4.1 0 .1 0 .2-.1l5-2.9c.2-.1.3-.3.4-.5.1-.2 0-.4-.1-.6l-.8-1.4"/>
            <Path d="m40.5 8.1c-.1-.2-.3-.3-.5-.4l-7.9-2c-.4-.1-.8.2-.9.6l-.4 1.9c0 .2 0 .4.1.6.1.2.3.3.5.4l3.6.9-5.5 4.7c-.1.1-.2.3-.3.5l-.2 2c0 .2 0 .4.1.6.1.2.3.3.5.4l8 2c.1 0 .2 0 .3 0 .1 0 .2-.1.3-.1.2-.1.3-.3.3-.5l.4-1.9c.1-.4-.2-.9-.6-1l-3.8-1 5.5-4.8c.1-.1.2-.3.3-.5l.4-1.8c0-.2-.1-.4-.2-.6"/>
            <Path d="m55 22.4c.2-.1.3-.2.4-.4l1.2-2.5c.2-.4 0-.8-.4-1l-5.8-2.8 10.1-5c.2-.1.3-.2.3-.4l1.1-2.3c.2-.4 0-.8-.4-1l-10.5-4.9c-.4-.2-.8 0-1 .4l-1.2 2.5c-.2.4 0 .8.4 1l5.5 2.6-10 4.9c-.2.1-.3.2-.3.4l-1.2 2.5c-.1.2-.1.4 0 .6 0 .1.1.2.2.3.1.1.1.1.2.1l10.8 5.1c.2 0 .4 0 .6-.1"/>
            </G>
            <G fill="#664e27">
            <Path d="m50 45.2c.8 1.2 1.1 3.6-.6 4.7-1.4.9-3.7.7-5.4 1.8-1.8 1.2-2.5 3.3-3.9 4.2-1.9 1.2-3.7-.2-4.5-1.4-1.4-2.2.7-6.1 4.7-8.6 3.9-2.6 8.3-2.9 9.7-.7"/>
            <Path d="m38.3 33.6c7.2 5.4 14.9 1.8 15.3-7.1 0-.5-.6-.4-1.4-.5-2.4 4.8-8.7 7.4-13.5 6.3-.3.7-.7 1.1-.4 1.3"/>
            <Path d="m15.9 44.1c7.2 5.4 14.9 1.8 15.3-7.1 0-.5-.6-.4-1.4-.5-2.4 4.8-8.7 7.4-13.5 6.3-.3.6-.8 1-.4 1.3"/></G></Svg>
        );
    }
}

export default Tired;
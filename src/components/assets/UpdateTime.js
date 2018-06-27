
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

class UpdateTime extends Component {
    render() {
        return (
          <Svg viewBox="0 0 75.05 74.9"   style={this.props.style}>
           <G id="Calque_2" data-name="Calque 2" fill="#ec6083">
             <G id="Calque_1-2" data-name="Calque 1" fill="#ec6083">
               <Path fill="#ec6083"
                     d="M39.7,20.9V38.48l14.45,8.79-2.93,5.07L33.45,41.6V20.9Zm35.35,8.79H46.73L58.25,18C46.92,6.64,28.37,6.25,17,17.58A28.52,28.52,0,0,0,17,58.2a29.23,29.23,0,0,0,41.21,0,27.09,27.09,0,0,0,8.4-20.31h8.4c0,8.2-3.52,19-10.94,26.17a38,38,0,0,1-53.12,0,36.66,36.66,0,0,1,0-52.34,37.49,37.49,0,0,1,52.73,0L75.05,0V29.69Z"/>
             </G>
           </G>
         </Svg>


        );
    }
}

export default UpdateTime;

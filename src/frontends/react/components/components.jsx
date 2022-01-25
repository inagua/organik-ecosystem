// /** @jsx React.DOM */
import React from 'react';

// From: https://gist.github.com/biesnecker/42a5fb1b54b67c6356ed

class SVGComponent extends React.Component {
    render() {
        return (
            <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
        );
    }
}

class Rectangle extends React.Component {
    render() {
        return (
            <>
            <rect x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height}>{this.props.children}</rect>
            </>
        );
    }
};

class Circle extends React.Component {
    render() {
        return (
            <circle cx={this.props.cx} cy={this.props.cy} r={this.props.r} stroke={this.props.stroke}>{this.props.children}</circle>
        );
    }
};

class Ellipse extends React.Component {
    render() {
        return (
                <ellipse cx={this.props.cx} cy={this.props.cy} rx={this.props.rx} ry={this.props.ry}>{this.props.children}</ellipse>
        );
    }
};

class Line extends React.Component {
    render() {
        return (
            <line
                x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2}
                strokeWidth={this.props.strokeWidth} stroke={this.props.stroke}
            >{this.props.children}</line>
        );
    }
};

class Polyline extends React.Component {
    render() {
        return (
            <polyline
                points={this.props.points} strokeWidth={this.props.strokeWidth} stroke={this.props.stroke} fill={this.props.fill}
            >{this.props.children}</polyline>
        );
    }
};

// class DynamicSVGComponent extends React.Component {
//     getInitialState() {
//         return ({
//             shape: 0,
//             size: 0,
//             color: 0
//         });
//     }
//
//     changeShape() {
//         const n = this.state.shape + 1;
//         this.setState({
//             shape: n < 3 ? n : 0
//         });
//     }
//
//     changeSize() {
//         const n = this.state.size + 1;
//         this.setState({
//             size: n < 4 ? n : 0
//         });
//     }
//
//     changeColor() {
//         const n = this.state.color + 1;
//         this.setState({
//             color: n < 4 ? n : 0
//         });
//     }
//
//     render() {
//
//         const color = ['red', 'green', 'blue', 'orange'][this.state.color];
//         const size = (this.state.size * 20) + 20;
//
//         let shape;
//         switch (this.state.shape) {
//             case 0:
//                 const x = 50 - (size / 2);
//                 const y = 50 - (size / 2);
//                 shape =
//                     <Rectangle
//                         key="the-shape"
//                         x={x}
//                         y={y}
//                         width={size}
//                         height={size}
//                         fill={color} />;
//                 break;
//             case 1:
//                 shape =
//                     <Circle
//                         key="the-shape"
//                         cx="50"
//                         cy="50"
//                         r={size / 2}
//                         fill={color} />;
//                 break;
//             case 2:
//                 shape =
//                     <Ellipse
//                         key="the-shape"
//                         cx="50"
//                         cy="50"
//                         rx={size / 2}
//                         ry={size / 2 * 0.75}
//                         fill={color} />;
//                 break;
//         }
//         return(
//             <table>
//                 <tr>
//                     <td width="75%">
//                         <SVGComponent height="100" width="100">
//                             {shape}
//                         </SVGComponent>
//                     </td>
//                     <td>
//                         <button onClick={this.changeShape}>
//                             Shape
//                         </button><br />
//                         <button onClick={this.changeSize}>
//                             Size
//                         </button><br />
//                         <button onClick={this.changeColor}>
//                             Color
//                         </button>
//                     </td>
//                 </tr>
//             </table>
//         )
//     }
// };

export {
    SVGComponent,
    Rectangle,
    Circle,
    Ellipse,
    Line,
    Polyline,
    // DynamicSVGComponent,
}

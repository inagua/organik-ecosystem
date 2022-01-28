import {useSelector, useDispatch} from 'react-redux'
import selectMovers from '../selectors/mover.selector'
import selectResolution from '../selectors/resolution.selector'
import {Circle, Ellipse, Line, Polyline, Rectangle, SVGComponent} from './components'
import Mover from "./Mover";

function ReactDisplay() {

    const resolution = useSelector(selectResolution)
    const movers = useSelector(selectMovers)
    // const dispatch = useDispatch()

    return (
        <>
            <span>{movers.length}</span>

            <SVGComponent height={resolution.height} width={resolution.width}>
                {movers.map((mover) => <Mover mover={mover} key={mover.id}/>)}
            </SVGComponent>

            {/*<SVGComponent height="50" width="50"/>*/}

            {/*<SVGComponent height="100" width="100">*/}
            {/*    <Rectangle height="50" width="50" x="25" y="25"/>*/}
            {/*</SVGComponent>*/}

            {/*<SVGComponent height="100" width="100">*/}
            {/*    <Circle cx="50" cy="50" r="25"/>*/}
            {/*</SVGComponent>*/}

            {/*<SVGComponent height="100" width="100">*/}
            {/*    <Ellipse cx="50" cy="50" rx="25" ry="15"/>*/}
            {/*</SVGComponent>*/}

            {/*<SVGComponent height="100" width="230">*/}
            {/*    <Circle cx="50" cy="50" r="25" fill="mediumorchid"/>*/}
            {/*    <Circle cx="125" cy="50" r="25" fill="#ff0099"/>*/}
            {/*    <Circle cx="200" cy="50" r="25" fill="none" stroke="crimson"/>*/}
            {/*</SVGComponent>*/}

            {/*<SVGComponent height="100" width="100">*/}
            {/*    <Line x1="25" y1="25" x2="75" y2="75" strokeWidth="5" stroke="orange"/>*/}
            {/*</SVGComponent>*/}

            {/*<SVGComponent height="100" width="100">*/}
            {/*    <Polyline*/}
            {/*        points="25,25 25,75 50,75 50,50 75,25"*/}
            {/*        strokeWidth="5"*/}
            {/*        stroke="orange"*/}
            {/*        fill="none"/>*/}
            {/*</SVGComponent>*/}

            {/*<DynamicSVGComponent />*/}

        </>
    );
}

export default ReactDisplay;

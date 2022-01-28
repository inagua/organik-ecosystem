import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import './App.css';
import moverReducer from './reducers/mover.reducer'
import {setupMoversAction, stepMoversAction} from './actions/mover.action'
import ReactDisplay from "./components/ReactDisplay";
import createMovers from '../../models/create-movers'

const store = createStore(moverReducer, composeWithDevTools());

const locationScale = 10;
const resolution = {width: 1000, height: 500};
const target = [25 * locationScale, 15 * locationScale];
const isDebug = false;
const movers = createMovers({resolution, target, isDebug, locationScale});

store.dispatch(setupMoversAction({target, resolution, movers}))

setInterval(() => {
    store.dispatch(stepMoversAction());
}, 1000);

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <header className="App-header">
                    <ReactDisplay></ReactDisplay>
                </header>
            </div>
        </Provider>
    );
}

export default App;

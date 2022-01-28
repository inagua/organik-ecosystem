import moverReducer from '../reducers/mover.reducer';

const setupMoversAction = ({target, resolution, movers = []}) => ({
    type: moverReducer.Types.Movers.Setup,
    payload: {target, resolution, movers}
});

const stepMoversAction = () => ({
    type: moverReducer.Types.Movers.Step,
    payload: undefined
});

export {
    setupMoversAction,
    stepMoversAction
};

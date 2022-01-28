const Types = {
    Movers: {
        Setup: 'Movers/Setup',
        Step: 'Movers/Step',
    }
};

const InitialState = {
    target: [25, 15],
    resolution: {width: 80, height: 40},
    movers: []
};

const moverReducer = function (state = InitialState, action) {
    const {type, payload} = action;
    switch (type) {
        case Types.Movers.Setup:
            return {
                ...state,
                target: payload.target,
                resolution: payload.resolution,
                movers: payload.movers
            };
        case Types.Movers.Step:
            return {
                ...state,
                movers: state.movers.map(mover => mover.step({
                    target: state.target,
                    ...state.resolution
                }))
            };
        default:
            return state;
    }
};

moverReducer.Types = Types;

export default moverReducer;

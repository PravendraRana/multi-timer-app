export const timerReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TIMER':
            return [...state, action.payload];
        case 'START_TIMER':
            return state.map(timer =>
                timer.id === action.payload ? { ...timer, status: 'running' } : timer
            );
        case 'PAUSE_TIMER':
            return state.map(timer =>
                timer.id === action.payload ? { ...timer, status: 'paused' } : timer
            );
        case 'RESET_TIMER':
            return state.map(timer =>
                timer.id === action.payload
                    ? { ...timer, remainingTime: timer.duration, status: 'paused' }
                    : timer
            );
        case 'UPDATE_TIMER':
            return state.map(timer =>
                timer.id === action.payload.id ? { ...timer, ...action.payload.updates } : timer
            );
        case 'DELETE_TIMER':
            return state.filter(timer => timer.id !== action.payload);
        case 'START_CATEGORY':
            return state.map(timer =>
                timer.category === action.payload ? { ...timer, status: 'running' } : timer
            );
        case 'PAUSE_CATEGORY':
            return state.map(timer =>
                timer.category === action.payload ? { ...timer, status: 'paused' } : timer
            );
        case 'RESET_CATEGORY':
            return state.map(timer =>
                timer.category === action.payload
                    ? { ...timer, remainingTime: timer.duration, status: 'paused' }
                    : timer
            );
        case 'DECREMENT_TIMER':
            return state.map((timer) =>
                timer.id === action.payload && timer.remainingTime > 0
                    ? {
                        ...timer,
                        remainingTime: timer.remainingTime - 1,
                        status: timer.remainingTime - 1 === 0 ? 'completed' : timer.status,
                    }
                    : timer
            );
        case 'COMPLETE_TIMER':
            return state.map((timer) =>
                timer.id === action.payload
                    ? { ...timer, status: 'completed', completedAt: Date.now() }
                    : timer
            );
        case 'LOAD_TIMERS':
            return action.payload;
        default:
            return state;
    }
};

export const historyReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_HISTORY':
            return [...state, action.payload];
        case 'LOAD_HISTORY':
            return action.payload;
        default:
            return state;
    }
};
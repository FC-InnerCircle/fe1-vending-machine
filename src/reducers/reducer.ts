export const formatCurrency = (value: number): string => {
    return value.toLocaleString();
};

export type State = {
    totalInserted: number;
};

export const initState : State = {
    totalInserted: 0,
};
export type Action = { type: 'INSERT'; inputValue: number }

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'INSERT':
            const newTotalInserted = state.totalInserted + action.inputValue;
            return {
                ...state,
                totalInserted: newTotalInserted,
            };
        default:
            throw new Error('알수 없는 액션입니다.');
    }
};

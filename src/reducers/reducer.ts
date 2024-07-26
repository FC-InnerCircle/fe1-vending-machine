export const formatCurrency = (value: number): string => {
    return value.toLocaleString();
};

export type State = {
    totalInserted: number;
    displayValue: number;
    message: string;
};

export const productPrice: Array<number> = [300, 400, 500, 600, 700, 800, 900, 1000, 1100];

export const initState: State = {
    totalInserted: 0,
    displayValue: 0,
    message: '',
};
export type Action =
    | { type: 'INSERT'; inputValue: number }
    | { type: 'REFUND' }
    | { type: 'PURCHASE'; inputValue: number; }
    | { type: 'DISPLAY'; inputValue: number }
    | { type: 'LOG'; inputValue: string }

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'INSERT':
            const newTotalInserted = state.totalInserted + action.inputValue;
            return {
                ...state,
                totalInserted: newTotalInserted,
                displayValue: newTotalInserted,
            };
        case 'REFUND':
            return {
                ...state,
                totalInserted: 0,
                displayValue: 0
            };
        case 'PURCHASE':
            const updatedTotalInserted = state.totalInserted - action.inputValue;
            return {
                ...state,
                totalInserted: updatedTotalInserted,
            };
        case 'DISPLAY':
            return {
                ...state,
                displayValue: action.inputValue,
            };
        case 'LOG':
            return {
                ...state,
                message: state.message + action.inputValue + '\n',
            };
        default:
            throw new Error('알수 없는 액션입니다.');
    }
};

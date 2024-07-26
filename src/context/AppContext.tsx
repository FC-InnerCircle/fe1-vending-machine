import React, {createContext, useReducer, ReactNode} from 'react';
import {reducer, initState, State, Action} from '../reducers/reducer';

interface ContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

interface AppProviderProps {
    children: ReactNode;
}

export const VendingMachineContext = createContext<ContextProps | undefined>(undefined);
export const VendingMachineProvider: React.FC<AppProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <VendingMachineContext.Provider value={{state, dispatch}}>
            {children}
        </VendingMachineContext.Provider>
    );
};

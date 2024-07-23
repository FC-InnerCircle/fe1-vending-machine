import React, { createContext, useReducer, ReactNode } from 'react';
import { reducer, initState, State, Action } from '../reducers/reducer';

interface ContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

interface AppProviderProps {
    children: ReactNode;
}

export const AppContext = createContext<ContextProps | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer,initState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

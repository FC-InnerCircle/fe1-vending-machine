import React from 'react';
import { AppProvider } from './context/AppContext';
import AppMain from './components/AppMain';

const App: React.FC = () => {
    return (
        <AppProvider>
            <AppMain />
        </AppProvider>
    );
};

export default App;

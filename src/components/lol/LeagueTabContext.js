import React, { useContext, useState } from 'react';

const LeagueTabContext = React.createContext(null); // application wide state for keeping track of current tab
const UpdateLeagueTabContext = React.createContext(null); // function to update state

export const useLeagueTabContext = () => {
    return useContext(LeagueTabContext);
};

export const useUpdateLeagueTabContext = () => {
    return useContext(UpdateLeagueTabContext);
};

export const LeagueTabContextProvider = ({ children }) => {
    const [currTab, setCurrTab] = useState("home");
    const setTab = (tabName) => {setCurrTab(tabName);};

    return (
        <LeagueTabContext.Provider value={currTab}>
            <UpdateLeagueTabContext.Provider value={setTab}>
                {children}
            </UpdateLeagueTabContext.Provider>
        </LeagueTabContext.Provider>
    );
};

import React, { useContext, useState } from 'react';

const RegionContext = React.createContext(null); // application wide state for keeping track of current tab
const UpdateRegionContext = React.createContext(null); // function to update state

export const useRegionContext = () => {
    return useContext(RegionContext);
};

export const useUpdateRegionContext = () => {
    return useContext(UpdateRegionContext);
};

export const RegionContextProvider = ({ children }) => {
    const [region, setRegion] = useState("NA1");
    const updateRegion = (region) => {setRegion(region);};

    return (
        <RegionContext.Provider value={region}>
            <UpdateRegionContext.Provider value={updateRegion}>
                {children}
            </UpdateRegionContext.Provider>
        </RegionContext.Provider>
    );
};

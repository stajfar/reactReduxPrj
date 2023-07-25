import { createContext, useEffect, useState } from 'react';
import FHIR from "fhirclient";
import Client from 'fhirclient/lib/Client';



const FhirClientDataContext = createContext({});

export const FhirClientContextProvider = ({ children }: any) => {

    const [FhirClientState, setClientState] = useState<Client>();
    useEffect(() => {
        if (FHIR) {
            console.log('getting client afer launch redirect to here');

            FHIR.oauth2.ready()
                .then((client) => {
                    setClientState(client);
                })
                .catch(() => { console.log('Error retrieving FHIR data.'); });
        }

    }, []);


    return (
        <FhirClientDataContext.Provider value={{
            //here add states which we want to provide to children
            FhirClientState
        }} >
          { children }
        </FhirClientDataContext.Provider>
    )
};


export default FhirClientDataContext;
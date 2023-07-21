import React, { useEffect, useState } from 'react';
import FHIR from "fhirclient";
import Client from 'fhirclient/lib/Client';

function LaunchRedirect() {

    const [clientState, setClientState] = useState<Client>();
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


    useEffect(() => {
        if (clientState) {
            console.log(clientState);
            console.log('getting patient and practitioenr from fhir client');
            try {
                let data = [];

                if (clientState.hasOwnProperty('user')) {
                    let practitionerData = clientState.user.read();//make this async with await clientState.user.read()
                    console.log(practitionerData);
                    data.push(practitionerData);
                }

                if (clientState.hasOwnProperty('patient')) {
                    let patientData = clientState.patient.read(); //make this async  with await
                    console.log(patientData);
                    data.push(patientData);
                }
            }
            catch { }
        }
    }, [clientState]);


  return (
    <p>Hello world redirected, get fhir clinet and set to store!</p>
  );
}

export default LaunchRedirect;
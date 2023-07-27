import React, { useEffect} from 'react';
import FHIR from "fhirclient";

function Launch() {


    //if the launch page is invoked by the EHR (launcher), the following paramters will be replaced (also, a launch parameter will be there which may have patient, practitioner id)
    //if web app launched manually (standalone mode) by http://localhost:3000/launch.html, following are the default values.
    const redirectUri = 'http://localhost:3000/launchredirect.html';   //  getQueryStringParameter(useLocation().search, 'redirecturi');
    useEffect(() => {
		FHIR.oauth2.authorize({
            clientId: "bab78122-402e-47fc-b2a7-d107503daf9b",
			scope: "patient/*.* launch/patient online_access openid profile",
			iss: "https://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImoiOiIxIn0/fhir",
            redirectUri: redirectUri,
           // launch
           
		});

    }, []);

  

  return (
    <p>Hello world!</p>
  );
}



export default Launch;
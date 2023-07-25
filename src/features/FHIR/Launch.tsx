import React, { useEffect} from 'react';
import FHIR from "fhirclient";
import { oauth2 as SMART } from "fhirclient";

function Launch() {

    const redirectUri = 'http://localhost:3000/launchredirect.html';   //  getQueryStringParameter(useLocation().search, 'redirecturi');
    useEffect(() => {
		FHIR.oauth2.authorize({
            clientId: "bab78122-402e-47fc-b2a7-d107503daf9b",
			scope: "patient/*.* launch/patient online_access openid profile",
			iss: "https://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImoiOiIxIn0/fhir",
            redirectUri: redirectUri
           
		});

    }, []);

  

  return (
    <p>Hello world!</p>
  );
}



export default Launch;
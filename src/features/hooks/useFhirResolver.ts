import fhirPath from "fhirpath";
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';


export const useFhirResolver = (path: string, resource: any) => {

    const result = fhirPath.evaluate(resource, path, undefined, fhirpath_r4_model);// last param is optional


    console.log(result);

    return result;

}
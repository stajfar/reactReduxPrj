import { RJSFSchema } from '@rjsf/utils';
import { JSONSchema7 } from 'json-schema';
declare module 'json-schema' {//extending
    export interface JSONSchema7 {
        custompProperties?: { key: string, value: string }[];//array of key-value
    }
}


  


export const useSchemaResolver = (schema: RJSFSchema) => {

    console.log('schema resolver');
   

    console.log('start traversing schema');
    const fhirElement = 'fhirElement';
    let map1 = new Map<string, string>();
    let propKey = '';
    let propKeys: string[];
    const schemaTravers = (objpar: any) => {
        const keys = Object.keys(objpar as Object);

        keys.map(key => {
            if (key === 'properties')
                propKeys = Object.keys(objpar[key]);
           
            if (propKeys?.includes(key))//memorize the property key
                propKey = key;

            if (objpar[key] === fhirElement)
                map1.set(propKey, objpar['value']);

            if (typeof objpar[key] === 'object')
                schemaTravers(objpar[key]);
        });
    }

    schemaTravers(schema);

    //console.log('finito');
    //console.log(map1.get('firstname'));
    //console.log(map1.get('lastname'));
   

    return map1;

}
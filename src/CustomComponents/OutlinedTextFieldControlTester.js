import { rankWith, scopeEndsWith, isStringControl, optionIs } from '@jsonforms/core';

export default rankWith(
  3, //increase rank as needed
    isStringControl && optionIs('format', 'outlinedTextFiled')
    //scopeEndsWith('OutlinedTextFiled')
);
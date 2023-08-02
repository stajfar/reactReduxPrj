import { withJsonFormsControlProps } from '@jsonforms/react';
import { OutlinedTextField } from './OutlinedTextField';

interface RatingControlProps {
    data: any;
    handleChange(path: string, value: any): void;
    path: string;
}

const RatingControl = ({ data, handleChange, path }: RatingControlProps) => (
    <OutlinedTextField
        value={data}
        updateValue={(newValue: string) => handleChange(path, newValue)}
    />
);

export default withJsonFormsControlProps(RatingControl);
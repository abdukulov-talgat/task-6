import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import {MAX_ERRORS, MIN_ERRORS} from "../../lib/const";
import {clampNumber} from "../../lib/utils";

interface RangePickerProps {
    name: string,
    id: string,
    value: number,
    onValueChange: (value: number) => void,
    min: number,
    max: number,
}

const RangePicker = ({ id, name, value, onValueChange, min, max}: RangePickerProps) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        const clampedValue = clampNumber(newValue, min, max);
        onValueChange(clampedValue);
    }

    return (
        <>
            <Form.Control type="number" id={id} name={name}
                          value={value} onChange={handleInputChange}/>
            <Form.Range step="0.25" min="0" max="10" value={value}
                        onChange={(e) => onValueChange(Number(e.target.value))}/>
        </>
    );
};

export default RangePicker;

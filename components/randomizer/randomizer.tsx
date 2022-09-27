import React from 'react';
import {Button, Form} from "react-bootstrap";
import {getRandomInt} from "../../lib/utils";


interface RandomizerProps {
    id: string,
    name: string,
    value: number,
    onValueChange: (value: number) => void,
    min?: number,
    max?: number
}

const Randomizer = ({id, name, value, onValueChange, min = 0, max = 1000}: RandomizerProps) => {
    
    return (
        <div className="d-flex gap-1">
            <Form.Control type="number" id={id} name={name} value={value}
                          onChange={(e) => onValueChange(Number(e.target.value))}/>
            <Button variant="outline-primary"
                    type="button"
                    onClick={() => onValueChange(getRandomInt(min, max))}>
                Random
            </Button>
        </div>
    );
};

export default Randomizer;

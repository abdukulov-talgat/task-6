import React, {useContext} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import RangePicker from "../rangePicker/rangePicker";
import Randomizer from "../randomizer/randomizer";
import {MAX_ERRORS, MIN_ERRORS, Regions} from "../../lib/const";
import {SettingsContext} from "../../lib/settingsContext";
import {RegionValue} from "../../types/types";

const Toolbar = () => {
    const [settings, setSettings] = useContext(SettingsContext);

    return (
        <Form>
            <Row>
                <Col sm={4}>
                    <Form.Label className="pt-3"
                                htmlFor="region">Region</Form.Label>
                    <Form.Select id="region" name="region"
                                 value={settings.region}
                                 onChange={(e) => setSettings({
                                     ...settings,
                                     region: e.target.value as RegionValue
                                 })}>
                        {Regions.map((it) => (
                            <option key={it.value} value={it.value}>
                                {it.text}
                            </option>))}
                    </Form.Select>
                </Col>
                <Col sm={4}>
                    <Form.Label className="pt-3"
                                htmlFor="errors">Errors count</Form.Label>
                    <RangePicker name="errors" id="errors"
                                 value={settings.errors}
                                 min={MIN_ERRORS} max={MAX_ERRORS}
                                 onValueChange={(value) => setSettings({
                                     ...settings,
                                     errors: value
                                 })}
                    />
                </Col>
                <Col sm={4}>
                    <Form.Label className="pt-3">Seed</Form.Label>
                    <Randomizer id="seed" name="seed" value={settings.seed}
                                onValueChange={(value: number) => setSettings({
                                    ...settings,
                                    seed: value
                                })}/>
                </Col>
            </Row>
        </Form>
    )
        ;
};

export default Toolbar;

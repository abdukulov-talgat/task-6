import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import type {AppProps} from 'next/app'
import React, {useState} from "react";
import {initialSettings, SettingsContext} from "../lib/settingsContext";
import dynamic from "next/dynamic";

function MyApp({Component, pageProps}: AppProps) {
    const [settings, setSettings] = useState(initialSettings);

    return (
        <SettingsContext.Provider value={[settings, setSettings]}>
            <Component {...pageProps} />
        </SettingsContext.Provider>
    )
}


export default MyApp

import React, { useState } from 'react';
import AlertContext from './alertcontext';

const Alertstate = (props) => {
        const [alert, setAlert] = useState(null);
        const showAlert = (type, message) => {
            setAlert({ type, msg: message });

            setTimeout(() => {
                setAlert(null);
            }, 1500);
        };
        return (
            <AlertContext.Provider value={{showAlert, alert}}>
                {props.children}
            </AlertContext.Provider>
        )
    }

    export default Alertstate
import React, { useState, useEffect } from 'react';

export default function useInput(val) {

    const [ field, setField ] = useState(val);

    const addNewValue = () => setField(val);
    // useEffect(() => {
    //     setField(val);
    // }, [val]);
    
    return [
        field,
        addNewValue
    ]
}
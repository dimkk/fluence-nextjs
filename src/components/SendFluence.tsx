'use client';
import React, { useState } from 'react';

function SendFluence() {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const handler = async (url: string) => {
        setLoading(true);
        const request = await fetch('/api/hello?' + url);
        const response = await request.json();
        setResult(response.fluenceData);
        setLoading(false);
    };

    const Buttons = (
        <div className='flex flex-row'>
            <button className='btn' onClick={() => handler('hello=true')}>
                Get hello world
            </button>
            <button className='btn' onClick={() => handler('fortune=true')}>
                Get fortune
            </button>
            <button className='btn' onClick={() => handler('relay=true')}>
                Get relay time
            </button>
        </div>
    );
    if (loading) {
        return (
            <div className='flex flex-col'>
                {Buttons}
                <span className=' py-2  self-center loading loading-spinner loading-md'></span>
            </div>
        );
    }

    return (
        <div className='flex flex-col'>
            {Buttons}
            <div className='py-2 self-center'>Fluence response: {result}</div>
        </div>
    );
}

export default SendFluence;

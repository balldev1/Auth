import React from 'react';

interface DarkmodePageProps {
    setClassMode: (mode: string) => void;
}

export const DarkmodePage: React.FC<DarkmodePageProps> = ({ setClassMode })=> {
    return (
        <div>
            <button onClick={() => setClassMode('light')}>
                Set Light Mode
            </button>
            <button onClick={() => setClassMode('dark')}>
                Set Dark Mode
            </button>
        </div>
    )
}
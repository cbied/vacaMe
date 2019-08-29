import React from 'react';

const Terminal = ({ userData, selected }) => {
    const selectedData = selected === 'All' ? userData : userData[selected];
    const jsonCode = JSON.stringify(selectedData, null, 4);

    return (
<div className="window">
        <div className="title-bar">
            <div className="buttons">
                <div className="mac-btn close" />
                <div className="mac-btn close" />
                <div className="mac-btn close" />
            </div>
            <p style={{ textAlign: 'center', margin: 0}}>
                json-terminal
            </p>
            <div className="content">
                <pre>{jsonCode}</pre>
            </div>
        </div>
    </div>
    )
    
}

export default Terminal
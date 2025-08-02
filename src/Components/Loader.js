import React from 'react';

const Loader = () => {
    return (
        <div style={{
            border: '16px solid #f3f3f3',
            borderRadius: '50%',
            borderTop: '16px solid #3498db',
            width: '120px',
            height: '120px',
            animation: 'spin 2s linear infinite',
            WebkitAnimation: 'spin 2s linear infinite'
        }}>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    @-webkit-keyframes spin {
                        0% { -webkit-transform: rotate(0deg); }
                        100% { -webkit-transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default Loader;

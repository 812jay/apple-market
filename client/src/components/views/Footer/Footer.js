import React from 'react';
import { AppleFilled } from '@ant-design/icons';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p> Apple Market! <AppleFilled style={{fontSize: '25px'}} /></p>
        </div>
    )
}

export default Footer

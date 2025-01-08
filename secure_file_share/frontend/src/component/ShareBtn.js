import React from 'react'
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import { Button } from '@mui/material';
import "./component.css"

function ShareBtn() {
    return (
        <div className='share-btn'  >
            <ShareSharpIcon classes={"share-icon"} style={{height:"25px"}} className='share-icon'/>
        </div>
    )
}

export default ShareBtn
import React, { useState } from 'react'
import PeintedPenIcon from '../../assets/PeintedPenIcon'
import PenIcon from '../../assets/PenIcon'
import s from './SettingsPopUp.module.scss'

function SettingsPopUp({visiblePopUp, setVisiblePopUp, setvisibleEditor, currentPosition}) {
    const [hover, setHover] = useState(false)
    return (
        <div  
            className={`${s.popup} ${visiblePopUp && s.popupActive}`} 
            style={{top: `${currentPosition.y || 45}px`, left: `${150}px`}}
        >
            <div 
                className={`medical-notes__settings-item ${s.item}`} 
                onMouseMove={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={
                    () => {
                        setVisiblePopUp(false)
                        setvisibleEditor(true)
                        }
                }
            >   {hover ? <PeintedPenIcon /> : <PenIcon />}
                Edit
            </div>
        </div>
    )
}

export default SettingsPopUp

import React from 'react'
import MedicalFolderIcon from '../../assets/MedicalFolderIcon'
import ShowSettingsIcon from '../../assets/ShowSettingsIcon'
import s from './Header.module.scss'

function Header({setVisiblePopUp, visiblePopUp, setCurrentPosition}) {

    return (
        <div className={s.header}>
            <div className={s.title}>
            <MedicalFolderIcon />
                Medical Background
            </div>
            <div  className={s.settings} onClick={() => {
                setVisiblePopUp(!visiblePopUp)
                setCurrentPosition({y: 45})
            }}>
                <ShowSettingsIcon/>
            </div>
        </div>
    )
}

export default Header

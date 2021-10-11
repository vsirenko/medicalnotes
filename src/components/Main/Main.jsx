import React, { useEffect, useRef, useState } from 'react'
import Header from '../Header/Header'
import SettingsPopUp from '../SettingsPopUp/SettingsPopUp'
import { Editor } from '@tinymce/tinymce-react';
import s from './Main.module.scss'

function Main() {
    const [visiblePopUp, setVisiblePopUp] = useState(false)
    const [textInEditor, setTextInEditor] = useState('')
    const [visibleEditor, setvisibleEditor] = useState(false)
    const [currentPosition, setCurrentPosition] = useState({
        y: 0,
        x: 0
    })
    const editorRef = useRef(null);
    const mainRef = useRef(null)

    useEffect(() => {
        if(textInEditor.length === 0) {
            setvisibleEditor(true)
        }
    }, [textInEditor])
    useEffect(() => {
        if(textInEditor) {
            document.addEventListener('click', handleClickOutside)
        }
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [mainRef, textInEditor])
    const handleClickOutside = (e) => {
            if (!e.path.includes(mainRef.current)) {
                setvisibleEditor(false)
                setVisiblePopUp(false)
            }
    }
    const handleClickOnText = (e) => {
        const rect = e.target.getBoundingClientRect();
        setCurrentPosition({
            y: e.clientY - rect.left,
            x: e.clientX - rect.top
        })
        setVisiblePopUp(!visiblePopUp)
    }
    return (
        <div ref={mainRef} className={s.main}>
            <Header 
                setVisiblePopUp={setVisiblePopUp} 
                visiblePopUp={visiblePopUp} 
                setvisibleEditor={setvisibleEditor}
                setCurrentPosition={setCurrentPosition}
            />
            <div className={s.hr}></div>
            <div className={s.body}>
            {visibleEditor && 
                <div className={s.editor}>
                        <Editor
                        apiKey={'sposfwty6ucohg1727r21ej3r006rdw03hrbk7a3csweua1q'}
                        onInit={(evt, editor) => editorRef.current = editor}
                        onEditorChange={(newValue) => setTextInEditor(newValue)}
                        value={textInEditor }
                            init={{
                                placeholder: 'Write your text here... (example: accident)',
                                menubar: false,
                                branding: false,
                                contextmenu_never_use_native: true,
                                statusbar: false,
                                resize: true,
                                plugins: [
                                    'autoresize advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                autoresize_on_init: true,
                                
                                autoresize_bottom_margin: 0,
                                content_style: 'body {font-family: Source Sans Pro, sans-serif; font-size:16px; color:#00385D; margin: 10px }',
                                toolbar: 
                                'bold italic backcolor | bullist numlist  | ',
                                }}
                        />
                </div>
            }
            {!visibleEditor && 
                <div
                    onClick={handleClickOnText}
                    className={s.text} 
                    dangerouslySetInnerHTML={{__html: textInEditor && textInEditor}}>
                </div>
            }
            <SettingsPopUp
                    currentPosition={currentPosition}
                    setVisiblePopUp={setVisiblePopUp} 
                    visiblePopUp={visiblePopUp} 
                    setvisibleEditor={setvisibleEditor}
                />
            </div>
        </div>
    )
}

export default Main

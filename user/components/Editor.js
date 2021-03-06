import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import 'braft-editor/dist/index.css'
let BraftEditor = dynamic(() => import('braft-editor').then((module)=>{
    BraftEditor = module.default
    return module.default
}), { ssr: false })

const Editor = () => {
    const [editorState, setEditorState] = useState([])
    const a = 10
    
    useEffect(() => {
        setTimeout(() => {
            setEditorState(BraftEditor.createEditorState(null))
            console.log('只执行一次');
        }, 2000)
    },[a])

    const handleChange = (editorState) => {
        setEditorState(editorState)
        console.log(editorState)
    }

    return (
        <BraftEditor value={editorState} onChange={handleChange}/>
    )
}

export default Editor
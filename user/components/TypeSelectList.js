import { useState, setState, useContext, Tooltip, Button } from 'react'
import CommonContext from '../components/CommonContext'
import { Icon } from 'antd'
import '../styles/components/typeselectlist.css'

export default function TypeSelectList() {
    const [iconType, setIconType] = useState('down')
    const [chosenType, setChosenType] = useState(0)
    let value = useContext(CommonContext)
    let type = value[0]
    let typeContent = value[1]
    function openAll() {
        if (iconType == 'down') {
            setIconType('up')
        }
        else {
            setIconType('down')
        }
    }
    const chooseType = (e) => {
        setChosenType(e.target.getAttribute('pos'))
    }
    return (
        <div className="type-select-list-div">
            <div><span>{type} :</span></div>
            <ul>
                {
                    typeContent.map((item, index) => {
                        return (
                            <li
                                title={item.value}
                                pos={index}
                                key={index}
                                style={{ display: iconType == 'up' || index <= 14 ? 'block' : 'none', color: index == chosenType ? '#cd201f' : 'rgba(0, 0, 0, 0.65)' }}
                                onClick={chooseType}
                            >
                                {item.value}
                            </li>
                        )
                    })
                }
            </ul>
            <Icon
                type={iconType}
                style={{ visibility: typeContent.length > 15 ? "visible" : "hidden", cursor: "pointer", width: "3%" }}
                onClick={openAll}
            >
            </Icon>
        </div>
    )
}
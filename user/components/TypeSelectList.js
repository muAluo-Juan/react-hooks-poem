import { useState, useEffect } from 'react'
import CommonContext from '../components/CommonContext'
import { Icon } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../styles/components/typeselectlist.css'

const TypeSelectList = ()=>{
    const [iconType, setIconType] = useState('down')
    const [chosenType, setChosenType] = useState(0)
    const [typeType, setTypeType] = useState([])
    useEffect(()=>{
        getTypeList()
    },[])
    const getTypeList = ()=>{
        axios({
            method: 'get',
            url: servicePath.getTypeList,
            withCredentials: true
        }).then(
            res=>{
                setTypeType(res.data.data)
            }
        )
    }
    function openAll() {
        if (iconType == 'down') {
            setIconType('up')
        }
        else {
            setIconType('down')
        }
    }
    const chooseType = (e) => {
        // console.log(e.target.dataset)
        setChosenType(e.target.dataset.pos)
    }
    return (
        <div className="type-select-list-div">
            <div><span>类别 :</span></div>
            <ul>
                {
                    typeType.map((item, index) => {
                        return (
                            <li
                                title={item.name}
                                data-pos={index}
                                key={index}
                                style={{ 
                                    marginTop: index > 13?"0.3rem":"0rem",
                                    display: iconType == 'up' || index <= 13 ? 'block' : 'none', 
                                    color: index == chosenType ? '#cd201f' : 'rgba(0, 0, 0, 0.65)' 
                                }}
                                onClick={chooseType}
                            >
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
            <Icon
                type={iconType}
                style={{ visibility: typeType.length > 14 ? "visible" : "hidden", cursor: "pointer", width: "3%" }}
                onClick={openAll}
            >
            </Icon>
        </div>
    )
}
export default TypeSelectList
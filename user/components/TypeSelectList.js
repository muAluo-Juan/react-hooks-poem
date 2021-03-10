import '../styles/components/typeselectlist.css'
import { useState, useEffect } from 'react'
import CommonContext from '../components/CommonContext'
import { Icon } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'


const TypeSelectList = (props) => {
    const [iconType, setIconType] = useState('down')
    const [chosenType, setChosenType] = useState(0)
    const [typeType, setTypeType] = useState([])
    const { setType } = props
    useEffect(() => {
        getTypeList()
    }, [])
    const getTypeList = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeList,
            withCredentials: true
        }).then(
            res => {
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
        setType(e.target.dataset.pos)
    }
    return (
        <div className="type-select-list-div">
            <div><span>类别 :</span></div>
            <ul>
                <li
                    title="不限"
                    data-pos={0}
                    key={0}
                    style={{
                        color: 0 == chosenType ? '#cd201f' : 'rgba(0, 0, 0, 0.65)'
                    }}
                    onClick={chooseType}
                >
                    不限
                </li>
                {
                    typeType.map((item, index) => {
                        return (
                            <li
                                title={item.name}
                                data-pos={item.id}
                                key={index}
                                style={{
                                    marginTop: index > 12 ? "0.3rem" : "0rem",
                                    display: iconType == 'up' || index <= 12 ? 'block' : 'none',
                                    color: item.id == chosenType ? '#cd201f' : 'rgba(0, 0, 0, 0.65)'
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
                style={{ visibility: typeType.length > 13 ? "visible" : "hidden", cursor: "pointer", width: "3%" }}
                onClick={openAll}
            >
            </Icon>
        </div>
    )
}
export default TypeSelectList
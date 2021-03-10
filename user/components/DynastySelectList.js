import '../styles/components/typeselectlist.css'
import { useState, useEffect, useContext } from 'react'
import { Icon } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'


export default function DynastySelectList(props) {
    const [iconType, setIconType] = useState('down')
    const [chosenType, setChosenType] = useState(0)
    const [dynastyType, setDynastyType] = useState([])
    const { setDynasty } = props

    useEffect(() => {
        getDynastyList()
    }, [])

    const getDynastyList = () => {
        axios({
            method: 'get',
            url: servicePath.getDynastyList,
            withCredentials: true
        }).then(
            res => {
                setDynastyType(res.data.data)
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
        setDynasty(e.target.dataset.pos)
    }
    return (
        <div className="type-select-list-div">
            <div><span>朝代 :</span></div>
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
                    dynastyType.map((item, index) => {
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
                style={{ visibility: dynastyType.length > 13 ? "visible" : "hidden", cursor: "pointer", width: "3%" }}
                onClick={openAll}
            >
            </Icon>
        </div>
    )
}
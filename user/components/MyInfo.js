import '../styles/components/myinfo.css'
import { useEffect, useState } from 'react'
import { Avatar, Divider, Tabs, Tag, Input, Radio, DatePicker, Button, message, Upload, Icon } from 'antd'
import moment from 'moment'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import cookie from 'react-cookies'
const dateFormat = 'YYYY/MM/DD'

const MyInfo = () => {
    const [infoState, setInfoState] = useState(0)
    const [headPicPath, setHeadPicPath] = useState()
    const [penName, setPenName] = useState()
    const [personalizedSig, setPersonalizedSig] = useState()
    const [sex, setSex] = useState()
    const [birth, setBirth] = useState()
    const [grade, setGrade] = useState()
    const [rewardPoints, setRewardPoints] = useState()
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [tempBirth, setTempBirth] = useState(null)
    const [loading, setLoading] = useState(false)
    const [oPenName, setOPenName] = useState()
    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    )

    useEffect(() => {
        getMyInfo()
        setInfoState(0)
    }, [infoState])

    function getMyInfo() {
        axios({
            method: "get",
            url: servicePath.getWorkUser + cookie.load("user"),
            withCredentials: true
        }).then(res => {
            if (res.data.code == 200) {
                console.log("个人信息",res.data.data)
                setHeadPicPath(res.data.data.normaluser.headPicPath)
                setGrade(res.data.data.grade)
                setRewardPoints(res.data.data.normaluser.rewardPoints)
                setUserName(res.data.data.normaluser.userName)
                setPenName(res.data.data.normaluser.penName)
                setOPenName(res.data.data.normaluser.penName)
                setPersonalizedSig(res.data.data.normaluser.personalizedSig)
                setSex(res.data.data.normaluser.sex)
                setBirth((new Date(res.data.data.normaluser.birth)).toLocaleDateString())
                setTempBirth(res.data.data.normaluser.birth)
                console.log(3, (new Date(birth)).toLocaleDateString())
            } else {
                message.error("出现未知错误！")
            }
        })
    }

    function onChange(date, dateString) {
        setBirth(dateString)
        setTempBirth(dateString)
        console.log(date, dateString);
    }

    const handleChange = info => {//上传中，完成，失败都会调用这个函数，即执行三次
        // if (info.file.status === 'uploading') {
        //     setLoading(true)
        //     return;
        // }
        // if (info.file.status === 'done') {//只调用一次
        console.log(1, headPicPath)
        getBase64(info.file.originFileObj, headPicPath =>
            setHeadPicPath(headPicPath),
            // setLoading(false)
        )
        const dataProps = {
            headPicPath: headPicPath,
            userName: userName
        }
        console.log(2, headPicPath)
        axios({
            method: "put",
            url: servicePath.updateMyAvatar,
            data: dataProps,
            withCredentials: true,
            headers: { "token": cookie.load("token") }
        }).then(
            res => {
                if (res.data.code == 200) {
                    // message.success("头像修改成功！")
                } else {
                    setHeadPicPath(res.data.data.headPicPath)//改回原来的
                    message.error("修改失败，出现未知错误！")
                }
            }
        )
        // }
    }

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('请上传jpg或png格式的图片!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小不能超过2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function saveBaseModify() {
        const dataProps = {
            penName: penName,
            personalizedSig: personalizedSig,
            sex: sex,
            birth: tempBirth,
            userName: userName
        }
        axios({
            method: "put",
            url: servicePath.updateMyInfo,
            data: dataProps,
            withCredentials: true,
            headers: { "token": cookie.load("token") }
        }).then(res => {
            if (res.data.code == 200) {
                message.success("修改成功！")
                setPenName(res.data.data.penName)
                setOPenName(res.data.data.penName)
                setSex(res.data.data.sex)
                setPersonalizedSig(res.data.data.personalizedSig)
                setBirth((new Date(res.data.data.birth)).toLocaleDateString())
                setTempBirth(res.data.data.birth)
            }
        })
    }

    return (
        <div>
            <div className="myinfo-avatar-div">
                <div title="点击修改头像">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        <Avatar src={headPicPath} size={100} shape="square" />
                    </Upload>
                </div>
                <div className="myinfo-avatar-div-name">
                    <h2>{oPenName}</h2>
                    <Tag className="myinfo-avatar-div-tag" color="#cd201f">{grade}</Tag>
                </div>
            </div>
            <Divider style={{ marginBottom: "1.5rem" }} orientation="left">基本信息</Divider>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>用户笔名</div>
                <Input onChange={(e) => { setPenName(e.target.value) }} placeholder="未填写" value={penName} style={{ color: "black", width: "30.5rem", height: "2.2rem" }} />
            </div>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>个性签名</div>
                <Input onChange={(e) => { setPersonalizedSig(e.target.value) }} placeholder="这个家伙很懒，什么也没有留下..." value={personalizedSig} style={{ color: "black", width: "30.5rem", height: "2.2rem" }} />
            </div>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</div>
                <Radio.Group value={sex} onChange={(e) => { setSex(e.target.value) }}>
                    <Radio.Button value={1}>男</Radio.Button>
                    <Radio.Button value={0}>女</Radio.Button>
                    <Radio.Button value={2}>保密</Radio.Button>
                </Radio.Group>
                <div style={{ width: "7rem", marginLeft: "2.9rem" }}>生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</div>
                <DatePicker value={tempBirth == null ? null : moment(birth, dateFormat)} onChange={onChange} />
            </div>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>等&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级</div>
                <div style={{ color: "black" }}>{grade}</div>
            </div>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>积&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分</div>
                <div style={{ color: "black" }}>{rewardPoints}</div>
            </div>
            <div style={{ float: "right" }}>
                {/* <Button style={{ marginRight: "1rem" }}>放弃修改</Button> */}
                <Button type="primary" onClick={saveBaseModify}>保存修改</Button>
            </div>

            <Divider style={{ marginBottom: "1.5rem" }} orientation="left">账号信息</Divider>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>用&nbsp;&nbsp;户&nbsp;&nbsp;名</div>
                <Input placeholder="未填写" disabled value={userName} style={{ color: "black", width: "30.5rem", height: "2.2rem" }} />
            </div>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</div>
                <Input disabled placeholder="未填写" type="password" value="123456" style={{ color: "black", width: "30.5rem", height: "2.2rem" }} />
            </div>
            <div style={{ float: "right", marginBottom: "0.5rem" }}>
                <Button type="primary">修改密码</Button>
            </div>
        </div>
    )
}

export default MyInfo
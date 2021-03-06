import { Row,Col,Divider,Button } from 'antd'
import Editor from '../components/Editor'
import Header from '../components/Header'
import Head from 'next/head'
import Author from '../components/Author'
export default function CreateWork(){
    return (
        <div>
            <Head>
                <title>夜雨时创作作品</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={16}>  
                    <Editor/>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={5} lg={5} xl={5}>
                <Author/>
                    <div className="author-div comm-box extra">
                        <Button type="primary" icon="profile">个人主页</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
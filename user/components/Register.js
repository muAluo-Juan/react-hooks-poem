import React from 'react'
import { Button, Modal, Input, Form, message } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="手机号注册"
                    okText="注册"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="手机号">
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '手机号不能为空!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="笔名">
                            {getFieldDecorator('penName', {
                                rules: [{ required: true, message: '爱诗的人都有笔名!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="密码">
                            {getFieldDecorator('pwd', {
                                rules: [{ required: true, message: '密码不能为空!' }],
                            })(<Input type="password" />)}
                        </Form.Item>
                        <Form.Item label="确认密码">
                            {getFieldDecorator('confirmPwd', {
                                rules: [{ required: true, message: '请输入确认密码!' }],
                            })(<Input type="password" />)}
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
    }
)

class Register extends React.Component {
    state = {
        visible: false,
        registerDisplay: this.props.registerDisplay
    }

    // constructor(){

    // }

    //注册
    register = (values,form)=>{
        console.log('注册信息：', values);
        let dataProps = {
            'userName': values.userName,
            'penName': values.penName,
            'password': values.pwd,
            'confirmPassword': values.confirmPwd
        }
        axios({
            method: 'post',
            url: servicePath.checkRegister,
            data: dataProps,
            withCredentials: true
        }).then(
            res=>{
                if(res.data.code == 200){
                    message.success(res.data.message)
                    form.resetFields()
                    this.setState({ visible: false })
                }else{
                    message.warn(res.data.message)
                    form.resetFields('pwd')
                    form.resetFields('confirmPwd')
                }
            }
        )
    }

    showModal = () => {
        this.setState({ visible: true })
    }

    handleCancel = () => {
        this.setState({ visible: false })
    }

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) { //基本格式无误
                return;
            }
            this.register(values,form)
        })
    }

    saveFormRef = formRef => {
        this.formRef = formRef
    }
    render() {
        return (
            <div>
                <Button type="danger" onClick={this.showModal} style={{ display:this.props.registerDisplay,marginLeft: "0.5rem" }}>注册</Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                
            </div>
        )
    }
}

export default Register

import { ReactComponent as SwitchIcon }  from './switch.svg';
import { Nav, Col, Row, Button, Space, TextArea, Divider, Icon,Spin } from '@douyinfe/semi-ui';
import {  IconCopy, IconUser, IconUserGroup, IconSetting, IconEdit, IconLanguage } from '@douyinfe/semi-icons';
import React, { useState } from 'react';
import { motion } from "framer-motion";
var debounce = require('lodash.debounce');
export const Mobile = (props) => {
    const [mode, setMode] = useState(props.mode||'胡翻中');
    const 选择模式=(val)=>{
        setMode(val)
        props.getMode(val)
    }
    return (
        <>
            <Row>
                <Col span={24} style={{ padding: 12 }}>
                    <Row type="flex" justify="space-around">
                        <Button theme="borderless">{mode=='中翻胡'?'中文':'胡语'}</Button>
                        <motion.div onClick={()=>选择模式(mode=='中翻胡'?'胡翻中':'中翻胡')} animate={{ rotate:mode=='胡翻中'?0:180 }}>
                            <Button style={{ width: 48 }} icon={<Icon svg={<SwitchIcon />} />} theme='solid'></Button>
                        </motion.div>
                        
                        <Button theme="borderless">{mode=='中翻胡'?'胡语':'中文'}</Button>
                    </Row>
                    <Divider margin='12px' />
                    <TextArea onChange={debounce(props.getSource,1000)} rows={10} showClear maxCount={10000} />
                </Col>
                <Col className='bg-grey-0' span={24} style={{ padding: 12 }}>
                    <Spin tip="翻译中" spinning={!props.dest}>
                        <TextArea value={props.dest} readonly className='bg-grey-0' rows={10} />
                    </Spin>
                        
                    <Button disabled={props.dest==" "} loading={props.复制中} onClick={props.复制译文} size='small' theme="borderless" style={{ width: 36,height:36, position: 'absolute', right: 12, bottom: 12, marginLeft: -24 }} icon={<IconCopy />}></Button>
                </Col>
                
                
            </Row>
        </>
    );
}

export default Mobile;
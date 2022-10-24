
import { ReactComponent as SwitchIcon }  from './switch.svg';
import { Nav, Col, Row, Button, Space, TextArea, Divider, Icon } from '@douyinfe/semi-ui';
import {  IconCopy, IconUser, IconUserGroup, IconSetting, IconEdit, IconLanguage } from '@douyinfe/semi-icons';
import React, { useState } from 'react';
import { motion } from "framer-motion";
export const Mobile = (props) => {
    const [mode, setMode] = useState(props.mode||'胡翻中');
    const [rotate, setRotate] = useState(0);
    return (
        <>
            <Row>
                <Col span={24} style={{ padding: 24 }}>
                    <Row type="flex" justify="space-around">
                        <Button theme="borderless">{mode=='中翻胡'?'中文':'胡语'}</Button>
                        <motion.div onClick={()=>setMode(mode=='中翻胡'?'胡翻中':'中翻胡')} animate={{ rotate:mode=='中翻胡'?0:180 }}>
                            <Button style={{ width: 48 }} icon={<Icon svg={<SwitchIcon />} />} theme='solid'></Button>
                        </motion.div>
                        
                        <Button theme="borderless">{mode=='中翻胡'?'胡语':'中文'}</Button>
                    </Row>
                    <Divider margin='12px' />
                    <TextArea rows={10} showClear maxCount={10000} />
                </Col>
                <Col className='bg-grey-0' span={24} style={{ padding: 24 }}>
                    <TextArea readonly className='bg-grey-0' rows={10} />
                    <Button size='small' theme="borderless" style={{ width: 36, position: 'absolute', right: 18, top: 24, marginLeft: -24 }} icon={<IconCopy />}></Button>
                </Col>
            </Row>
        </>
    );
}

export default Mobile;
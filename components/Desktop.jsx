
import { ReactComponent as SwitchIcon }  from './switch.svg';
import { Nav, Col, Row, Button, Space, TextArea, Divider, Icon } from '@douyinfe/semi-ui';
import {  IconCopy, IconUser, IconUserGroup, IconSetting, IconEdit, IconLanguage } from '@douyinfe/semi-icons';
export const Desktop = (props) => {

    return (
        <>
            <Row>
                <Col span={12} style={{ padding: 24 }}>
                    <Space>
                        <Button theme='solid'>检测语言</Button>
                        <Button theme="borderless">中文</Button>
                        <Button theme="borderless">胡语</Button>
                    </Space>
                    <Divider margin='12px' />
                    <TextArea rows={10} showClear maxCount={10000} />
                </Col>
                <Col className='bg-grey-0' span={12} style={{ padding: 24 }}>
                    <Space>
                        <Button theme='solid'>检测语言</Button>
                        <Button theme="borderless">中文</Button>
                        <Button theme="borderless">胡语</Button>
                    </Space>
                    <Divider margin='12px' />
                    <TextArea readonly className='bg-grey-0' rows={10} />
                    <Button size='small' theme="borderless" style={{ width: 36, position: 'absolute', right: 18, top: 96, marginLeft: -24 }} icon={<IconCopy />}></Button>
                </Col>
                <Button style={{ width: 48, position: 'absolute', left: '50%', bottom: 72, marginLeft: -24 }} icon={<Icon svg={<SwitchIcon />} />} theme='solid'></Button>
            </Row>
        </>
    );
}

export default Desktop;
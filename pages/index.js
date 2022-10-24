import useSWR from 'swr';
import { Nav, Avatar, Dropdown } from '@douyinfe/semi-ui';
import { IconStar, IconUser, IconUserGroup, IconSetting, IconEdit } from '@douyinfe/semi-icons';

const fetcher = (url) => fetch(url).then((res) => res.json());

// Learn more about using SWR to fetch data from
// your API routes -> https://swr.vercel.app/
// This is a placeholder ID, you could swap out with real data
export default function App() {
  const { data, error } = useSWR(
    '/api/item?id=4t8w0jt90wj4yt09w4jy',
    fetcher
  );

  if (error) return 'An error has occurred.';
  if (!data) return 'Loading...';
  // return <code><Button>主要按钮</Button>{JSON.stringify(data, null, 2)}</code>;
  return (
    <div style={{ width: '100%' }}>
      <Nav
        mode={'horizontal'}
        items={[
          { itemKey: 'user', text: '用户管理', icon: <IconUser /> },
          { itemKey: 'union', text: '活动管理', icon: <IconStar /> },
          {
            itemKey: 'approve-management',
            text: '审批管理',
            icon: <IconEdit />,
            items: [
              '入驻审核',
              {
                itemKey: 'operation-management',
                text: '运营管理',
                items: [
                  '人员管理',
                  '人员变更'
                ]
              }
            ]
          },
          {
            text: '任务平台',
            icon: <IconSetting />,
            itemKey: 'job',
            items: ['任务管理', '用户任务查询'],
          },
        ]}
        onSelect={key => console.log(key)}
        header={{
          logo: <img src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/webcast_logo.svg" />,
          text: 'Semi 运营后台'
        }}
        footer={
          <Dropdown
            position="bottomRight"
            render={
              <Dropdown.Menu>
                <Dropdown.Item>详情</Dropdown.Item>
                <Dropdown.Item>退出</Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            <Avatar size="small" color='light-blue' style={{ margin: 4 }}>BD</Avatar>
            <span>Bytedancer</span>
          </Dropdown>
        }
      />
    </div>
  )
}

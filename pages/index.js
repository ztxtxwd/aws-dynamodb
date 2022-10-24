import useSWR from 'swr';
import Desktop from '../components/Desktop'
import Mobile from '../components/Mobile'
import { Nav } from '@douyinfe/semi-ui';
import { IconLanguage } from '@douyinfe/semi-icons';
import Head from 'next/head'
const fetcher = (url) => fetch(url).then((res) => res.json());

// Learn more about using SWR to fetch data from
// your API routes -> https://swr.vercel.app/
// This is a placeholder ID, you could swap out with real data
export default function App(props) {
  const { data, error } = useSWR(
    '/api/item?id=4t8w0jt90wj4yt09w4jy',
    fetcher
  );

  if (error) return 'An error has occurred.';
  if (!data) return 'Loading...';
  // return <code><Button>主要按钮</Button>{JSON.stringify(data, null, 2)}</code>;
  return (
    <>
      <Head>
        <title>胡言乱语</title>
        <link rel="icon" href="/logo.svg"></link>
      </Head>
      <div style={{ width: '100%' }}>
        <Nav
          mode={'horizontal'}
          items={[
            { itemKey: 'translate', text: '翻译', icon: <IconLanguage /> },
            { itemKey: 'about', text: '关于' },
          ]}
          onSelect={key => console.log(key)}
          header={{
            logo: <img src="/logo.svg" />
          }}
        />
        {!props.isMobile ? <Mobile /> : <Desktop />}

      </div>
    </>

  )
}
export const getServerSideProps = async (context) => {
  const headers = context.req.headers;
  const browser = headers['user-agent'];
  const isMobile = browser.indexOf("Mobile") != -1
  return {
    props: {
      browser,
      isMobile
    }
  };
};

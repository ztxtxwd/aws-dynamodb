import useSWR from 'swr';
import Desktop from '../components/Desktop'
import Mobile from '../components/Mobile'
import { Nav, Toast } from '@douyinfe/semi-ui';
import { IconLanguage } from '@douyinfe/semi-icons';
import Head from 'next/head'
import React, { useState } from 'react';
import copy from 'copy-to-clipboard';
const md5 = require('md5');
const fetcher = (url,method,body) => fetch(url,{method:method||'GET',headers: {
  'Content-Type': 'application/json'
  // 'Content-Type': 'application/x-www-form-urlencoded',
},body:JSON.stringify(body)}).then((res) => res.json()).catch((err) => {});

// Learn more about using SWR to fetch data from
// your API routes -> https://swr.vercel.app/
// This is a placeholder ID, you could swap out with real data
export default function App(props) {
  // const { data, error } = useSWR(
  //   '/api/item?id=4t8w0jt90wj4yt09w4jy',
  //   fetcher
  // );
  const [复制中,set复制中]=useState(false)
  const [source,setSource]=useState(' ')
  const [dest,setDest]=useState(' ')
  const [mode,setMode]=useState(props.isMobile?'胡翻中':'auto')
  const 复制译文=async (val)=>{
    set复制中(true)
    copy(dest)
    // TODO: 中翻胡的情况：写入dict表
    if(mode=='中翻胡'){
      let id=md5(dest)
      let data=await fetcher(`/api/item?id=${id}`)
      if(data.cn){
        console.log(data)
        setDest(dest+new Date().toLocaleDateString())
      }
      await fetcher(`/api/item`,'PUT',{id,cn:source})
    }
    // 复制到剪贴板
    set复制中(false)
    Toast.success('复制成功')
  }
  const getSource=async (val)=>{
    setSource(val)
    setDest(undefined)
    if(mode=='中翻胡'){
      let d=dest
      if(dest){
        fetcher(`/api/lib`,'PUT',{content:d})
      }
      if(val){
        let data=await fetcher(`/api/lib`)
        if(data){
          setDest(data.S)
        }else{
          Toast.error('服务器打瞌睡了')
          setDest(' ')
          // await fetcher(`/api/item`,'PUT',{cn:'我爱付劲松'})
        }
      }else{
        setDest(' ')
      }
    }else if(mode=='胡翻中'){
      if(val){
        let id=md5(val)
        let data=await fetcher(`/api/item?id=${id}`)
        if(data.S){
          setDest(data.S)
        }else{
          let opts = {
            content: '您说的好像不是胡话',
            duration: 2
          };
          Toast.warning(opts)
          setDest(' ')
          // await fetcher(`/api/item`,'PUT',{cn:'我爱付劲松'})
        }
      }else{
        setDest(' ')
      }
      
    }else{

    }
    
    
  }
  // if (error) return 'An error has occurred.';
  // if (!data) return 'Loading...';
  // return <code><Button>主要按钮</Button>{JSON.stringify(data, null, 2)}</code>;
  return (
    <>
      <Head>
        <meta content="yes" name="apple-mobile-web-app-capable"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
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
        {props.isMobile ? <Mobile 复制中={复制中} 复制译文={复制译文} mode={mode} getMode={setMode} getSource={getSource} dest={dest} /> : <Desktop />}
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

import useSWR from 'swr';

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
  return <code>{JSON.stringify(data, null, 2)}</code>;
}

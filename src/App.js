import { Button, Card, Input, Layout, List } from 'antd';
import './App.css';
import { useState } from 'react';
import { getContractNFTs } from './utils';
import NftCard from "./components/NftCard";

const { Header, Content } = Layout;

function App() {
  const [nfts, setNfts] = useState([]); // [nft1, nft2, nft3, ...]
  const [loading, setLoading] = useState(false); // true or false
  const [searchText, setSearchText] = useState('');

const handleSearch = async () => { // handle search button click
  if (!searchText) {
    return;
  }

  setLoading(true);

  try { // try to get NFTs from the contract
    const data = await getContractNFTs(searchText); // { result: [nft1, nft2, nft3, ...] }
    setNfts(data.result); 
  } catch (error) {
    console.error(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <Layout style={{ height:'100vh' }}>
      <Header>
        <div style={{ fontSize: 20, fontWeight: 600, color: 'white' }}>
          NFT Explorer
        </div>
      </Header>
      <Content 
        style={{ height: 'calc(100vh - 64px)', padding: 20, overflowY: 'auto'}}
      >
        <Input.Group compact>
          <Input 
            style={{ width:500 }}
            placeholder="Enter NFT contract address"
            value={searchText}
            onChange={ (e) => setSearchText(e.target.value)}
          />
          <Button type="primary" onClick={handleSearch}>
          Search
          </Button>
        </Input.Group>
        <List 
          style={{ 
            marginTop: 20,
            // backgroundColor: 'white',
            height: 'calc(100% - 52px)',
            overflow: 'auto'
          }}
          grid={{ 
            gutter: 16,
            xs: 1,
            sm: 3,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={nfts}
          renderItem={(nft) => {
            return <NftCard nft={nft} />;
          }}
        />
      </Content>
    </Layout>
  );
}

export default App;
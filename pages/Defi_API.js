import { useEffect, useState } from 'react'

// const [session, setSession] = useState();
const Defi = ({ posts }) => {
        
    return <div>account: {posts.result[0].account}</div>
  }
  
//   此函数在构建时被调用
  export async function getStaticProps() {
    
    // var service = new EtherscanParse.TrasactionAgent(YOUR_TOKEN);

    // var info = service.GetTrasactionInfo(TXID);
    // Console.WriteLine("Gas Limit:" + Convert.ToInt32(info.result.gas, 16).ToString());
    // Console.WriteLine("Gas Price:" + ((decimal)(Int64).Parse(info.result.gasPrice.Replace("0x", ""), NumberStyles.AllowHexSpecifier) / 1000000000000000000).ToString(""));
    
    // Console.WriteLine("From:"+info.result.from);
    // Console.WriteLine("To:" + info.result.to);

    // Console.WriteLine("hash(TXID):" + info.result.hash);
    // Console.WriteLine("value:" + ((decimal)(Int64).Parse(info.result.value.Replace("0x", ""), NumberStyles.AllowHexSpecifier) / 1000000000000000000).ToString(""));
    // Console.WriteLine("blockHash:" + info.result.blockHash);
    // Console.WriteLine("blockNumber:" + Convert.ToInt32(info.result.blockNumber, 16).ToString());
    // 调用外部 API 获取内容
    const res = await fetch('https://api.etherscan.io/api?module=account&action=balancemulti&address=0xabc,0x63..,0x198..&tag=latest&apikey=YourApiKeyToken')

    const posts = await res.json()
    console.log(posts.result[0].account)
    
    // useEffect(() => {
    //     setSession(posts);
    // }, []);
    // 在构建时将接收到 `posts` 参数
    return {
      props: {
        posts,
      },
    }
  }
//   export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`https://api.etherscan.io/api?module=account&action=balancemulti&address=0xabc,0x63..,0x198..&tag=latest&apikey=YourApiKeyToken`)
//     const posts = await res.json()
  
//     // Pass data to the page via props
//     return { props: { posts } }
//   }
  

  export default Defi
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Link from 'next/link'
import Music from './music'

import {
  nftmarketaddress, nftaddress
} from '../config'

import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

export default function MyAssets({provider,signer,condition}) {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [chosenone, setchose] = useState([])
  // const [signer, setSigner] = useState<JsonRpcSigner | null>(null)
  // const [address, setAddress] = useState()

  useEffect(() => {
    loadNFTs()
  }, [])
  async function compareprice(a, b) {
    return a.price > b.price;
  }
  async function loadNFTs() {
  //   const web3Modal = new Web3Modal({
  //     network: "mainnet",
  //     cacheProvider: true,
  //   })
    // const connection = await web3Modal.connect()
    // const provider = new ethers.providers.Web3Provider(connection)
    // const signer = provider.getSigner()
    
    // setAddress(await signer.getAddress())
    //
    // if(signer !== null){
      const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
      const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
      const data = await marketContract.fetchMyNFTs()
      
      const items = await Promise.all(data.map(async i => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          music: meta.data.music,
        }
        return item
      }))
      items.sort(compareprice)
      setNfts(items)
      setLoadingState('loaded') 
    // }
      const choseItems = items.filter(i => i.music)
      setchose(choseItems)
  }

  if (loadingState === 'loaded' && !nfts.length && condition !== "music") return (

  <div>
    <h1 className="py-10 px-20 text-3xl">No assets owned</h1>
  </div>
  )
  if (loadingState === 'loaded' && !chosenone.length && condition === "music")
  {
    return (<h1 className="py-10 px-20 text-3xl">No music assets</h1>)
  }
  if(loadingState === 'loaded' && chosenone.length && condition === "music")
  {
    return (
    <div className="px-4">
        <div>
          <h2 className="text-2xl py-2">music</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {
              chosenone.map((nft, i) => (
                <div key={i} className="border shadow rounded-xl overflow-hidden">
                  <img src={nft.image} className="rounded" />
                  <Music musicsrc={nft.music}/>
                  <div className="p-4 bg-black">
                    <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
    </div>
    )
  }
  return (
    <div className="flex justify-center">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} className="rounded" />
                <Music musicsrc={nft.music}/>
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
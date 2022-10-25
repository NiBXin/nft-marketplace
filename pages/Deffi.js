const Deffi = ({ posts }) => {
        
    return <div>account: {posts}</div>
  }
  
//   此函数在构建时被调用
  export async function getStaticProps() {
    
    const res = await fetch('https://api.llama.fi/protocols')

    const posts = await res.json()
    console.log(posts[0].id)

    return {
      props: {
        posts,
      },
    }
  }

  

  export default Deffi
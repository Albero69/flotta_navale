import { useState, useEffect } from 'react'
import './App.css'
import pb from './lib/pb.js'
function App() {
  const [navi, setNavi] = useState([])

   useEffect(()=>{
    const caricaNavi = async () => {
      const records = await pb.collection('navi').getFullList({
    sort: '-created',
})
      setNavi(records);
    };
    caricaNavi();
  }, []);

  return (
    <div>
      <h1>PocketBase Data</h1>
      
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import ListaNavi from './ListaNavi.jsx';
import FormNave from './FormNave.jsx';
import NaviTreemap from './NaviTreemap';
import pb from './lib/pb.js'
import './App.css'

function App() {
  const [navi, setNavi] = useState([])
  const [loading, setLoading] = useState(true)


  const caricaNavi = async () => {
    try {
      setLoading(true)
      const records = await pb.collection('Navi').getFullList({
        sort: '-created',
      })
      setNavi(records)
    } catch (err) {
      console.error('Errore nel caricamento:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    caricaNavi()
  }, [])

  const aggiungiNave = async (naveInput) => {
    try {
      console.log("Nave", naveInput)
      const naveCreata = await pb.collection("Navi").create(naveInput)
      setNavi((prevNavi) => [...prevNavi, naveCreata])
    } catch (err) {
      console.error('Errore nell\'aggiunta:', err)
      await caricaNavi()
    }
  }

  const eliminaNave = async (id) => {
    try {
      await pb.collection("Navi").delete(id)
      setNavi(navi => navi.filter(nave => nave.id !== id))
    } catch (err) {
      if (err.name !== 'AbortError' && !err.message?.includes('autocancelled')) {
        console.error('Errore nell\'eliminazione:', err)
      }
      await caricaNavi()
    }
  }

  const resetNavi = async () => {
    try {
      await Promise.all(navi.map((nave) => pb.collection("Navi").delete(nave.id)))
      setNavi([])
    } catch (err) {
      if (err.name !== 'AbortError' && !err.message?.includes('autocancelled')) {
        console.error('Errore nel reset:', err)
      }
      await caricaNavi()
    }
  }

  if (loading) {
    return <div className="loading">Caricamento...</div>
  }

  return (
    <div className="app">
      <h1>Gestione Navi</h1>
      <FormNave aggiungiNave={aggiungiNave} />
      <NaviTreemap navi={navi} />
      <ListaNavi navi={navi} eliminaNave={eliminaNave} resetNavi={resetNavi} />
    </div>
  )
}

export default App
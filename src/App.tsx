import { useEffect } from 'react'
import { Cv } from './components/Cv'
import { loadCv } from './loadCv'
import { useTheme } from './hooks/useTheme'

const cvData = loadCv()

function App() {
  const { toggleTheme } = useTheme()

  useEffect(() => {
    document.title = `${cvData.profile.name} — CV`
  }, [])

  return <Cv data={cvData} onToggleTheme={toggleTheme} />
}

export default App

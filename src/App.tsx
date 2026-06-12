import { Cv } from './components/Cv'
import { loadCv } from './loadCv'
import { siteConfig } from './loadSite'
import { useTheme } from './hooks/useTheme'

const cvData = loadCv()

function App() {
  const { toggleTheme } = useTheme(siteConfig.mode)

  return <Cv data={cvData} onToggleTheme={toggleTheme} />
}

export default App

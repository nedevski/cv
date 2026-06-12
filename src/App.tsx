import { Cv } from './components/Cv'
import { cvData } from './loadCv'
import { useTheme } from './hooks/useTheme'

function App() {
  const { toggleTheme } = useTheme(cvData.general.mode)

  return <Cv data={cvData} onToggleTheme={toggleTheme} />
}

export default App

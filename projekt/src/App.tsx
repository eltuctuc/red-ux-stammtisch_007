import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import './index.css'

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f1117] text-gray-900 dark:text-gray-100 transition-colors">
        <Header />
        <main className="p-6">
          {/* Features FEAT-2 bis FEAT-5 werden hier eingebaut */}
        </main>
      </div>
    </ThemeProvider>
  )
}

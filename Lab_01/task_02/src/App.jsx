import {UserProvider} from './components/UserProvider.jsx'
import Dashboard from './components/Dahboard.jsx'

function App() {


  return (
    <UserProvider>
      <div className="App">
        <Dashboard />
      </div>
    </UserProvider>
  )
}

export default App;

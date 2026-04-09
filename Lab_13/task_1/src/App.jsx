import { ThemeProvider } from './context/ThemeContext.jsx';
import { ThemedButton } from './components/ThemedComponents.jsx';

function App() {
  return (
    <ThemeProvider>
      <ThemedButton onClick={() => console.log("Click!")}>
        Нажми меня
      </ThemedButton>
    </ThemeProvider>
  );
}

export default App;
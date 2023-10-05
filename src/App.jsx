import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterMain from './components/RegisterMain'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RegisterMain/>
    </>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './Components/Home';
import Quiz from './Components/Quiz';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

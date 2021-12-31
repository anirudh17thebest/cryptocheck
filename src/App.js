import Home from "./component/home/Home";
import Card from "./component/card/Card";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<Card />} />
      </Routes>
    </Router>
  );
};

export default App;

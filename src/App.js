import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoList from "./features/PhotoList";
import PhotoDetails from "./features/PhotoDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<PhotoList />} />
        <Route path="/photos/:id" element={<PhotoDetails />} />
      </Routes>
    </Router>
  );
}

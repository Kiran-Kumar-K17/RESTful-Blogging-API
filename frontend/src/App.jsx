import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <Router>
      <Routes>
        {/* Everything inside this Route will have the Navbar and Footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<CreatePost />} />
          {/* We can add a "Post Details" route here later */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

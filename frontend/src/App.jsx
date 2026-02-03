import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <Router>
      <Routes>
        {/* Everything inside this Route will have the Navbar and Footer */}
        <Route path="/" element={<MainLayout />}>
          <Route path="post/:id" element={<PostDetails />} />
          <Route index element={<Home />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

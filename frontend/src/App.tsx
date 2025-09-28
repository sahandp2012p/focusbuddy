// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <Navbar />

      {/* Add top margin so content isn’t flush with the top */}
      <Box sx={{ mt: 4, px: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;

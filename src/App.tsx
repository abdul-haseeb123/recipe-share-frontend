import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import CreateRecipe from "@/pages/CreateRecipe";
import Login from "@/pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <CreateRecipe />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

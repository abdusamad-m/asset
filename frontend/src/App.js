import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";

import ProtectedRoute from "./compnents/ProtectedRoute";
import Assets from "./pages/Assets";
import Dashboard from "./pages/Dashboard";
import AddAsset from "./pages/AddAsset";
import Inventory from "./pages/Inventory";
import AddInventory from "./pages/AddInventory";
import Assignment from "./pages/Assignment";
import AddAssignment from "./pages/AddAssignment";
import Tickets from "./pages/Tickets";
import AddTicket from "./pages/AddTicket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/asset"
          element={
            <ProtectedRoute>
              <Assets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-asset"
          element={
            <ProtectedRoute>
              <AddAsset />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-inventory"
          element={
            <ProtectedRoute>
              <AddInventory />
            </ProtectedRoute>
          }
        />
        <Route path="/assignments" element={<Assignment />} />
        <Route path="/add-assignment" element={<AddAssignment />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/add-ticket" element={<AddTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

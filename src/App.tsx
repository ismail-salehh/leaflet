import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import PlantsListPage from "./pages/PlantsListPage";
import PlantFormPage from "./pages/PlantFormPage";
import "./App.css";

// Each screen now has its own URL:
//   /                      -> list of plants
//   /plants/new            -> add a plant
//   /plants/:plantId/edit  -> edit one plant (":plantId" is a URL parameter)

// Reads :plantId from the URL and hands it to the form.
// key={plantId}: a different key = a brand new component with fresh state.
function EditPlantRoute() {
  const { plantId } = useParams();
  return <PlantFormPage key={plantId} plantId={plantId} />;
}

function App() {
  const { pathname } = useLocation();

  // Start each new screen at the top of the page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<PlantsListPage />} />
        <Route path="/plants/new" element={<PlantFormPage />} />
        <Route path="/plants/:plantId/edit" element={<EditPlantRoute />} />
        {/* Unknown URL: send the user back to the list */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

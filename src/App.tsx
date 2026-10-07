import { useEffect, useState } from "react";
import PlantsListPage from "./pages/PlantsListPage";
import PlantFormPage from "./pages/PlantFormPage";

// Which screen is showing. No router library: just a piece of state.
// The "edit" screen also needs to know WHICH plant.
type Screen = { name: "list" } | { name: "add" } | { name: "edit"; plantId: string };

function App() {
  const [screen, setScreen] = useState<Screen>({ name: "list" });

  // Start each new screen at the top of the page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  const goToList = () => setScreen({ name: "list" });

  return (
    <div className="app">
      {screen.name === "list" && (
        <PlantsListPage
          onAddPlant={() => setScreen({ name: "add" })}
          onEditPlant={(plantId) => setScreen({ name: "edit", plantId })}
        />
      )}

      {screen.name === "add" && <PlantFormPage onDone={goToList} />}

      {/* key={plantId}: a different key = a brand new component with fresh state */}
      {screen.name === "edit" && (
        <PlantFormPage key={screen.plantId} plantId={screen.plantId} onDone={goToList} />
      )}
    </div>
  );
}

export default App;

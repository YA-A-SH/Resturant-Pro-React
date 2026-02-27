import { ModeProvider } from "@else/Components/Context/MainContext";
import "./App.css";

// ************** Components ****************

import ProviderComp from "@else/Components/Provider/providerComp";

function App() {
  return (
    <>
      <ModeProvider>
        <ProviderComp />
      </ModeProvider>
    </>
  );
}

export default App;

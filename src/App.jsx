// ************** Contexts ****************

import {
  ChefsProvider,
  FavProvider,
  IsAdminProvider,
  OpenSnackbarProvider,
  ShowCartProvider,
} from "./Project/User/Context/MainContext";

// ************** Components ****************

import ContApp from "./Project/Else/ContApp";
import Theme from "./Project/Else/Components/Theme";

// ************* React **********************

import { useState } from "react";

function App() {
  const [mode, setMode] = useState("light");

  return (
    <>
      <Theme mode={mode}>
        <IsAdminProvider>
          <ChefsProvider>
            <FavProvider>
              <ShowCartProvider>
                <OpenSnackbarProvider>
                  <ContApp mode={mode} setMode={setMode} />
                </OpenSnackbarProvider>
              </ShowCartProvider>
            </FavProvider>
          </ChefsProvider>
        </IsAdminProvider>
      </Theme>
    </>
  );
}

export default App;

// ************* React **********************
import { lazy, Suspense, useState } from "react";

// ************** Contexts ****************

import {
  ChefsProvider,
  FavProvider,
  IsAdminProvider,
  OpenSnackbarProvider,
  ShowCartProvider,
} from "./Project/User/Context/MainContext";

// ************** Components ****************

const ContApp = lazy(() => import("./Project/Else/ContApp"));
import Theme from "./Project/Else/Components/Theme";
import Loader from "./Project/Else/Components/Loader";

function App() {
  const [mode, setMode] = useState("light");

  return (
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
}

export default App;

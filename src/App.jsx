// ************** Contexts ****************

import ContAboutUs from "./Project/About_Us/ContAboutAs";
import {
  FavProvider,
  IsAdminContext,
  OpenAlertProvider,
  ShowCartProvider,
  ShowContextProvider,
} from "./Project/Context/MainContext";

// ************** Components ****************

import ContApp from "./Project/Else/ContApp";
import Theme from "./Project/Else/Theme";

// ************* React **********************

import { useState } from "react";

function App() {
  const [mode, setMode] = useState("light");
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <>
      <Theme mode={mode}>
        <IsAdminContext.Provider
          value={{ isAdmin: isAdmin, setIsAdmin: setIsAdmin }}
        >
          <FavProvider>
            <ShowContextProvider>
              <ShowCartProvider>
                <OpenAlertProvider>
                  <ContApp mode={mode} setMode={setMode} />
                </OpenAlertProvider>
              </ShowCartProvider>
            </ShowContextProvider>
          </FavProvider>
        </IsAdminContext.Provider>
      </Theme>
    </>
  );
}

export default App;

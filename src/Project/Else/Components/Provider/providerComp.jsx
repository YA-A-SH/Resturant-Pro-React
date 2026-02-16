import { lazy, Suspense, useContext } from "react";
import {
  ChefsProvider,
  FavProvider,
  IsAdminProvider,
  ModeContext,
  OpenSnackbarProvider,
  ShowCartProvider,
} from "../Context/MainContext";
import Loader from "../Else/Loader";
import Theme from "../Else/Theme";
const ContApp = lazy(() => import("@else/ContApp"));

export default function ProviderComp() {
  const { mode } = useContext(ModeContext);
  return (
    <>
      {" "}
      <Theme mode={mode}>
        <Suspense fallback={<Loader id="user" />}>
          <IsAdminProvider>
            <ChefsProvider>
              <FavProvider>
                <ShowCartProvider>
                  <OpenSnackbarProvider>
                    <ContApp />
                  </OpenSnackbarProvider>
                </ShowCartProvider>
              </FavProvider>
            </ChefsProvider>
          </IsAdminProvider>
        </Suspense>
      </Theme>
    </>
  );
}

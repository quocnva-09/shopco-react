import "@/styles/index.scss";
import { StrictMode } from "react";
import { AppRouter } from "@/routes";
import { AppToaster } from "@/components/organisms/AppToaster";
import { ErrorBoundary } from "@/components/organisms/ErrorBoundary";
import { Provider } from "react-redux";
import store, { persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>
            <AppRouter />
            <AppToaster />
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
}

export default App;

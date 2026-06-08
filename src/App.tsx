import "@/styles/index.scss";
import { StrictMode } from "react";
import { AppRouter } from "@/routes";
import { AppToaster } from "@/components/organisms/AppToaster";
import { ErrorBoundary } from "@/components/organisms/ErrorBoundary";
import { Provider } from "react-redux";
import store from "@/store/store";

function App() {
  return (
    <Provider store={store}>
      <StrictMode>
        <ErrorBoundary>
          <AppRouter />
          <AppToaster />
        </ErrorBoundary>
      </StrictMode>
    </Provider>
  );
}

export default App;

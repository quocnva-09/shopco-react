import "@/styles/index.scss";
import { StrictMode } from "react";
import { AppRouter } from "@/routes";
import { AppToaster } from "@/components/organisms/AppToaster";
import { ErrorBoundary } from "@/components/organisms/ErrorBoundary";

function App() {
  return (
    <StrictMode>
      <ErrorBoundary>
        <AppRouter />
        <AppToaster />
      </ErrorBoundary>
    </StrictMode>
  );
}

export default App;

import "@/styles/index.scss";
import { StrictMode } from "react";
import { AppRouter } from "@/routes";
import { AppToaster } from "@/components/organisms/AppToaster";

function App() {
  return (
    <StrictMode>
      <AppRouter />
      <AppToaster />
    </StrictMode>
  );
}

export default App;

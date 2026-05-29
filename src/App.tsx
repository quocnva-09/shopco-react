import "@/styles/index.scss";
import { StrictMode } from "react";
import { AppRouter } from "@/routes";

function App() {
  return (
    <StrictMode>
      <AppRouter />
    </StrictMode>
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";
import AppBar from "./components/appBar";
import { DialogProvider } from "./components/common/molecules/dialog/DialogContext";
import ContentRouter from "./routes/ContentRouter";

function App() {
  return (
    <BrowserRouter>
      <DialogProvider>
        <AppBar />
        <ContentRouter />
      </DialogProvider>
    </BrowserRouter>
  );
}

export default App;

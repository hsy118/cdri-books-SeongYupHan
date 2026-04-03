import { BrowserRouter } from "react-router-dom";
import AppBar from "./components/appBar";
import ContentRouter from "./routes/ContentRouter";

function App() {
  return (
    <BrowserRouter>
      <AppBar />
      <ContentRouter />
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";
import AppBar from "./components/appBar";
import { DialogProvider } from "./components/common/molecules/dialog/DialogContext";
import useDialog from "./components/common/molecules/dialog/hooks/useDialog";
import ContentRouter from "./routes/ContentRouter";

function DialogTestButton() {
  const { openDialog } = useDialog();
  return (
    <button
      onClick={() => openDialog({ description: "검색 중 오류가 발생했습니다." })}
      style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999, padding: "8px 16px" }}
    >
      다이얼로그 테스트
    </button>
  );
}

function App() {
  return (
    <BrowserRouter>
      <DialogProvider>
        <AppBar />
        <ContentRouter />
        <DialogTestButton />
      </DialogProvider>
    </BrowserRouter>
  );
}

export default App;

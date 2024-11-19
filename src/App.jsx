import AppRouter from "./router";
import { DataProvider } from "./layouts/GlobalContext";

const App = () => {
  return (
    <DataProvider>
      <AppRouter />;
    </DataProvider>
  );
};

export default App;

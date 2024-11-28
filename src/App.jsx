import AppRouter from "./router";
import { AuthProvider } from "./services/authService";
const App = () => {
  return (
    <AuthProvider>
      <AppRouter />;
    </AuthProvider>
  );
};

export default App;

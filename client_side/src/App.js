import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { SnackbarProvider } from "notistack";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Registration from "./pages/Registration";

function App() {
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        classes={{
          content: "custom-snackbar",
        }}
      >
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
        <Footer />
      </SnackbarProvider>
    </>
  );
}

export default App;

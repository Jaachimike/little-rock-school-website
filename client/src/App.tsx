// import PaymentHomepage from "./pages/PaymentHomepage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Homepage from "./pages/Homepage";
import NewPayment from "./pages/NewPayment";
import PaymentHomepage from "./pages/PaymentHomepage";
import OutstandingPayment from "./pages/OutstandingPayment";
import MissionAndVision from "./pages/MissionAndVision";
import History from "./pages/History";
import ManagementTeam from "./pages/ManagementTeam";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/"
          element={
            <MainLayout>
              <Homepage />
            </MainLayout>
          }
        />
        <Route
          index
          path="/mission-and-vision"
          element={
            <MainLayout>
              <MissionAndVision />
            </MainLayout>
          }
        />
        {/* <Route
          index
          path="/history"
          element={
            <MainLayout>
              <History />
            </MainLayout>
          }
        /> */}
        <Route
          index
          path="/management-team"
          element={
            <MainLayout>
              <ManagementTeam />
            </MainLayout>
          }
        />
        <Route path="/payment-homepage" element={<PaymentHomepage />} />
        <Route path="/new-payment" element={<NewPayment />} />
        <Route path="/outstanding-payment" element={<OutstandingPayment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

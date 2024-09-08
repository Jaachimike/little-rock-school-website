// import PaymentHomepage from "./pages/PaymentHomepage";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Homepage from "./pages/Homepage";
import NewPayment from "./pages/NewPayment";
import PaymentHomepage from "./pages/PaymentHomepage";
import OutstandingPayment from "./pages/OutstandingPayment";
import MissionAndVision from "./pages/MissionAndVision";
import History from "./pages/History";
import {OutstandingPaymentProvider} from "./contexts/OutstandingPaymentContext";
import ManagementTeam from "./pages/ManagementTeam";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import PaymentSuccess from "./pages/PaymentSuccess";
import OutstandingPaymentConfirmation from "./pages/OutstandingPaymentConfirmation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import {AuthProvider, useAuth} from "./contexts/AuthContext";
import EditParent from "./pages/EditParent";
import BranchSelection from "./pages/BranchSelection";

const ProtectedRoute: React.FC<{children: JSX.Element}> = ({children}) => {
  const {token} = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OutstandingPaymentProvider>
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
            <Route
              path="/payment-confirmation"
              element={<PaymentConfirmation />}
            />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route
              path="/outstanding-payment"
              element={<OutstandingPayment />}
            />
            <Route
              path="/outstanding-payment-confirmation"
              element={<OutstandingPaymentConfirmation />}
            />
            <Route path="/branch-selection" element={<BranchSelection />} />

            {/* admin dashboard routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/edit/:id" element={<EditParent />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </OutstandingPaymentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

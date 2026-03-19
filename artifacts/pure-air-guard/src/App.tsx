import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserTierProvider, useUserTier } from "./context/UserTierContext";
import { BluetoothSensorsProvider } from "./context/BluetoothSensorsContext";
import NotFound from "@/pages/not-found";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Readings from "./pages/Readings";
import Alerts from "./pages/Alerts";
import Inspections from "./pages/Inspections";
import Recommendations from "./pages/Recommendations";
import Bluetooth from "./pages/Bluetooth";
import Compliance from "./pages/Compliance";
import Account from "./pages/Account";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/rooms" component={Rooms} />
      <Route path="/readings" component={Readings} />
      <Route path="/alerts" component={Alerts} />
      <Route path="/inspections" component={Inspections} />
      <Route path="/recommendations" component={Recommendations} />
      <Route path="/bluetooth" component={Bluetooth} />
      <Route path="/compliance" component={Compliance} />
      <Route path="/account" component={Account} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppWithProviders() {
  const { config } = useUserTier();
  return (
    <BluetoothSensorsProvider maxSensors={config.maxSensors}>
      <Router />
    </BluetoothSensorsProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserTierProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AppWithProviders />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </UserTierProvider>
    </QueryClientProvider>
  );
}

export default App;

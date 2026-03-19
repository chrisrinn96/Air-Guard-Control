import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Readings from "./pages/Readings";
import Alerts from "./pages/Alerts";
import Inspections from "./pages/Inspections";
import Recommendations from "./pages/Recommendations";
import Bluetooth from "./pages/Bluetooth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  }
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
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

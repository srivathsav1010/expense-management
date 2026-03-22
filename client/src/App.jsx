import { useState }              from "react";
import { BudgetProvider }         from "@context/BudgetContext";
import { NotificationProvider }   from "@context/NotificationContext";
import { useBudget }              from "@context/BudgetContext";
import { AppShell }               from "@components/layout/AppShell";
import { NotificationStack }      from "@components/layout/NotificationStack";
import { BudgetHeader }           from "@components/budget/BudgetHeader";
import { Spinner, ErrorBanner }   from "@components/ui/index.jsx";
import { DashboardPage }          from "@pages/DashboardPage";
import { ExpensesPage }           from "@pages/ExpensesPage";
import { AnalyticsPage }          from "@pages/AnalyticsPage";

// ─────────────────────────────────────────────────────────────────────────────
// Page registry — add new pages here only
// ─────────────────────────────────────────────────────────────────────────────
const PAGES = {
  dashboard: DashboardPage,
  expenses:  ExpensesPage,
  analytics: AnalyticsPage,
};

// ─────────────────────────────────────────────────────────────────────────────
// Inner router — has access to BudgetContext for loading/error states
// ─────────────────────────────────────────────────────────────────────────────
function AppRouter() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { loading, error }        = useBudget();

  const Page = PAGES[activeTab] ?? PAGES.dashboard;

  const renderContent = () => {
    if (loading) return <Spinner size={48}/>;
    if (error)   return (
      <ErrorBanner
        message={`Failed to connect to server: ${error}`}
        onRetry={() => window.location.reload()}
      />
    );
    return <Page onNavigate={setActiveTab}/>;
  };

  return (
    <>
      <NotificationStack/>
      <AppShell
        activeTab={activeTab}
        onTabChange={setActiveTab}
        headerSlot={!loading && !error ? <BudgetHeader/> : null}
      >
        {renderContent()}
      </AppShell>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root — wraps with providers
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <NotificationProvider>
      <BudgetProvider>
        <AppRouter/>
      </BudgetProvider>
    </NotificationProvider>
  );
}

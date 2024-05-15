import { Routes, Route } from 'react-router-dom';

// components
import NavbarInfo from './components/Navbar';

// layouts
import HomeLayout from './layouts/HomeLayout';
import QuestionsLayout from './layouts/QuestionsLayout';
import AnswersLayout from './layouts/AnswersLayout';
import BudgetPlansLayout from './layouts/BudgetPlansLayout';
import DashboardLayout from './layouts/DashboardLayout';
import GroupsLayout from './layouts/GroupsLayout';
import GroupLayout from './layouts/GroupLayout';
import BudgetGoalsLayout from './layouts/BudgetGoalsLayout';
import IncomeTransactionsLayout from './layouts/IncomeTransactionsLayout';
import ExpenseTransactionsLayout from './layouts/ExpenseTransactionsLayout';
import BudgetMembersLayout from './layouts/BudgetMembersLayout';
import BudgetAssistantsLayout from './layouts/BudgetAssistantsLayout';
import RegistrationLayout from './layouts/RegistrationLayout';
import LogInLayout from './layouts/LogInLayout';
import ErrorLayout from './layouts/ErrorLayout';
import AccountLayout from './layouts/AccountLayout';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  return (
    <>
      <NavbarInfo />
      <Routes>
        <Route exact path="/" element={<HomeLayout />} />
        <Route exact path="sign-up" element={<RegistrationLayout />} />
        <Route exact path="log-in" element={<LogInLayout />} />
        <Route exact path="dashboard" element={<DashboardLayout />} />
        <Route exact path="account" element={<AccountLayout />} />
        <Route exact path="income-transactions" element={<IncomeTransactionsLayout />} />
        <Route exact path="expense-transactions" element={<ExpenseTransactionsLayout />} />
        <Route exact path="questions" element={<QuestionsLayout />} />
        <Route exact path="questions/:id" element={<AnswersLayout />} />
        <Route exact path="budget-members" element={<BudgetMembersLayout />} />
        <Route exact path="budget-assistants" element={<BudgetAssistantsLayout />} />
        <Route exact path="budget-goals" element={<BudgetGoalsLayout />} />
        <Route exact path="budget-plans" element={<BudgetPlansLayout />} />
        <Route exact path="budget-plans/:id" element={<BudgetGoalsLayout />} />
        <Route exact path="groups" element={<GroupsLayout />} />
        <Route exact path="groups/:id" element={<GroupLayout />} />
        <Route path="*" element={<ErrorLayout />} />
      </Routes>
    </>
  );
}

export default App;

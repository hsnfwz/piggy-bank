const path = require('path');
const cors = require('cors');
const express = require('express');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);

// app - pg
const pool = require('./pg');

// app - routes
const saveinnUserRoutes = require('./routes/saveinn_user_routes');
const budgetMemberRoutes = require('./routes/budget_member_routes');
const memberLocationRoutes = require('./routes/member_location_routes');
const budgetAssistantRoutes = require('./routes/budget_assistant_routes');
const assistantLocationRoutes = require('./routes/assistant_location_routes');
const earnIncomeRoutes = require('./routes/earn_income_routes');
const spendExpenseRoutes = require('./routes/spend_expense_routes');
const askQuestionRoutes = require('./routes/ask_question_routes');
const answerRoutes = require('./routes/answer_routes');
const planBudgetPlanRoutes = require('./routes/plan_budget_plan_routes');
const budgetPlanDurationRoutes = require('./routes/budget_plan_duration_routes');
const setBudgetGoalRoutes = require('./routes/set_budget_goal_routes');
const budgetGoalDurationRoutes = require('./routes/budget_goal_duration_routes');
const planHasGoalRoutes = require('./routes/plan_has_goal_routes');
const userGroupRoutes = require('./routes/user_group_routes');
const userBelongsToGroupRoutes = require('./routes/user_belongs_to_group_routes');

// app - server
const app = express();

// app - client
app.use(express.static(path.join(__dirname, '/app/build')));

// app - middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app - session
app.use(expressSession({
  store: new pgSession({ pool, createTableIfMissing: true }),
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 14 * 24 * 60 * 60 * 1000 },
}));

// app - routes (relations)
app.use('/saveinn_user', saveinnUserRoutes);
app.use('/budget_member', budgetMemberRoutes);
app.use('/member_location', memberLocationRoutes);
app.use('/budget_assistant', budgetAssistantRoutes);
app.use('/assistant_location', assistantLocationRoutes);
app.use('/earn_income', earnIncomeRoutes);
app.use('/spend_expense', spendExpenseRoutes);
app.use('/ask_question', askQuestionRoutes);
app.use('/answer', answerRoutes);
app.use('/plan_budget_plan', planBudgetPlanRoutes);
app.use('/budget_plan_duration', budgetPlanDurationRoutes);
app.use('/set_budget_goal', setBudgetGoalRoutes);
app.use('/budget_goal_duration', budgetGoalDurationRoutes);
app.use('/plan_has_goal', planHasGoalRoutes);
app.use('/user_group', userGroupRoutes);
app.use('/user_belongs_to_group', userBelongsToGroupRoutes);

// app - run
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
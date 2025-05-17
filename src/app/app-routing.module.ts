import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { LoginComponent } from './login/login.component';
import { GoalsComponent } from './goals/goals.component';
import { SignComponent } from './sign/sign.component';
import { GoalDetailsComponent } from './goal-details/goal-details.component';
const routes: Routes = [
  {path:'', redirectTo:'dashboard', pathMatch:'full'},
  {path:'dashboard', component: DashboardComponent , data: {title: 'Main Dashboard'}},
  {path:'transactions', component: TransactionsComponent, data: {title: 'Transactions'}},
  {path: 'income', component: IncomeComponent, data: {title: 'Incomes'}},
  {path: 'expense', component:ExpenseComponent, data: {title: 'Expenses'}},
  {path: 'sign Up', component:LoginComponent, data: {title: 'Sign Up'}},
  {path: 'goals', component: GoalsComponent, data: {title: 'Financial Goals'}},
  { path: 'sign In', component: SignComponent, data: { title: 'Sign In' } },
  { path: 'goal-details', component: GoalDetailsComponent , data: { title: 'Goal Details' }  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

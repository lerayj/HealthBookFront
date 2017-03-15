import ReportsPage from './ReportsPage.vue';
import ReportPage from './ReportPage.vue';
import LoginPage from './LoginPage.vue';
import UsersPage from './UsersPage.vue';
import DashboardPage from './DashboardPage.vue';

const routes = [
  { path: '/', component: ReportsPage },
  { path: '/dashboard', component: DashboardPage },
  { path: '/login', component: LoginPage },
  { path: '/admin/users', component: UsersPage },
  { path: '/reports/:website/:date', component: ReportPage},
]

export default routes;
import ReportsPage from './ReportsPage.vue';
import ReportPage from './ReportPage.vue';

const routes = [
  { path: '/', component: ReportsPage },
  { path: '/reports/:website/:date', component: ReportPage}
]

export default routes;
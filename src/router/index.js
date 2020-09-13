
import TradeMenu from '@/activities/TradeMenu';
import Home from '@/activities/Home';
import StepPageNavigator from '@/activities/StepPageNavigator';

/* eslint-disable */
export default [
  {path: '/', component: Home},
  {path: '/trade-menu', component: TradeMenu},
  { path: '/step-page-navigator/:tradeEnName/:tradeCode', component: StepPageNavigator }
  // {path: '*', component: HelloWorld}
];
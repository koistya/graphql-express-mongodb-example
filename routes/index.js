import Layout from '../components/Layout';
import HomePage from './HomePage';
import NotFound from './NotFound';

export default {
  path: '/',
  indexRoute: { component: HomePage },
  component: Layout,
  childRoutes: [
    require('./about').default,
    { path: '*', component: NotFound }
  ]
};

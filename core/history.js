import createHistory from 'history/lib/createBrowserHistory';
import useQueries from 'history/lib/useQueries';

const history = useQueries(createHistory)();

export default history;

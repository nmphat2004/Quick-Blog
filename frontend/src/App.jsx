import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Layout from './pages/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import AddBlog from './pages/admin/AddBlog';
import Comments from './pages/admin/Comments';
import ListBlog from './pages/admin/ListBlog';
import Login from './components/admin/Login';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/blog/:id' element={<Blog />} />
			{/* eslint-disable-next-line no-constant-condition */}
			<Route path='/admin' element={true ? <Layout /> : <Login />}>
				<Route index element={<Dashboard />} />
				<Route path='add_blog' element={<AddBlog />} />
				<Route path='list_blog' element={<ListBlog />} />
				<Route path='comments' element={<Comments />} />
			</Route>
		</Routes>
	);
};

export default App;

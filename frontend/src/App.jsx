import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Layout from './pages/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import AddBlog from './pages/admin/AddBlog';
import BlogList from './components/BlogList';
import Comments from './pages/admin/Comments';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/blog/:id' element={<Blog />} />
			<Route path='/admin' element={<Layout />}>
				<Route index element={<Dashboard />} />
				<Route path='add_blog' element={<AddBlog />} />
				<Route path='blog_list' element={<BlogList />} />
				<Route path='comments' element={<Comments />} />
			</Route>
		</Routes>
	);
};

export default App;

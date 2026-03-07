import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {
	return (
		<div className='bg-white dark:bg-neutral-950 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-70px)] transition-colors duration-300'>
			<NavLink
				end={true}
				to='/admin'
				className={({ isActive }) =>
					`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer dark:text-gray-300 ${isActive && 'bg-primary/10 border-r-4 border-primary'
					}`
				}>
				<img src={assets.home_icon} alt='' className='dark:invert dark:opacity-80' />
				<p>Dashboard</p>
			</NavLink>

			<NavLink
				to='/admin/add_blog'
				className={({ isActive }) =>
					`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer dark:text-gray-300 ${isActive && 'bg-primary/10 border-r-4 border-primary'
					}`
				}>
				<img src={assets.add_icon} alt='' className='dark:invert dark:opacity-80' />
				<p>Add Blog</p>
			</NavLink>

			<NavLink
				to='/admin/list_blog'
				className={({ isActive }) =>
					`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer dark:text-gray-300 ${isActive && 'bg-primary/10 border-r-4 border-primary'
					}`
				}>
				<img src={assets.list_icon} alt='' className='dark:invert dark:opacity-80' />
				<p>List Blog</p>
			</NavLink>

			<NavLink
				to='/admin/comments'
				className={({ isActive }) =>
					`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer dark:text-gray-300 ${isActive && 'bg-primary/10 border-r-4 border-primary'
					}`
				}>
				<img src={assets.comment_icon} alt='' className='dark:invert dark:opacity-80' />
				<p>Comments</p>
			</NavLink>
		</div>
	);
};

export default Sidebar;

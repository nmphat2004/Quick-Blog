import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {
	return (
		<div>
			<NavLink
				end={true}
				to='/admin'
				className={({ isActive }) =>
					`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
						isActive && 'bg-primary/10 border-r-4 border-primary'
					}`
				}>
				<img src={assets.home_icon} alt='' />
				<p>Dashboard</p>
			</NavLink>

			<NavLink
				to='/admin/add_blog'
				className={({ isActive }) =>
					`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
						isActive && 'bg-primary/10 border-r-4 border-primary'
					}`
				}>
				<img src={assets.add_icon} alt='' />
				<p>Add Blog</p>
			</NavLink>

			<NavLink
				to='/admin/list_blog'
				className={({ isActive }) =>
					`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
						isActive && 'bg-primary/10 border-r-4 border-primary'
					}`
				}>
				<img src={assets.list_icon} alt='' />
				<p>List Blog</p>
			</NavLink>

			<NavLink
				to='/admin/comments'
				className={({ isActive }) =>
					`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
						isActive && 'bg-primary/10 border-r-4 border-primary'
					}`
				}>
				<img src={assets.comment_icon} alt='' />
				<p>Comments</p>
			</NavLink>
		</div>
	);
};

export default Sidebar;

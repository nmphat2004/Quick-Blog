import { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

const Dashboard = () => {
	const { axios } = useAppContext();

	const [dashboardData, setDashboardData] = useState({
		blogs: 0,
		comments: 0,
		drafts: 0,
		recentBlogs: [],
	});

	const fetchDashboardData = async () => {
		try {
			const { data } = await axios.get('/api/v1/admin/dashboard');

			data.success ?
				setDashboardData(data.dashboardData)
				: toast.error(data.message);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		fetchDashboardData();
	}, []);

	return (
		<div className='flex-1 p-4 md:p-10 bg-blue-50/50 dark:bg-neutral-950 min-h-screen transition-colors duration-300'>
			{/* Card dashboard */}
			<div className='flex flex-wrap gap-4'>
				<div className='flex items-center gap-4 bg-white dark:bg-neutral-900 border dark:border-gray-800 p-4 min-w-58 rounded shadow-sm hover:shadow dark:shadow-gray-900 cursor-pointer hover:scale-105 transition-all'>
					<img src={assets.dashboard_icon_1} alt='' className='dark:invert dark:opacity-80' />
					<div>
						<p className='text-xl font-semibold text-gray-600 dark:text-gray-200'>
							{dashboardData.blogs}
						</p>
						<p className='text-gray-400 font-light'>Blogs</p>
					</div>
				</div>

				<div className='flex items-center gap-4 bg-white dark:bg-neutral-900 border dark:border-gray-800 p-4 min-w-58 rounded shadow-sm hover:shadow dark:shadow-gray-900 cursor-pointer hover:scale-105 transition-all'>
					<img src={assets.dashboard_icon_2} alt='' className='dark:invert dark:opacity-80' />
					<div>
						<p className='text-xl font-semibold text-gray-600 dark:text-gray-200'>
							{dashboardData.comments}
						</p>
						<p className='text-gray-400 font-light'>Comments</p>
					</div>
				</div>

				<div className='flex items-center gap-4 bg-white dark:bg-neutral-900 border dark:border-gray-800 p-4 min-w-58 rounded shadow-sm hover:shadow dark:shadow-gray-900 cursor-pointer hover:scale-105 transition-all'>
					<img src={assets.dashboard_icon_3} alt='' className='dark:invert dark:opacity-80' />
					<div>
						<p className='text-xl font-semibold text-gray-600 dark:text-gray-200'>
							{dashboardData.drafts}
						</p>
						<p className='text-gray-400 font-light'>Drafts</p>
					</div>
				</div>
			</div>

			<div>
				{/* Recent blogs */}
				<div className='flex items-center gap-3 m-4 mt-6 text-gray-600 dark:text-gray-300'>
					<img src={assets.dashboard_icon_4} alt='' className='dark:invert dark:opacity-80' />
					<p>Latest Blogs</p>
				</div>

				<div className='relative max-w-6xl overflow-x-auto shadow-sm dark:shadow-gray-900 border dark:border-gray-800 rounded-lg scrollbar-hide bg-white dark:bg-neutral-900'>
					<table className='w-full text-sm text-gray-500 dark:text-gray-400'>
						<thead className='text-xs text-gray-600 dark:text-gray-300 text-left uppercase border-b dark:border-gray-800'>
							<tr>
								<th scope='col' className='px-2 py-4 xl:px-6'>
									#
								</th>
								<th scope='col' className='px-2 py-4 xl:px-6'>
									Blog Title
								</th>
								<th scope='col' className='px-2 py-4 xl:px-6 max-sm:hidden'>
									Date
								</th>
								<th scope='col' className='px-2 py-4 xl:px-6 max-sm:hidden'>
									Status
								</th>
								<th scope='col' className='px-2 py-4 xl:px-6'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className='divide-y dark:divide-gray-800'>
							{dashboardData.recentBlogs.map((blog, index) => {
								return (
									<BlogTableItem
										key={blog.id}
										blog={blog}
										fetchBlogs={fetchDashboardData}
										index={index + 1}
									/>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

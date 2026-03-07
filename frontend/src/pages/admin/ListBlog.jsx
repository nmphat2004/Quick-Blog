import { useEffect, useState } from 'react';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListBlog = () => {
	const { axios } = useAppContext();
	const [blogs, setBlogs] = useState([]);

	const fetchBlogs = async () => {
		try {
			const { data } = await axios.get('/api/v1/admin/blogs');
			data.success ? setBlogs(data.blogs) : toast.error(data.message);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	return (
		<div className='flex-1 px-5 pt-5 sm:pt-12 sm:pl-16 bg-blue-50/50 dark:bg-neutral-950 min-h-screen transition-colors duration-300'>
			<h1 className='dark:text-gray-100'>All blogs</h1>

			<div className='relative h-4/5 mt-4 max-w-6xl overflow-x-auto shadow-sm dark:shadow-gray-900 border dark:border-gray-800 rounded-lg scrollbar-hide bg-white dark:bg-neutral-900'>
				<table className='w-full text-sm text-gray-500 dark:text-gray-400 relative'>
					<thead className='text-xs text-gray-600 dark:text-gray-300 text-left uppercase top-0 sticky z-10 bg-gray-50 dark:bg-neutral-800 border-b dark:border-gray-700'>
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
						{blogs.map((blog, index) => {
							return (
								<BlogTableItem
									key={blog.id}
									blog={blog}
									fetchBlogs={fetchBlogs}
									index={index + 1}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ListBlog;

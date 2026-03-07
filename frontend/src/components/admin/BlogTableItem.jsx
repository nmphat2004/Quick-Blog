import toast from 'react-hot-toast';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { RiEditLine } from "react-icons/ri";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
	const { title, createdAt } = blog;
	const BlogDate = new Date(createdAt);
	const { axios } = useAppContext();
	const navigate = useNavigate()

	const deleteBlog = async () => {
		const confirm = window.confirm(
			'Are you sure you want to delete this blog?'
		);

		if (!confirm) return;

		try {
			const { data } = await axios.post('/api/v1/blog/delete', {
				id: blog._id,
			});
			if (data.success) {
				toast.success(data.message);
				await fetchBlogs();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const togglePublish = async () => {
		try {
			const { data } = await axios.post('/api/v1/blog/toggle-publish', {
				id: blog._id,
			});

			if (data.success) {
				toast.success(data.message);
				await fetchBlogs();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<tr className='hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors'>
			<th className='px-2 py-4'> {index} </th>
			<td className='px-2 py-4 dark:text-gray-200'>{title}</td>
			<td className='px-2 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>
			<td className='px-2 py-4 max-sm:hidden'>
				<p
					className={`${blog.isPublished ? 'text-green-600 dark:text-green-500' : 'text-orange-700 dark:text-orange-500'
						}`}>
					{blog.isPublished ? 'Published' : 'Unpublished'}
				</p>
			</td>
			<td className='px-2 py-4 flex items-center text-xs gap-3'>
				<button
					onClick={togglePublish}
					className='border dark:border-gray-600 px-2 py-0.5 mt-1 rounded cursor-pointer'>
					{blog.isPublished ? 'Unpublish' : 'Publish'}
				</button>
				<button
					onClick={() => navigate(`/admin/update_blog/${blog._id}`)}
					className='text-primary/70 hover:text-orange-400 cursor-pointer text-sm'>
					<FaEdit />
				</button>
				<img
					onClick={deleteBlog}
					src={assets.cross_icon}
					alt=''
					className='hover:scale-110 transition-all cursor-pointer dark:invert'
				/>
			</td>
		</tr>
	);
};

export default BlogTableItem;

import toast from 'react-hot-toast';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';

const CommentTableItem = ({ comment, fetchComments }) => {
	const { blog, _id, createdAt } = comment;
	const BlogDate = new Date(createdAt);
	const { axios } = useAppContext();

	const approveComment = async () => {
		try {
			const { data } = await axios.post('/api/v1/admin/approve-comment', {
				id: _id,
			});

			if (data.success) {
				toast.success(data.message);
				await fetchComments();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const deleteComment = async () => {
		try {
			const confirm = window.confirm(
				'Are you sure you want to delete this comment?'
			);
			if (!confirm) return;

			const { data } = await axios.post('/api/v1/admin/delete-comment', {
				id: _id,
			});

			if (data.success) {
				toast.success(data.message);
				await fetchComments();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<tr className='hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors'>
			<td className='px-6 py-4 dark:text-gray-300'>
				<b className='font-medium text-gray-600 dark:text-gray-400'>Blog</b> : <span className="dark:text-gray-200">{blog.title}</span>
				<br />
				<br />
				<b className='font-medium text-gray-600 dark:text-gray-400'>Name</b> : <span className="dark:text-gray-200">{comment.name}</span>
				<br />
				<b className='font-medium text-gray-600 dark:text-gray-400'>Comment</b> : <span className="dark:text-gray-200">{comment.content}</span>
			</td>
			<td className='px-6 py-4 max-sm:hidden'>
				{BlogDate.toLocaleDateString()}
			</td>
			<td className='px-6 py-4'>
				<div className='inline-flex items-center gap-4'>
					{!comment.isApproved ? (
						<img
							onClick={approveComment}
							src={assets.tick_icon}
							className='w-5 hover:scale-110 transition-all cursor-pointer dark:invert'
						/>
					) : (
						<p className='text-xs border border-green-600/30 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-500 rounded-full px-3 py-1'>
							Approved
						</p>
					)}
					<img
						onClick={deleteComment}
						src={assets.bin_icon}
						alt=''
						className='w-5 hover:scale-110 transition-all cursor-pointer dark:invert dark:opacity-80'
					/>
				</div>
			</td>
		</tr>
	);
};

export default CommentTableItem;

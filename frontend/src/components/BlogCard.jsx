import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
	const { _id, title, description, category, image } = blog;
	const navigate = useNavigate();

	const stripHtml = (html) => {
		const doc = new DOMParser().parseFromString(html, 'text/html');
		return doc.body.textContent || '';
	};

	return (
		<div
			onClick={() => navigate(`/blog/${_id}`)}
			className='w-full rounded-lg overflow-hidden shadow dark:shadow-gray-800 hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer bg-white dark:bg-neutral-900'>
			<img src={image} alt='' className='aspect-video' />
			<span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>
				{category}
			</span>
			<div className='p-5'>
				<h5 className='mb-2 font-medium text-gray-900 dark:text-gray-100'>{title}</h5>
				<p
					className='mb-3 text-xs text-gray-600 dark:text-gray-400'
					dangerouslySetInnerHTML={{
						__html: stripHtml(description).slice(0, 80),
					}}></p>
			</div>
		</div>
	);
};

export default BlogCard;

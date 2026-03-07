import { useEffect, useRef, useState } from 'react';
import { assets, blog_categories } from '../../assets/assets';
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked';
import { useParams } from 'react-router-dom';

const UpdateBlog = () => {
	const { axios } = useAppContext();
	const params = useParams()
	const blog_id = params.id

	const [isUpdating, setIsUpdating] = useState(false);
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(false);
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [subTitle, setSubTitle] = useState('');
	const [category, setCategory] = useState('');
	const [isPublished, setIsPublished] = useState(false);

	const editorRef = useRef(null);
	const quillRef = useRef(null);

	useEffect(() => {
		const getBlogById = async () => {
			try {
				const { data } = await axios.get(`api/v1/blog/${blog_id}`)

				if (data.success) {
					setImage(data.blog.image)
					setTitle(data.blog.title)
					setSubTitle(data.blog.subTitle)
					setCategory(data.blog.category)
					setAuthor(data.blog.author)
					setIsPublished(data.blog.isPublished)

					// Set Quill editor content via its API
					if (quillRef.current) {
						quillRef.current.root.innerHTML = data.blog.description;
					}
				}

			} catch (error) {
				toast.error(error.message)
			}
		}

		getBlogById()
	}, [blog_id])

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			setIsUpdating(true);

			const blog = {
				blog_id,
				title,
				subTitle,
				description: quillRef.current.root.innerHTML,
				category,
				author,
				isPublished,
			};
			const formData = new FormData();

			formData.append('blog', JSON.stringify(blog));
			formData.append('image', image);

			const { data } = await axios.post('/api/v1/blog/update', formData);

			if (data.success) toast.success(data.message)

		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsUpdating(false);
		}
	};

	const generateContent = async () => {
		if (!title) return toast.error('Please enter a title');
		try {
			setLoading(true);

			const { data } = await axios.post('/api/v1/blog/generate', {
				prompt: title,
			});

			data.success
				? (quillRef.current.root.innerHTML = parse(data.content))
				: toast.error(data.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!quillRef.current && editorRef.current)
			quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
	}, []);

	return (
		<form
			onSubmit={handleSubmit}
			className='flex-1 bg-blue-50/50 dark:bg-neutral-950 text-gray-600 dark:text-gray-300 min-h-screen overflow-scroll transition-colors duration-300'>
			<div className='bg-white dark:bg-neutral-900 w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow dark:shadow-gray-900 border border-transparent dark:border-gray-800 rounded'>
				<p className='dark:text-gray-200'>Upload Thumbnail</p>
				<label htmlFor='image'>
					<img
						src={!image ? assets.upload_area : image}
						alt=''
						className={!image ? 'mt-2 h-16 rounded cursor-pointer dark:invert dark:opacity-80' : 'mt-2 h-16 rounded cursor-pointer'}
					/>
					<input
						onChange={(e) => setImage(e.target.files[0])}
						type='file'
						id='image'
						hidden
					/>
				</label>
				<p className='mt-4 dark:text-gray-200'>Blog Title</p>
				<input
					type='text'
					onChange={(e) => setTitle(e.target.value)}
					className='w-full max-w-lg mt-2 p-2 border border-gray-300 dark:border-gray-700 outline-none rounded bg-transparent dark:text-gray-100 placeholder:dark:text-gray-500'
					value={title}
					placeholder='Type here'
				/>
				<p className='mt-4 dark:text-gray-200'>Sub title</p>
				<input
					type='text'
					onChange={(e) => setSubTitle(e.target.value)}
					className='w-full max-w-lg mt-2 p-2 border border-gray-300 dark:border-gray-700 outline-none rounded bg-transparent dark:text-gray-100 placeholder:dark:text-gray-500'
					value={subTitle}
					placeholder='Type here'
				/>
				<p className='mt-4 dark:text-gray-200'>Blog Description</p>
				<div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative dark:bg-neutral-800 rounded'>
					<div ref={editorRef} className='dark:text-gray-100 dark:border-gray-700 h-full'></div>
					{loading && (
						<div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 dark:bg-black/40 mt-2 z-10'>
							<div className='w-8 h-8 border-2 border-t-white dark:border-gray-500 rounded-full animate-spin border-gray-400'></div>
						</div>
					)}
					<button
						disabled={loading}
						className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer z-10'
						onClick={generateContent}
						type='button'>
						{loading ? 'Generating...' : 'Generate with AI'}
					</button>
				</div>
				<p className='mt-4 dark:text-gray-200'>Blog Category</p>
				<select
					onChange={(e) => setCategory(e.target.value)}
					value={category}
					name='category'
					className='mt-2 px-3 py-2 border text-gray-500 dark:text-gray-300 border-gray-300 dark:border-gray-700 outline-none rounded bg-transparent dark:bg-neutral-800'>
					<option value='' disabled>
						-- Select Category --
					</option>
					{blog_categories.map((item, index) => {
						return (
							<option key={index} value={item}>
								{item}
							</option>
						);
					})}
				</select>
				<p className='mt-4 dark:text-gray-200'>Author</p>
				<input
					type='text'
					onChange={(e) => setAuthor(e.target.value)}
					className='w-full max-w-lg mt-2 p-2 border border-gray-300 dark:border-gray-700 outline-none rounded bg-transparent dark:text-gray-100 placeholder:dark:text-gray-500'
					value={author}
					placeholder='Type here'
				/>
				<div className='flex gap-2 mt-4 dark:text-gray-200'>
					<p>Publish Now</p>
					<input
						onChange={(e) => setIsPublished(e.target.checked)}
						type='checkbox'
						checked={isPublished}
						className='scale-125 cursor-pointer accent-primary'
					/>
				</div>
				<button
					disabled={isUpdating}
					type='submit'
					className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>
					{isUpdating ? 'Updating...' : 'Update Blog'}
				</button>
			</div>
		</form>
	);
};

export default UpdateBlog;

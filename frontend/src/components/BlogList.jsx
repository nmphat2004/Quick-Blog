import { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import BlogCard from './BlogCard';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import Loading from './Loading';

const BlogList = () => {
	const blogCategories = [
		'All',
		'Technology',
		'Startup',
		'Lifestyle',
		'Finance',
	];

	const [menu, setMenu] = useState('All');
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState()
	const [loading, setLoading] = useState(false)
	const { input } = useAppContext();
	const { axios } = useAppContext()
	const [blogs, setBlogs] = useState([])
	const cardSectionRef = useRef(null)

	useEffect(() => {
		const getAllBlogs = async () => {
			try {
				setLoading(true)
				const { data } = await axios.get(`api/v1/blog/all?page=${page}&limit=8`)
				if (data.success) {
					setBlogs(data.blogs)
					setTotalPages(data.totalPages)
				}
				setLoading(false)
			} catch (error) {
				toast.error(error.message)
			}
			finally {
				setLoading(false)
			}
		}

		getAllBlogs()
	}, [page])

	useEffect(() => {
		if (cardSectionRef.current) {
			cardSectionRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
		}
	}, [page])

	const filteredBlogs = () => {
		if (input === '') return blogs;
		else {
			return blogs.filter(
				(blog) =>
					blog.title.toLowerCase().includes(input.toLowerCase()) ||
					blog.category.toLowerCase().includes(input.toLowerCase())
			);
		}
	};

	return (
		<div ref={cardSectionRef}>
			<div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
				{blogCategories.map((item) => (
					<div key={item} className='relative'>
						<button
							onClick={() => setMenu(item)}
							className={
								menu === item
									? 'text-white px-4 pt-0.5 cursor-pointer relative'
									: 'text-gray-500 dark:text-gray-400 cursor-pointer relative'
							}>
							<span className="relative z-10">{item}</span>
							{menu === item && (
								<motion.div
									layoutId='underline'
									transition={{ type: 'spring', stiffness: 500, damping: 30 }}
									className='absolute left-0 right-0 top-0 bottom-0 z-0 bg-primary rounded-full'></motion.div>
							)}
						</button>
					</div>
				))}
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
				{loading ? (
					<Loading />
				) : filteredBlogs()
					.filter((blog) => (menu === 'All' ? true : blog.category === menu))
					.map((blog) => (
						<BlogCard key={blog._id} blog={blog} />
					))}
			</div>
			<div className='flex items-center justify-center gap-5'>
				{totalPages < 5 ? (
					<>
						<button onClick={() => setPage(1)} disabled={page === 1} className='px-3 py-2	text-primary rounded cursor-pointer disabled:opacity-50'>{'<<'}</button>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
							<button
								key={p}
								onClick={() => setPage(p)}
								className={p === page
									? 'px-3 py-2 bg-primary text-white rounded cursor-pointer hover:bg-primary/80'
									: 'px-3 py-2 text-primary rounded cursor-pointer'
								}
							>{p}</button>
						))}
						<button onClick={() => setPage(totalPages)} disabled={page === totalPages} className='px-3 py-2	text-primary rounded cursor-pointer disabled:opacity-50'>{'>>'}</button>
					</>
				) : (
					<>
						<button onClick={() => setPage(1)} disabled={page === 1} className='px-3 py-2	text-primary rounded cursor-pointer disabled:opacity-50'>{'<<'}</button>
						{page >= 2 && (
							<button onClick={() => setPage(page - 1)} className='px-3 py-2	text-primary rounded cursor-pointer '>{page - 1}</button>
						)}
						<button className='px-3 py-2 bg-primary	text-white rounded cursor-pointer hover:bg-primary/80'>{page}</button>
						{page + 1 < totalPages && (
							<button onClick={() => setPage(page + 1)} className='px-3 py-2	text-primary rounded cursor-pointer'>{page + 1}</button>
						)}
						{page < totalPages - 2 && (
							<button className='px-3 py-2 text-primary rounded cursor-pointer'>...</button>
						)}
						{page < totalPages && (
							<button onClick={() => setPage(totalPages)} className='px-3 py-2	text-primary rounded cursor-pointer'>{totalPages}</button>
						)}
						<button onClick={() => setPage(totalPages)} disabled={page === totalPages} className='px-3 py-2	text-primary rounded cursor-pointer disabled:opacity-50'>{'>>'}</button>
					</>
				)}
			</div>
		</div>
	);
};

export default BlogList;

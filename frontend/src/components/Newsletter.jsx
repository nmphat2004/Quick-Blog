import { useState } from 'react';

const Newsletter = () => {
	const [email, setEmail] = useState('');

	const handleSubmit = (e) => {
		console.log('Form submitted');
		e.preventDefault();
		console.log('Email:', email);
	};

	return (
		<div className='flex flex-col items-center justify-between text-center space-y-2 py-32'>
			<h1 className='md:text-4xl text-2xl font-semibold dark:text-gray-100'>Never Miss a Blog</h1>
			<p className='md:text-lg text-gray-500/70 dark:text-gray-400 pb-8'>
				Subscribe to get the latest blog, new tech, and exclusive news
			</p>
			<form
				onSubmit={handleSubmit}
				className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
				<input
					className='border border-gray-300 dark:border-gray-600 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500 dark:text-gray-200 bg-white dark:bg-neutral-800 dark:placeholder-gray-500'
					type='email'
					placeholder='Enter your email id'
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<button
					type='submit'
					className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary 
            transition-all cursor-pointer rounded-md rounded-l-none'>
					Subscribe
				</button>
			</form>
		</div>
	);
};

export default Newsletter;

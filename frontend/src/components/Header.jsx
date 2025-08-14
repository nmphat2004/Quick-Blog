import { useRef } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Header = () => {
	const { input, setInput } = useAppContext();
	const inputRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();

		setInput(inputRef.current.value);
	};

	const handleClear = () => {
		setInput('');
		inputRef.current.value = '';
		inputRef.current.focus();
	};

	return (
		<div className='mx-8 sm:mx-16 xl:mx-24 relative'>
			<div className=' text-center mt-20 mb-8'>
				<div
					className='inline-flex items-center justify-between gap-4 px-6 
        py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full 
        text-sm text-primary'>
					<p>New: AI feature integrated</p>
					<img src={assets.star_icon} className='w-2.5' alt='' />
				</div>

				<h1 className=' text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>
					Your own <span className=' text-primary'>blogging</span> <br />{' '}
					platform.
				</h1>

				<p className=' my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>
					This is your space to think out loud, to share what matters, and to
					write without filters. Whether it's one word or a thousand, your story
					starts right here.
				</p>

				<form
					onSubmit={handleSubmit}
					className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
					<div className='relative flex flex-grow'>
						<input
							ref={inputRef}
							className='w-full pl-4 pr-8 outline-none'
							type='text'
							placeholder='Search for blogs'
							required
						/>
						{input && (
							<button
								type='button'
								onClick={handleClear}
								className='absolute p-0.5 rounded-full h-6 w-6 right-2 flex items-center justify-center top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-400'>
								×
							</button>
						)}
					</div>
					<button
						className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'
						type='submit'>
						Search
					</button>
				</form>
			</div>
			<img
				src={assets.gradientBackground}
				alt=''
				className='absolute -top-50 -z-1 opacity-50'
			/>
		</div>
	);
};

export default Header;

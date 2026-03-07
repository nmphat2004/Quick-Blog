import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
	const { navigate, token } = useAppContext();

	return (
		<div className='z-999 sticky top-0 bg-white dark:bg-neutral-950 transition-colors duration-300'>
			<div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 top-0 bg-white dark:bg-neutral-950 transition-colors duration-300'>
				<img
					onClick={() => navigate('/')}
					src={assets.logo}
					alt='Logo'
					className='w-32 sm:w-44 cursor-pointer block dark:hidden'
				/>
				<img
					onClick={() => navigate('/')}
					src={assets.logo_light}
					alt='Logo'
					className='w-32 sm:w-44 cursor-pointer hidden dark:block'
				/>
				<div className='flex items-center justify-center gap-5'>
					<ThemeToggle />
					<button
						onClick={() => navigate('/admin')}
						className='flex items-center gap-2 rounded-full text-sm bg-primary text-white px-10 py-2.5 cursor-pointer'>
						{token ? 'Dashboard' : 'Login'}
						<img src={assets.arrow} alt='arrow' className='w-3' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;

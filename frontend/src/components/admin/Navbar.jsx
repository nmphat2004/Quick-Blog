import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
	const { axios, setToken, navigate } = useAppContext();

	const logout = () => {
		localStorage.removeItem('token');
		axios.defaults.headers.common['Authorization'] = null;
		setToken(null);
		navigate('/');
	};

	return (
		<div className='flex justify-between items-center py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-950 transition-colors duration-300'>
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
					onClick={logout}
					className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Navbar;

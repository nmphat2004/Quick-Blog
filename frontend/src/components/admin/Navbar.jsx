import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<div className='flex justify-between items-center py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
			<img
				onClick={() => navigate('/')}
				src={assets.logo}
				alt='Logo'
				className='w-32 sm:w-44 cursor-pointer'
			/>
			<button
				onClick={() => navigate('/')}
				className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>
				Logout
			</button>
		</div>
	);
};

export default Navbar;

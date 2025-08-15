import { Outlet } from 'react-router-dom';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';

const Layout = () => {
	return (
		<>
			<div className='fixed top-0 left-0 right-0 z-30 bg-white'>
				<Navbar />
			</div>
			<div className='flex h-[calc(100vh - 70px)]'>
				<div className='fixed top-[70px] left-0 z-20'>
					<Sidebar />
				</div>
				<div className='ml-[256px] pt-[70px] h-screen w-full overflow-auto'>
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default Layout;

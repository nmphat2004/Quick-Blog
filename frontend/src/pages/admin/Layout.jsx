import { Outlet } from 'react-router-dom';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';

const Layout = () => {
	return (
		<>
			<Navbar />
			<div className='flex h-[calc(100vh - 70px)]'>
				<Sidebar />
				<Outlet />
			</div>
		</>
	);
};

export default Layout;

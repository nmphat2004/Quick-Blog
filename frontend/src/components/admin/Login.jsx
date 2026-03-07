import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { axios, setToken } = useAppContext();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await axios.post('/api/v1/admin/login', {
				email,
				password,
			});

			if (data.success) {
				setToken(data.token);
				localStorage.setItem('token', data.token);
				axios.defaults.headers.common['Authorization'] = data.token;
			} else toast.error(data.message);
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className='flex items-center justify-center h-screen bg-white dark:bg-neutral-950 transition-colors duration-300'>
			<div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg bg-white dark:bg-neutral-900'>
				<div className='flex flex-col items-center justify-center'>
					<div className='w-full py-6 text-center'>
						<h1 className='text-3xl font-bold dark:text-gray-100'>
							<span className='text-primary'>Admin</span> Login
						</h1>
						<p className='font-light dark:text-gray-400'>
							Enter your credentials to access the admin panel
						</p>
					</div>
					<form
						onSubmit={handleSubmit}
						className='mt-6 w-full sm:max-w-md text-gray-600 dark:text-gray-300'>
						<div className='flex items-center mb-6'>
							<label className='w-[80px]'>Email: </label>
							<input
								onChange={(e) => setEmail(e.target.value)}
								type='email'
								value={email}
								required
								placeholder='Enter your email'
								className='flex-1/2 border-b-2 border-gray-300 dark:border-gray-600 p-1 outline-none focus:border-gray-400 dark:focus:border-gray-400 bg-transparent dark:text-gray-200 dark:placeholder-gray-500'
							/>
						</div>
						<div className='flex items-center mb-6'>
							<label className='w-[80px]'>Password: </label>
							<input
								onChange={(e) => setPassword(e.target.value)}
								type='password'
								value={password}
								required
								placeholder='Enter your password'
								className='flex-1/2 border-b-2 border-gray-300 dark:border-gray-600 p-1 outline-none focus:border-gray-400 dark:focus:border-gray-400 bg-transparent dark:text-gray-200 dark:placeholder-gray-500'
							/>
						</div>
						<button
							type='submit'
							className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all'>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;

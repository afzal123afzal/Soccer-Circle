import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import tick from '../../assets/tick.jpeg'
import { axiosPlayersInstance } from "../../instance/Axios";
import ErrorPage from "../../pages/Players/ErrorPage";
import './EmailVerify.css'


const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
    console.log(param.token);

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
                const token = param.token.replace(/__/g, ".");
                console.log(token,"TOOOOKKKKEEEEN");
				// const { data } = await axiosPlayersInstance.post(`/verify/${param.token}`);
				const { data } = await axiosPlayersInstance.post(`/verify/${token}`);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<>
			{validUrl ? (
				<div className='container11'>
					<img src={tick} alt="success_img" className='success_img' />
					<h1>Email verified successfully</h1>
					<Link to="/player/login">
						<button className="green_btn">Login</button>
					</Link>
				</div>
                
			) : (
                <div className="errorpage">
				<ErrorPage/>
                </div>
			)}
		</>
	);
};

export default EmailVerify;

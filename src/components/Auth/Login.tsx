import React, {useEffect} from 'react';
import Lottie from 'react-lottie-player';
import loadingSplash from '../../assets/lotties/splash-loading.json';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../hooks/token';
import { login } from '../../hooks/auth/register';
import LoginRequest from '../../hooks/auth/requests/LoginRequest';
import { useToasts } from 'react-toast-notifications';

const Login: React.FC = () => {
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const { token, setToken } = useToken();

  useEffect(() => {
    if (token) {
      navigate('/admin');
    }
  }, [token, navigate]);

  const loginUser = async (event: any) => {
    event.preventDefault();

    const request = new LoginRequest(
      event.target.username.value,
      event.target.password.value,
    );

    if (request.username?.trim() === '' || request.password?.trim() === '') {
      addToast(`Email or password are empty`, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    try {
      const response = await login(request);
      addToast(`Welcome ${request.username}`, {
        appearance: 'info',
        autoDismiss: true,
      });
      setToken(response);
      navigate('/admin/products');
    } catch (e) {
      addToast(`Login failed`, { appearance: 'error', autoDismiss: true });
    }
  };

  return (
    <div>
      <section className="h-screen gradient-form bg-gray-200">
        <div className="py-12 px-6 h-full">
          <div className="flex justify-center items-center h-full g-6 text-gray-800">
            <div className="w-10/12">
              <div className="block bg-white shadow-lg rounded-lg">
                <div className="grid md:grid-cols-2 grid-cols-1 px-4 md:px-0">
                  <div className="md:p-12 md:mx-6">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48 rounded-full shadow"
                        src="https://media.discordapp.net/attachments/548183152376545306/955953631805452349/logo.jpg"
                        alt="logo"
                      />
                      <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                        Admin Panel - FI-Sweets
                      </h4>
                    </div>
                    <form onSubmit={loginUser}>
                      <p className="mb-4">Please login to your account</p>
                      <div className="mb-4">
                        <input
                          type="text"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="username"
                          placeholder="Email"
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="password"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="password"
                          placeholder="Password"
                        />
                      </div>
                      <div className="text-center pt-1 mb-3 pb-1">
                        <button type="submit">
                          <div
                            className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md bg-blue-500 hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                            // type="button"
                          >
                            Log in
                          </div>
                        </button>
                        <div className="text-gray-500">Forgot password?</div>
                      </div>
                    </form>
                  </div>
                  <Lottie
                    className="h-fit w-fit"
                    loop
                    animationData={loadingSplash}
                    play
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

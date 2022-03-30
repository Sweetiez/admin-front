import React from 'react';
import Lottie from 'react-lottie-player';
import loadingSplash from '../../assets/lotties/splash-loading.json';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
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
                    <form>
                      <p className="mb-4">Please login to your account</p>
                      <div className="mb-4">
                        <input
                          type="text"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput1"
                          placeholder="Username"
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="password"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput1"
                          placeholder="Password"
                        />
                      </div>
                      <div className="text-center pt-1 mb-3 pb-1">
                        <Link to={'/admin'}>
                          <div
                            className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md bg-blue-500 hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                            // type="button"
                          >
                            Log in
                          </div>
                        </Link>
                        <div className="text-gray-500" >
                          Forgot password?
                        </div>
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

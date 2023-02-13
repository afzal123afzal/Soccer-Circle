import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/Player/useLogout";
import { useAuthContext } from "../../hooks/Player/useAuthContext";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { logoutPlayer } from "../../redux-toolkit/playerLoginReducer";

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    // const { logout } = useLogout()
    // const { player } = useAuthContext()
    const dispatch = useDispatch()
    const playerState = useSelector((state) => state.player)
    const player = playerState.navName
    const player1 = playerState.playerDetails
    console.log(player);

    const handleClick = () => {
        console.log('hi');
        // logout()
        dispatch(logoutPlayer())
        toast.success("Logout Successfully")
    }
    return (
        <div>
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to='/player/home'> <h1 className='text-3xl font-bold mr-4 text-emerald-300'>Soccer Circle</h1></Link>
                            <div className="flex-shrink-0">
                                {/* <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                /> */}

                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link
                                        to='/player/home'


                                        className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Home
                                    </Link>

                                    <Link
                                        to='/player/clubs'
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Clubs
                                    </Link>

                                    <Link
                                        to="/player/chat"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Chat
                                    </Link>

                                    <Link
                                        to="/player/dashboard"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Dashboard
                                    </Link>

                                    {/* <Link
                                        to=''
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Reports
                                    </Link> */}
                                    {player1 ? (
                                        <>
                                            <Link className="text-cyan-300">{player}</Link>
                                            <button onClick={handleClick} class="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-3 align-center rounded-full">
                                                LogOut
                                            </button>
                                        </>

                                    ) :
                                        <div>
                                            <Link className="text-cyan-300" to="/player/login">Login</Link>
                                            <Link className="text-cyan-300" to="/player/signup">Signup</Link>
                                        </div>}
                                    {/* {!player && (
                                        <div>
                                            <Link className="text-cyan-300" to="/player/login">Login</Link>
                                            <Link className="text-cyan-300" to="/player/signup">Signup</Link>
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {(ref) => (
                        <div className="md:hidden" id="mobile-menu">
                            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <Link
                                    to='/player/home'
                                    className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Home
                                </Link>

                                <Link
                                    to='/player/clubs'
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Clubs
                                </Link>

                                <Link
                                    to="/player/chat"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Chat
                                </Link>

                                <Link
                                    to="/player/dashboard"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Dashboard
                                </Link>

                                <a
                                    href="#"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Reports
                                </a>
                                {player1 ? (
                                    <>
                                        <Link className="block px-3 py-2 font-medium " >{player}</Link> <br></br>
                                        <button onClick={handleClick} class="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-3 align-center rounded">
                                            LogOut
                                        </button>
                                    </>

                                ) : <div>
                                    <Link to="/player/login">Login</Link>
                                    <Link to="/player/signup">Signup</Link>
                                </div>
                                }
                                {/* {!player && (
                                    <div>
                                        <Link to="/player/login">Login</Link>
                                        <Link to="/player/signup">Signup</Link>
                                    </div>
                                )} */}

                            </div>

                        </div>
                    )}
                </Transition>
            </nav>

        </div>
    );
}

export default Nav;
import React from 'react'
import football from '../../../assets/football2.jpeg'

function Carousel() {
    return (
        <div>
            <section className="relative py-24 px-4">
                <div className="z-20 relative text-white container mx-auto">
                    <h1 className="mb-4 text-center mt-10" > Trivandrum Football
                        Clubs Thrive </h1>
                    <p className="leading-normal text-center mt-10">
                        Welcome to Soccer Circle Scouts!
                    </p>
                    <p className="leading-normal text-center mt-10">
                        We're the link between football clubs and unknown footballers in Trivandrum and KL. We scout and nurture raw football talent, and help clubs find the most suitable undiscovered players to strengthen their teams.
                    </p>
                    {/* <Link
                            to="/player/clubs"
                            className="ml-center  inline-block bg-blue-500 text-white no-underline hover:bg-blue-800 mt-4 p-4 rounded-full"
                        >
                            Connect !!!
                        </Link> */}
                </div>
                <div className="absolute inset-0 h-auto z-10">
                    <img
                        src={football}
                        alt=""
                        className="h-full w-full object-fit-cover"
                    />
                </div>
            </section>
        </div>
    )
}

export default Carousel
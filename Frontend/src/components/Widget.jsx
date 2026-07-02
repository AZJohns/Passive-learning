import bookIcon from "../assets/book.svg"
import starIcon from "../assets/star.png"
import chainIcon from "../assets/chain.png"
import calendarIcon from "../assets/calendar.png"
import profileIcon from "../assets/profile.png"
import lightIcon from "../assets/light.png"
const Widget = () => {
    return (
        <section className="bg-white max-w-200 h-auto p-1 m-1 border border-black rounded-3xl flex flex-col gap-3 [&_span]:text-blue-600" >
            <article className="mt-1 mb-2">
                <div className="flex items-center ml-2 mt-2">
                    {/* Aqui va inluido un logo */}
                    <img className="w-10 h-10" src={bookIcon} alt="" />
                    <h1 className="font-bold text-lg text-blue-600 ml-5 pr-5 flex-grow">EXAMPLE</h1>
                </div>

                <h2 className=" text-center font-bold text-2xl">SHE <span>GOES</span> TO SCHOOL EVERY DAY</h2>
            </article>

            <span className="border border-gray-400 w-full"></span>

            <article className="mt-2 mb-2 grid grid-cols-4 gap-2">
                <div className="grid grid-cols-[40px_1fr] items-start gap-2">
                    <img className="w-10 h-10 row-span-2" src={chainIcon} alt="" />
                    <p className="text-gray-600 text-sm">VERB</p>
                    <h3 className="font-bold">Go</h3>
                </div>
                <div className="grid grid-cols-[40px_1fr] items-start gap-2">
                    {/* Aqui va inluido un logo */}
                    <img className="w-10 h-10 row-span-2" src={starIcon} alt="" />
                    <p className="text-gray-600 text-sm">CONJUGATION</p>
                    {/* Aqui va el conjugation */}
                    <h3 className="font-bold">Goes</h3>
                </div>
                <div className="grid grid-cols-[40px_1fr] items-start gap-2 ">
                    {/* Aqui va inluido un logo */}
                    <img className="w-10 h-10 row-span-2" src={calendarIcon} alt="" />
                    <p className="text-gray-600 font-sm">TENSE</p>
                    {/* Aqui va el tense */}
                    <h3 className="font-bold">Present Simple</h3>
                </div>
                <div className="grid grid-cols-[40px_1fr] items-start gap-2 ">
                    {/* Aqui va inluido un logo */}
                    <img className="w-10 h-10 row-span-2" src={profileIcon} alt="" />
                    <p className="text-gray-600 text-sm">SUBJECT</p>
                    {/* Aqui va el subject */}
                    <h3 className="font-bold">She</h3>
                </div>
            </article>

            <article className="mt-2 mb-3 bg-gray-200 p-2 text-center items-center h-20 rounded-3xl [&_span]:text-blue-800 [&_span]:font-bold gap-2 flex flex-row justify-center ">
                <img className="w-10 h-10 flex" src={lightIcon} alt="" />
                <p className="text-blue-600 m-5">In Present Simpe, with he / she / it, the verb usually takes <span>-s</span> or <span>-es</span></p>
            </article>

        </section>
    );
}

export default Widget;
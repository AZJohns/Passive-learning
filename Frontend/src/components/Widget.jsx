const Widget = () => {
    return (
        <section className="bg-white w-200 h-70 p-1 m-1 border border-black rounded-xl flex flex-col gap-3" >
            <article className="mt-2 mb-2">
                <h1 className="font-bold text-lg text-blue-600">EXAMPLE</h1>
                <h2 className=" text-center font-bold">SHE <span className="text-blue-600">GOES</span> TO SCHOOL EVERY DAY</h2>
            </article>

            <span className="border border-gray-400 w-full"></span>

            <article className="mt-2 mb-2 flex [&_h3]:font-bold">
                <div className="flex-grow">
                    <p className="text-gray-600">VERB</p>
                    {/* Aqui va el verbo */}
                    <h3>Go</h3>
                </div>
                <div className="flex-grow">
                    <p className="text-gray-600">CONJUGATION</p>
                    {/* Aqui va el conjugation */}
                    <h3>Goes</h3>
                </div>
                <div className="flex-grow ">
                    <p className="text-gray-600">TENSE</p>
                    {/* Aqui va el tense */}
                    <h3>Present Simple</h3>
                </div>
                <div className="flex-grow ">
                    <p className="text-gray-600">SUBJECT</p>
                    {/* Aqui va el subject */}
                    <h3>She</h3>
                </div>
            </article>

            <article className="mt-2 mb-2 bg-gray-200 p-2 text-center items-center h-20 [&_span]:text-blue-800 [&_span]:font-bold ">
                <p className="text-blue-600 m-5">In Present Simpe, with he / she / it, the verb usually takes <span>-s</span> or <span>-es</span></p>
            </article>

        </section>
    );
}

export default Widget;
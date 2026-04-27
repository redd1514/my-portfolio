
const Recent = () => {
    return (
        <div className="flex flex-col w-full bg-white dark:bg-[#0b0d0e] mt-2 p-3 px-5 gap-3">
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="p-3 space-y-1">
                    <h3 className="text-sm font-semibold ">Heavenly cafe</h3>
                    <p className="text-xs ">Online Coffee Shop</p>
                    <a href="https://heavenly-cafe.vercel.app/"><p className="text-xs px-2 py-1 font-mono inline-block mt-1 rounded-md bg-gray-100 dark:bg-black">heavenly-cafe.vercel.app</p></a>
                </div>
                 <div className="p-3 space-y-1">
                    <h3 className="text-sm font-semibold ">Valenzuela Surveying System</h3>
                    <p className="text-xs ">Online Survey System</p>
                      <a href="https://valenzuela-survey.vercel.app/"><p className="text-xs px-2 py-1 font-mono inline-block mt-1 rounded-md bg-gray-100 dark:bg-black">valenzuela-survey.vercel.app/</p></a>
                </div>
                 <div className="p-3 space-y-1">
                    <h3 className="text-sm font-semibold ">The Great Debate</h3>
                    <p className="text-xs ">Multiplayer Fighting Game</p>
                      <a href="https://heavenly-cafe.vercel.app/"><p className="text-xs px-2 py-1 font-mono inline-block mt-1 rounded-md bg-gray-100 dark:bg-black">heavenly-cafe.vercel.app</p></a>
                </div>
                 
            </div>

        </div>

    )

}

export default Recent;
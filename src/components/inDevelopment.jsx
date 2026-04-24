const InDevelopment = () => {
    return (
        <div className="p-4 space-y-2  bg-white dark:bg-[#0b0d0e] ">
            <h2 className="text-lg font-bold">In Development</h2>
            <div className="">
                <p className="text-[13px] leading-relaxed font-serif mt-5 ">
                Currently developing a multi-sport facility scheduling system integrating a conversational AI concierge, and utilizing PostgreSQL for robust database management.
                </p>

                <ul className="mt-4 space-y-2 border-l border-gray-700 pl-4">
                    
                    <li className="text-[12px] text-gray-400">
                        <span className="text-white block font-medium">AI Integration</span>
                        Natural language processing for user inquiries.
                    </li>
                </ul>

               
            </div>
        </div>
    )
}

export default InDevelopment;
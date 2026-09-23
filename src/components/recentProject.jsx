import { Link } from 'react-router-dom';


const Recent = () => {
    return ( 
        <div className=" bg-white dark:bg-[#0b0d0e] bento-card p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in animation-delay-300">           
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Recent Projects</h2>
                <Link to="/projects" className="text-xs text-foreground/70 hover:text-foreground flex items-center gap-1 transition-colors">
                    View all
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
                    </svg>
                </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                
                 <div className="bento-card p-3 space-y-1">
                    <h3 className="text-sm font-semibold group-hover:text-accent">PLV CEIT</h3>
                    <p className="text-xs ">Official Website of PLV CEIT Department</p>
                      <a href="https://plvceit.org/"><p className="text-xs px-2 py-1 font-mono inline-block mt-1 rounded-md bg-gray-100 dark:bg-black">plvceit.org/</p></a>
                </div>
                <div className="bento-card p-3 space-y-1">
                    <h3 className="text-sm font-semibold group-hover:text-accent">PNP Assignment System</h3>
                    <p className="text-xs ">Assignment and location movement system for PNP personnel</p>
                    <a href="https://pnp-survey.up.railway.app/"><p className="text-xs px-2 py-1 font-mono inline-block mt-1 rounded-md bg-gray-100 dark:bg-black">pnp-survey.up.railway.app/</p></a>
                </div>
                 <div className="bento-card p-3 space-y-1">
                    <h3 className="text-sm font-semibold group-hover:text-accent">Camp-navi</h3>
                    <p className="text-xs ">Integrative mapping and navigation with geofencing system for Camp Crame</p>
                      <a href="https://valenzuela-survey.vercel.app/"><p className="text-xs px-2 py-1 font-mono inline-block mt-1 rounded-md bg-gray-100 dark:bg-black">valenzuela-survey.vercel.app/</p></a>
                </div>
                 <div className="bento-card p-3 space-y-1">
                    <h3 className="text-sm font-semibold group-hover:text-accent">Pais 2.0</h3>
                    <p className="text-xs ">PNP-ITMS Intern Tracking System.</p>
                      <a href="https://itms-armd-directory-two.vercel.app/"><p className="text-xs px-2 py-1 font-mono inline-block mt-1 rounded-md bg-gray-100 dark:bg-black">itms-armd-directory-two.vercel.app/</p></a>
                </div>
                 
            </div>

        </div>

    )

}

export default Recent;
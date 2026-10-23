import Reveal from './motion/Reveal';
import { TransitionLink } from './motion/PageTransition';

const fullStackData = [
  {
    category: "Frontend",
    skills: ["HTML", "CSS", "Bootstrap", "JavaScript", "TypeScript", "React", "Tailwind CSS"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "Hono.js", "Python", "PHP",  "FastAPI",  "Django", "OAuth", "JWT", "Firebase", "Supabase"]
  },
  {
    category: "Database",
    skills: ["MySQL", "PostgreSQL", "MSSQL", "SQLite"]
  },
  {
    category: "Game Development",
    skills: ["Unity", "C#", "3ds Max", "Blender"]
  },
  {
    category: "DevOps & Tools",
    skills: ["GitHub Actions","Docker", "Git", "Github", "Vercel", "Vite",  "VS Code", "Visual Studio", "Pycharm", "Discord", "Jira", "Teams", "Illustrator", "Photoshop", "Figma"]
  },
  {
    category: "AI & Machine Learning",
    skills: ["LangChain", "OpenAI API", "Gemini API", "Regression Analysis"]
  },
  {
    category: "CMS & Security",
    skills: ["Wordpress", "RSA"]
  },
  {
    category: "Programming",
    skills: ["Java", "C#", "C"]
  }
];

function FullTechStackPage() {
  return (
    <Reveal
      className="max-w-4xl mx-auto px-4 py-8 text-black dark:text-white"
      stagger=":scope > div > a, .space-y-12 > div, .skill-chip"
      step={22}
      scramble="h1"
    >
      <div className="flex items-center gap-4 mb-8">
        <TransitionLink to="/" label="Home" className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors text-sm flex items-center gap-2 ">
          ← Back to Home
        </TransitionLink>
        <h1 className="text-3xl font-bold tracking-tight">Tech Stack</h1>
      </div>
      
      <div className="space-y-12">
        {fullStackData.map((item, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{item.category}</h2>
            
            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx} 
                  className="skill-chip px-3 py-1 text-sm bg-foreground/5 border border-foreground/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export default FullTechStackPage;
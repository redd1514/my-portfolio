import React from 'react';
import { Link } from 'react-router-dom';

const fullStackData = [
  {
    category: "Frontend",
    skills: ["JavaScript", "TypeScript", "React", "Tailwind CSS", "Vite"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "Python", "PHP",  "FastAPI",  "PostgreSQL", "MySQL", "OAuth", "JWT", "Firebase", "Supabase"]
  },
  {
    category: "DevOps & Tools",
    skills: ["GitHub Actions","Docker", "Git", "Github", "Vercel", "Vite",  "VS Code", "Pycharm", "Discord", "Jira", "Teams"]
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
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in text-black dark:text-white">
      <div className="flex items-center gap-4 mb-8 animate-fade-in">
        <Link to="/" className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors text-sm flex items-center gap-2 ">
          ← Back to Home
        </Link>
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
                  className="px-3 py-1 text-sm  bg-foreground/5 border border-foreground/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FullTechStackPage;
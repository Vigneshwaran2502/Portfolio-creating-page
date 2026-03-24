import React from 'react';
import { useStore } from '../store/useStore';
import { parseMarkdown } from '../lib/parser';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Twitter, Globe } from 'lucide-react';
import ParticlesBackground from './ParticlesBackground';
import { BlurText } from './BlurText';
import { TiltedCard } from './TiltedCard';

const iconMap: Record<string, React.ReactNode> = {
  Email: <Mail className="w-5 h-5" />,
  GitHub: <Github className="w-5 h-5" />,
  LinkedIn: <Linkedin className="w-5 h-5" />,
  Twitter: <Twitter className="w-5 h-5" />,
  Website: <Globe className="w-5 h-5" />,
};

export default function Preview() {
  const { markdown, theme, sections } = useStore();
  const data = parseMarkdown(markdown);

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-950 text-gray-100';
      case 'neon':
        return 'bg-black text-green-400 font-mono';
      case 'glassmorphism':
        return 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white';
      case 'minimal':
      default:
        return 'bg-white text-gray-900';
    }
  };

  const getCardClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-900 border border-gray-800';
      case 'neon':
        return 'bg-gray-900 border border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]';
      case 'glassmorphism':
        return 'bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl';
      case 'minimal':
      default:
        return 'bg-gray-50 border border-gray-200';
    }
  };

  const getSection = (id: string) => sections.find((s) => s.id === id);

  return (
    <div className={`h-full overflow-y-auto scroll-smooth ${getThemeClasses()} transition-colors duration-500 relative`}>
      <ParticlesBackground />
      {/* Sticky Navigation */}
      <nav className={`sticky top-0 z-20 backdrop-blur-md border-b ${theme === 'dark' || theme === 'neon' ? 'border-white/10 bg-black/50' : 'border-black/10 bg-white/50'}`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-xl tracking-tight">
            {data.hero.name || 'Portfolio'}
            <span className={theme === 'neon' ? 'text-green-400' : 'text-indigo-500'}>.</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            {sections.filter(s => s.visible).map(section => (
              <a 
                key={section.id} 
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(section.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="hover:opacity-70 transition-opacity capitalize"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-8 md:px-16 relative z-10">
        
        {/* Hero Section */}
        {getSection('hero')?.visible && (
          <motion.section
            id="hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] text-center space-y-6 py-20"
          >
            <BlurText 
              as="h1"
              text={data.hero.name || 'Your Name'} 
              className={`text-5xl md:text-7xl font-bold tracking-tight ${theme === 'neon' ? 'text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]' : ''}`}
            />
            <p className={`text-xl md:text-2xl ${theme === 'minimal' ? 'text-gray-600' : 'opacity-80'}`}>
              {data.hero.title || 'Your Title'}
            </p>
          </motion.section>
        )}

        {/* About Section */}
        {getSection('about')?.visible && data.about && (
          <motion.section
            id="about"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center min-h-[calc(100vh-73px)] space-y-12 py-20"
          >
            <h2 className="text-4xl font-bold tracking-tight text-center flex justify-center gap-2 flex-wrap">
              <BlurText text="About" />
              <BlurText text="Me" className={theme === 'neon' ? 'text-green-400' : 'text-indigo-500'} delay={0.1} />
            </h2>
            <div className={`text-lg leading-relaxed max-w-3xl mx-auto space-y-6 ${theme === 'minimal' ? 'text-gray-700' : 'opacity-90'}`}>
              {data.about.split('\n').map((paragraph, idx) => (
                paragraph.trim() && <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </motion.section>
        )}

        {/* Skills Section */}
        {getSection('skills')?.visible && data.skills.length > 0 && (
          <motion.section
            id="skills"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center min-h-[calc(100vh-73px)] space-y-12 py-20"
          >
            <h2 className="text-4xl font-bold tracking-tight text-center flex justify-center gap-2 flex-wrap">
              <BlurText text="My" />
              <BlurText text="Skills" className={theme === 'neon' ? 'text-green-400' : 'text-indigo-500'} delay={0.1} />
            </h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
              {data.skills.map((skill, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: i * 0.05,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                  className={`px-6 py-3 rounded-full text-sm font-medium ${getCardClasses()}`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Projects Section */}
        {getSection('projects')?.visible && data.projects.length > 0 && (
          <motion.section
            id="projects"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center min-h-[calc(100vh-73px)] space-y-12 py-20"
          >
            <h2 className="text-4xl font-bold tracking-tight text-center flex justify-center gap-2 flex-wrap">
              <BlurText text="Featured" />
              <BlurText text="Projects" className={theme === 'neon' ? 'text-green-400' : 'text-indigo-500'} delay={0.1} />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 [perspective:1000px]">
              {data.projects.map((project, i) => (
                <TiltedCard key={i} className="h-full">
                  <motion.div
                    className={`p-8 rounded-3xl space-y-4 flex flex-col h-full ${getCardClasses()}`}
                    style={{ transform: "translateZ(50px)" }}
                  >
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className={`text-base leading-relaxed ${theme === 'minimal' ? 'text-gray-600' : 'opacity-80'}`}>
                      {project.description}
                    </p>
                    {project.tech && (
                      <div className="pt-6 mt-auto border-t border-current/10">
                        <p className="text-xs font-bold uppercase tracking-widest opacity-70">
                          {project.tech}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </TiltedCard>
              ))}
            </div>
          </motion.section>
        )}

        {/* Experience Section */}
        {getSection('experience')?.visible && data.experience.length > 0 && (
          <motion.section
            id="experience"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center min-h-[calc(100vh-73px)] space-y-12 py-20"
          >
            <h2 className="text-4xl font-bold tracking-tight text-center flex justify-center gap-2 flex-wrap">
              <BlurText text="Work" />
              <BlurText text="Experience" className={theme === 'neon' ? 'text-green-400' : 'text-indigo-500'} delay={0.1} />
            </h2>
            <div className="space-y-8 max-w-3xl mx-auto w-full">
              {data.experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }}
                  className={`p-8 rounded-3xl border-l-4 ${theme === 'neon' ? 'border-green-500' : 'border-indigo-500'} ${getCardClasses()}`}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-2">
                    <h3 className="text-2xl font-bold">{exp.title}</h3>
                    <span className="text-sm opacity-70 font-mono bg-current/5 px-3 py-1 rounded-full">{exp.date}</span>
                  </div>
                  <ul className="space-y-3 list-none">
                    {exp.details.map((detail, j) => (
                      <li key={j} className={`text-base flex items-start gap-3 ${theme === 'minimal' ? 'text-gray-700' : 'opacity-90'}`}>
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${theme === 'neon' ? 'bg-green-500' : 'bg-indigo-500'}`} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Contact Section */}
        {getSection('contact')?.visible && data.contact.length > 0 && (
          <motion.section
            id="contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center min-h-[calc(100vh-73px)] space-y-12 py-20"
          >
            <h2 className="text-4xl font-bold tracking-tight text-center flex justify-center gap-2 flex-wrap">
              <BlurText text="Let's" />
              <BlurText text="Connect" className={theme === 'neon' ? 'text-green-400' : 'text-indigo-500'} delay={0.1} />
            </h2>
            <div className="flex justify-center gap-6 flex-wrap max-w-2xl mx-auto">
              {data.contact.map((contact, i) => (
                <motion.a
                  key={i}
                  href={contact.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl ${getCardClasses()} hover:opacity-80 transition-all`}
                >
                  {iconMap[contact.type] || <Mail className="w-5 h-5" />}
                  <span className="font-semibold">{contact.value}</span>
                </motion.a>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}

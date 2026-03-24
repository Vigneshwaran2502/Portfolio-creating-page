import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'minimal' | 'glassmorphism' | 'neon' | 'dark';

export interface Section {
  id: string;
  title: string;
  visible: boolean;
  content: string;
}

interface AppState {
  markdown: string;
  setMarkdown: (md: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  sections: Section[];
  setSections: (sections: Section[]) => void;
  updateSection: (id: string, updates: Partial<Section>) => void;
}

const defaultMarkdown = `
# John Doe
**Full Stack Developer**

## About
I am a passionate developer with a love for building scalable web applications. I specialize in React, Node.js, and modern web technologies.

## Skills
- JavaScript / TypeScript
- React / Next.js
- Node.js / Express
- Tailwind CSS
- PostgreSQL / MongoDB

## Projects
### DevPortfolio AI
A SaaS platform to convert Markdown resumes into beautiful portfolios.
*Tech: Next.js, Tailwind, Framer Motion*

### E-commerce Platform
A full-stack e-commerce solution with real-time inventory.
*Tech: React, Node.js, Stripe*

## Experience
### Senior Developer @ TechCorp
*2021 - Present*
- Led a team of 5 developers to build a new microservices architecture.
- Improved application performance by 40%.

### Web Developer @ StartupX
*2018 - 2021*
- Developed and maintained multiple client websites.
- Implemented responsive designs and accessibility standards.

## Contact
- Email: john.doe@example.com
- GitHub: [github.com/johndoe](https://github.com/johndoe)
- LinkedIn: [linkedin.com/in/johndoe](https://linkedin.com/in/johndoe)
`;

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      markdown: defaultMarkdown.trim(),
      setMarkdown: (md) => set({ markdown: md }),
      theme: 'glassmorphism',
      setTheme: (theme) => set({ theme }),
      sections: [
        { id: 'hero', title: 'Hero', visible: true, content: '' },
        { id: 'about', title: 'About', visible: true, content: '' },
        { id: 'skills', title: 'Skills', visible: true, content: '' },
        { id: 'projects', title: 'Projects', visible: true, content: '' },
        { id: 'experience', title: 'Experience', visible: true, content: '' },
        { id: 'contact', title: 'Contact', visible: true, content: '' },
      ],
      setSections: (sections) => set({ sections }),
      updateSection: (id, updates) =>
        set((state) => ({
          sections: state.sections.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        })),
    }),
    {
      name: 'devportfolio-storage',
    }
  )
);

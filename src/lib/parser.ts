export interface ParsedData {
  hero: { name: string; title: string };
  about: string;
  skills: string[];
  projects: { title: string; description: string; tech: string }[];
  experience: { title: string; date: string; details: string[] }[];
  contact: { type: string; value: string; link?: string }[];
}

export function parseMarkdown(markdown: string): ParsedData {
  const lines = markdown.split('\n');
  const data: ParsedData = {
    hero: { name: '', title: '' },
    about: '',
    skills: [],
    projects: [],
    experience: [],
    contact: [],
  };

  let currentSection = '';
  let currentProject: any = null;
  let currentExperience: any = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('# ')) {
      data.hero.name = line.replace('# ', '');
      currentSection = 'hero';
    } else if (line.startsWith('**') && currentSection === 'hero') {
      data.hero.title = line.replace(/\*\*/g, '');
    } else if (line.startsWith('## ')) {
      currentSection = line.replace('## ', '').toLowerCase();
    } else {
      switch (currentSection) {
        case 'about':
          data.about += line + '\n';
          break;
        case 'skills':
          if (line.startsWith('- ')) {
            data.skills.push(line.replace('- ', ''));
          }
          break;
        case 'projects':
          if (line.startsWith('### ')) {
            if (currentProject) data.projects.push(currentProject);
            currentProject = { title: line.replace('### ', ''), description: '', tech: '' };
          } else if (line.startsWith('*Tech:')) {
            if (currentProject) currentProject.tech = line.replace(/\*/g, '').replace('Tech: ', '');
          } else if (currentProject) {
            currentProject.description += line + '\n';
          }
          break;
        case 'experience':
          if (line.startsWith('### ')) {
            if (currentExperience) data.experience.push(currentExperience);
            currentExperience = { title: line.replace('### ', ''), date: '', details: [] };
          } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
            if (currentExperience) currentExperience.date = line.replace(/\*/g, '');
          } else if (line.startsWith('- ')) {
            if (currentExperience) currentExperience.details.push(line.replace('- ', ''));
          }
          break;
        case 'contact':
          if (line.startsWith('- ')) {
            const contactLine = line.replace('- ', '');
            const parts = contactLine.split(': ');
            if (parts.length >= 2) {
              const type = parts[0];
              const valuePart = parts.slice(1).join(': ');
              
              // Check for markdown link [text](url)
              const linkMatch = valuePart.match(/\[(.*?)\]\((.*?)\)/);
              if (linkMatch) {
                data.contact.push({ type, value: linkMatch[1], link: linkMatch[2] });
              } else {
                data.contact.push({ type, value: valuePart });
              }
            }
          }
          break;
      }
    }
  }

  if (currentProject) data.projects.push(currentProject);
  if (currentExperience) data.experience.push(currentExperience);

  return data;
}

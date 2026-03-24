<div align="center">

# ✨ DevPortfolio AI

### Convert Markdown Resumes into Beautiful, Animated Portfolio Websites

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache_2.0-green?style=for-the-badge)](LICENSE)

<br/>

> **DevPortfolio AI** is a modern SaaS-style web application that lets you write your resume in simple Markdown and instantly preview it as a stunning, animated portfolio website — complete with multiple themes, smooth animations, and one-click deployment to GitHub Pages.

<br/>

</div>

---

## 🚀 Features

| Feature | Description |
|---|---|
| 📝 **Split-Screen Editor** | Write Markdown on the left, see your live portfolio preview on the right |
| 🎨 **4 Premium Themes** | Minimal, Glassmorphism, Neon Cyberpunk, and Dark Developer |
| 🎬 **Framer Motion Animations** | Smooth entrance animations, blur text reveals, spring-based skill tags, and tilted project cards |
| 📦 **Drag & Drop Sections** | Reorder and toggle visibility of Hero, About, Skills, Projects, Experience, and Contact sections |
| 🌐 **One-Click GitHub Deploy** | Deploy your portfolio to GitHub Pages directly from the app using a Personal Access Token |
| 📥 **ZIP Export** | Download your portfolio as a ready-to-host ZIP file with `index.html` and `resume.md` |
| 🧭 **Sticky Navigation** | Auto-generated navbar with smooth scroll navigation to each section |
| ✨ **Particle Background** | Interactive tsParticles background for an immersive visual experience |
| 💾 **Persistent State** | Your content, theme, and layout choices are saved automatically via Zustand + localStorage |

---

## 🖼️ Themes Preview

| Minimal | Glassmorphism | Neon Cyberpunk | Dark Developer |
|---|---|---|---|
| Clean white background with subtle gray cards | Gradient backdrop with frosted glass cards and blur effects | Black background with green glow, monospace font, and neon borders | Deep dark tones with refined gray card borders |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 19 |
| **Language** | TypeScript 5.8 |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion (`motion`) |
| **State Management** | Zustand (with `persist` middleware) |
| **Icons** | Lucide React |
| **Particles** | tsParticles |
| **GitHub Integration** | Octokit REST |
| **Export** | JSZip + FileSaver.js |
| **Drag & Drop** | @hello-pangea/dnd |

---

## 📁 Project Structure

```
Portfolio-creating-page/
├── index.html                  # Entry HTML file
├── vite.config.ts              # Vite configuration with Tailwind & React plugins
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
├── .env.example                # Environment variable template
├── metadata.json               # App metadata (name, description)
└── src/
    ├── main.tsx                # React entry point
    ├── App.tsx                 # Root layout with Editor, Preview, and SectionManager
    ├── index.css               # Global styles
    ├── components/
    │   ├── Editor.tsx          # Markdown text editor panel
    │   ├── Preview.tsx         # Live portfolio preview with themed sections
    │   ├── Toolbar.tsx         # Top toolbar with theme switcher, export & deploy buttons
    │   ├── SectionManager.tsx  # Drag-and-drop section visibility controller
    │   ├── DeployModal.tsx     # GitHub Pages deployment modal (via Octokit)
    │   ├── ParticlesBackground.tsx  # tsParticles animated background
    │   ├── BlurText.tsx        # Animated blur-in text reveal component
    │   ├── ShinyText.tsx       # Shiny gradient text effect
    │   └── TiltedCard.tsx      # 3D tilt hover effect card wrapper
    ├── lib/
    │   ├── parser.ts           # Markdown-to-structured-data parser
    │   └── utils.ts            # Utility functions (e.g., className merging)
    └── store/
        └── useStore.ts         # Zustand global state (markdown, theme, sections)
```

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Vigneshwaran2502/Portfolio-creating-page.git
   cd Portfolio-creating-page
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   ```

   Open `.env.local` and replace the placeholder values:

   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

---

## 📖 How to Use

### 1. Write Your Resume in Markdown

Use the editor panel on the left to write your resume. The app parses standard Markdown structure:

```markdown
# Your Name
**Your Title**

## About
A brief introduction about yourself...

## Skills
- Skill 1
- Skill 2
- Skill 3

## Projects
### Project Name
Description of your project.
*Tech: React, Node.js, etc.*

## Experience
### Job Title @ Company
*Start Date - End Date*
- Achievement or responsibility
- Another bullet point

## Contact
- Email: your@email.com
- GitHub: [github.com/you](https://github.com/you)
- LinkedIn: [linkedin.com/in/you](https://linkedin.com/in/you)
```

### 2. Choose a Theme

Click the theme buttons in the toolbar to switch between **Minimal**, **Glassmorphism**, **Neon Cyberpunk**, and **Dark Developer**.

### 3. Manage Sections

Use the Section Manager (visible on larger screens) to:
- **Drag & drop** to reorder sections
- **Toggle visibility** to show/hide specific sections

### 4. Export or Deploy

- **Export**: Click the **Export** button to download a ZIP file containing your portfolio
- **Deploy**: Click the **Deploy** button, enter your GitHub Personal Access Token (with `repo` and `workflow` scopes), and deploy directly to GitHub Pages

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run TypeScript type checking |
| `npm run clean` | Remove the `dist` folder |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **Apache License 2.0** — see the source files for details.

---

<div align="center">

**Built with ❤️ by [Vigneshwaran](https://github.com/Vigneshwaran2502)**

</div>

# Ryza Blog - Modern Editorial Platform

A high-performance, aesthetically crafted blog platform built with React, TypeScript, and Vite. Features a dynamic layout engine, rich content management system, and immersive reading experiences.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8)

## ✨ Features

### 🎨 Dynamic Layouts
- **Classic Editorial**: Traditional, clean typography-focused layout.
- **Modern Minimalist**: Bold headings, asymmetrical layouts, and ample whitespace.
- **Cinematic Cover**: Full-screen immersive background images with overlaid text.
- **Magazine Grid**: Structured, information-dense layouts for featured content.
- **Split Screen**: 50/50 visual and text balance for storytelling.

### 🛠️ Powerful Admin Dashboard
- **Content Management**: Create, edit, and delete posts with a rich text editor.
- **Section Reordering**: Drag-and-drop interface to rearrange post sections (Intro, TOC, Gallery, Newsletter, etc.).
- **Live Preview**: See changes instantly as you edit.
- **Global Settings**: Configure site metadata, navigation, and SEO settings.

### 🖼️ Enhanced Media Experience
- **Global Lightbox**: Click any image across the site to view it in a high-quality, full-screen lightbox.
- **Smart Placeholders**: Graceful handling of missing or broken images.
- **Responsive Galleries**: Beautifully arranged image grids that adapt to any screen size.

### ⚡ Performance & Tech Stack
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) for blazing fast development and production builds.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with `clsx` and `tailwind-merge`.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth transitions and scroll effects.
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives + [Lucide React](https://lucide.dev/) icons.
- **Routing**: [React Router v7](https://reactrouter.com/) for client-side navigation.
- **State Management**: React Context + Hooks.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ryza-blog.git
    cd ryza-blog
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

    The app will be available at `http://localhost:5173`.

## 📦 Deployment (GitHub Pages)

This project is pre-configured for deployment to GitHub Pages.

### 1. Configuration
Update the following files with your repository details:

-   **`vite.config.ts`**:
    ```typescript
    base: "/your-repo-name/", // Replace with your repository name
    ```

-   **`package.json`**:
    ```json
    "homepage": "https://yourusername.github.io/your-repo-name",
    ```

### 2. Deploy
Run the deployment script:

```bash
npm run deploy
```

This will run the build process and push the `dist` folder to the `gh-pages` branch of your repository.

## 📂 Project Structure

```
src/
├── components/
│   ├── admin/       # Dashboard & editor components
│   ├── auth/        # Authentication components
│   ├── sections/    # Reusable section components (Hero, Gallery, etc.)
│   ├── shared/      # Shared UI elements (Navbar, Footer, Buttons)
│   └── ui/          # Generic UI primitives (Dialog, Input, Lightbox)
├── layouts/         # Page layouts (Public, Admin, Root)
├── lib/             # Utilities and helper functions
├── pages/           # Application pages (Public & Admin)
├── router/          # React Router configuration
├── styles/          # Global styles and Tailwind configuration
└── types/           # TypeScript definitions
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Your Name]

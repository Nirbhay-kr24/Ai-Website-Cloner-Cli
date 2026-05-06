# AI Website Cloner CLI

AI Website Cloner CLI is an AI-powered command-line application that generates modern responsive website frontends inspired by existing websites using Large Language Models (LLMs).

The project uses:
- Playwright for website automation and structure extraction
- Groq API for AI-powered frontend generation
- Node.js for backend CLI execution

The application captures website structure, analyzes layout hierarchy, and generates:
- HTML
- CSS
- JavaScript

for a modern responsive frontend design.


# Features

- AI-powered website frontend generation
- Website structure extraction using Playwright
- Responsive modern UI generation
- Multi-line prompt support
- Automatic project folder creation
- HTML, CSS, and JavaScript generation
- Automatic code formatting using Prettier
- Automatic website preview in browser
- External CSS and JavaScript support
- CLI-based workflow
- Modern SaaS-style UI generation



# Technologies Used

- Node.js
- Groq API
- Playwright
- JavaScript (ES Modules)



# Project Structure

```bash
AI-Website-Cloner/
│
├── scaler_clone/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── index.js
├── package.json
├── package-lock.json
├── README.md
├── PROJECT_DETAILS.md
└── .gitignore
````



# Installation

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-website-cloner-cli.git
```

## 2. Navigate Into Project

```bash
cd ai-website-cloner-cli
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Install Playwright Browser

```bash
npx playwright install
```

## 5. Create .env File

```env
GROQ_API_KEY=your_groq_api_key
```



# Running The Project

Start the CLI:

```bash
node index.js
```



# Example Prompt

```txt
Create a premium responsive ed-tech landing page inspired by https://scaler.com in scaler_clone folder.

Generate:
- index.html
- style.css
- script.js

Visual Design:
- modern minimalist ed-tech UI
- white and light gray background
- dark navy typography
- blue accent colors
- premium clean spacing
- professional layout hierarchy
- large whitespace between sections
- subtle borders and shadows
- rounded rectangular cards
- polished SaaS-style design

Required Sections:
1. Sticky navbar with logo, navigation links, and CTA button
2. Hero section with bold headline, subtext, and CTA buttons
3. Program/category tabs section
4. AI engineering and program cards section
5. Statistics and career outcomes section
6. Mentor/instructor profile cards
7. Curriculum/features section
8. Student testimonials section
9. Blog/news cards section
10. Enterprise/company partnership section
11. FAQ accordion section
12. Multi-column footer with links and social icons

Card Design:
- rectangular bordered cards
- clean shadows
- subtle hover effects
- modern spacing
- professional typography

Technical Requirements:
- semantic HTML
- reusable CSS classes
- responsive flexbox/grid layouts
- organized CSS structure
- mobile responsive
- accessible design
- no frameworks
- no animations
- no videos
- production-quality UI

IMPORTANT:
- closely match the structure and feel of modern Scaler-style websites
- avoid generic startup templates
- focus on spacing, typography, section hierarchy, and professional layout quality
- create a polished modern ed-tech interface

Return complete HTML, CSS, and JavaScript only.
```


# Workflow

1. User enters a prompt in the CLI
2. Playwright opens the target website
3. Website structure is extracted
4. Structure is sent to Groq AI
5. AI generates:

   * HTML
   * CSS
   * JavaScript
6. Files are automatically formatted
7. Generated website opens in browser


# Output Files

Generated project contains:

* `index.html`
* `style.css`
* `script.js`

inside the generated project folder.


# Key Concepts Used

## Playwright Automation

Used for:

* website loading
* screenshot capture
* structure extraction




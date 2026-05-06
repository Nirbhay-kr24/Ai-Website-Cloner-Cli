# 🤖 AI Agent CLI - Website Generator

A conversational CLI tool that uses AI to generate website clones. This agent reasons through tasks step-by-step and creates fully functional HTML, CSS, and JavaScript files that visually resemble the target website.

## 🎯 Features

- **AI-Powered Reasoning**: Uses Groq's LLaMA model with a sophisticated reasoning loop
- **Step-by-Step Processing**: Implements INPUT → THINK → TOOL → OBSERVE → OUTPUT workflow
- **Website Generation**: Creates professional HTML, CSS, and JavaScript for website clones
- **Scaler Website Clone**: Pre-configured to generate a website resembling Scaler Academy
- **Interactive CLI**: User-friendly terminal interface for chatting with the AI agent
- **Auto Browser Opening**: Automatically opens generated websites in your default browser
- **File Management**: Creates organized folder structures for generated projects

## 📋 Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **Groq API Key** (Get it from [console.groq.com](https://console.groq.com) - FREE tier available!)

## 🚀 Installation

1. **Clone or download the project**:
   ```bash
   cd "AI Agent Cli"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the project root:
   ```bash
   cp .env.example .env
   ```

4. **Add your Groq API Key** to `.env`:
   ```
   GROQ_API_KEY=gsk_your_actual_api_key_here
   ```

## 🎮 Usage

### Starting the CLI

```bash
npm start
```

### Example Interactions

**Task 1**: Create a Scaler website clone
```
You: Create a Scaler website clone in a folder called my_scaler_site
Agent: [Reasons through the task and generates HTML, CSS, JS files]
Result: Opens the website in your browser
```

**Task 2**: Generate a modified version
```
You: Create a Scaler website clone with a dark theme
Agent: [Generates files with dark theme styling]
```

**Exit the CLI**:
```
You: exit
```

## 🏗️ Project Structure

```
Ai Agent Cli/
├── index.js                 # Main CLI entry point
├── tools.js                 # Tool definitions for AI agent
├── package.json             # Project dependencies
├── .env.example             # Environment variables template
├── .env                     # Your API key (create this)
├── README.md               # This file
└── [generated_sites]/      # Output folders created by agent
    ├── scaler_website_clone/
    ├── index.html
    ├── styles.css
    └── script.js
```

## 🛠️ How It Works

### Agent Loop Architecture

The AI agent follows a sophisticated reasoning loop:

1. **START**: Agent recognizes the user's task
2. **THINK**: Agent breaks down the problem into steps (multiple thinking iterations)
3. **TOOL**: Agent calls available tools (file creation, folder creation, etc.)
4. **OBSERVE**: Agent waits for tool results and incorporates feedback
5. **OUTPUT**: Agent provides final summary and opens website in browser

### Available Tools

The AI agent has access to these tools:

| Tool | Purpose |
|------|---------|
| `createFile` | Creates HTML, CSS, or JS files with content |
| `createFolder` | Creates project directories |
| `generateScalerHTML` | Generates Scaler-like HTML structure |
| `generateScalerCSS` | Generates professional CSS styling |
| `generateScalerJS` | Generates interactive JavaScript |
| `openInBrowser` | Launches generated website in browser |
| `listFiles` | Lists files in a directory |
| `readFile` | Reads file contents |
| `executeCommand` | Runs system commands |

## 📊 Generated Website Features

### Scaler Website Clone Includes

✅ **Header Section**
- Sticky navigation bar
- Logo and menu items
- Call-to-action button

✅ **Hero Section**
- Eye-catching gradient background
- Main headline and subtitle
- Large CTA button
- Animated code block illustration

✅ **Courses Section**
- 3-column responsive grid
- Course cards with hover effects
- Icon and description for each course

✅ **Footer Section**
- Multi-column footer layout
- Links and social media references
- Copyright information

✅ **Design Features**
- Responsive design (works on mobile, tablet, desktop)
- Smooth scrolling navigation
- Hover animations and transitions
- Modern color scheme (red and blue gradient)
- Professional typography

## 🎨 Customization

### Modifying the Generated HTML

After generation, you can manually edit the HTML files:

```bash
# Navigate to the generated folder
cd scaler_website_clone

# Edit with your preferred editor
code index.html
```

### Changing Colors

In `styles.css`, modify the CSS variables:

```css
:root {
    --primary-color: #ff6b6b;      /* Change red */
    --secondary-color: #4d96ff;    /* Change blue */
    --text-dark: #1a1a1a;          /* Change text color */
    --bg-light: #f8f9fa;           /* Change background */
}
```

## 🔧 Development

### Watch Mode (Auto-restart on changes)

```bash
npm run dev
```

### Project Dependencies

- **openai**: OpenAI API client for GPT-4 integration
- **axios**: HTTP client (optional, for future API calls)
- **dotenv**: Environment variable management
- **readline**: Built-in Node.js module for CLI input

## 📝 Example Prompts

Try these instructions with the AI agent:

1. "Create a Scaler website clone in a folder called scaler_academy"
2. "Generate a Scaler-like website with modern dark theme styling"
3. "Build a Scaler website clone with added testimonials section"
4. "Create a Scaler Academy website and add animation effects"
5. "Generate a website similar to Scaler with custom color scheme"

## ⚙️ System Prompt

The AI agent uses a detailed system prompt that guides it to:

- Follow the THINK → TOOL → OBSERVE pattern
- Break complex tasks into smaller steps
- Generate professional, production-ready code
- Create well-organized project structures
- Automatically open results in the browser

The system prompt is customizable in `index.js` for different website types.

## 🐛 Troubleshooting

### Issue: "Cannot find module 'openai'"
**Solution**: Run `npm install` to install all dependencies

### Issue: "OPENAI_API_KEY is not defined"
**Solution**: Create a `.env` file and add your API key:
```
OPENAI_API_KEY=your_key_here
```

### Issue: Browser doesn't open automatically
**Solution**: The HTML files are still created. Manually open them:
- Windows: Double-click the `index.html` file
- Mac: `open path/to/index.html`
- Linux: `xdg-open path/to/index.html`

### Issue: Agent loops too many times
**Solution**: The agent has a 50-step limit to prevent infinite loops. Try simpler instructions.

## 📈 Performance Tips

- Use specific, clear instructions for faster execution
- Shorter prompts tend to be processed faster
- First run may take longer (API initialization)
- Subsequent runs are faster

## 🔐 Security

- Your API key is stored locally in `.env`
- Never commit `.env` to version control
- The `.gitignore` file should include `.env`
- API calls are made securely over HTTPS

## 📚 Learning Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [CSS Guide](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 🤝 Contributing

Feel free to:
- Extend the tool set with new capabilities
- Add support for different website types
- Improve the AI system prompt for better results
- Optimize performance and error handling

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review your API key and `.env` setup
3. Ensure Node.js version is compatible (v18+)
4. Check your internet connection

## 🎓 For YouTube Demo

When creating your YouTube demo:

1. **Setup** (30 seconds): Show the folder structure and dependencies
2. **Running the Agent** (60-90 seconds): Run `npm start` and give it an instruction
3. **Execution** (30-60 seconds): Show the agent's reasoning loop with outputs
4. **Result** (30 seconds): Show the generated website opening in the browser
5. **Conclusion** (10 seconds): Summary of what was created

---

**Happy coding! 🚀**

Created with ❤️ for AI Agent Development

import "dotenv/config";
import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import readline from "readline";
import { exec } from "child_process";
import { chromium } from "playwright";
import prettier from "prettier";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (question) =>
  new Promise((resolve) =>
    rl.question(question, resolve)
  );

function createProjectFolder(folderName) {

  if (!fs.existsSync(folderName)) {

    fs.mkdirSync(folderName, {
      recursive: true,
    });
  }
}

async function writeFile(
  filePath,
  content
) {

  try {

    let parser = "babel";

    if (
      filePath.endsWith(".html")
    ) {
      parser = "html";
    }

    else if (
      filePath.endsWith(".css")
    ) {

      parser = "css";

      content = content
        .replace(/<style>/g, "")
        .replace(/<\/style>/g, "");
    }

    else if (
      filePath.endsWith(".js")
    ) {

      content = content
        .replace(/<script>/g, "")
        .replace(/<\/script>/g, "");
    }

    const formatted =
      await prettier.format(content, {
        parser,
      });

    fs.writeFileSync(
      filePath,
      formatted.trim(),
      "utf8"
    );

  }

  catch {

    fs.writeFileSync(
      filePath,
      content.trim(),
      "utf8"
    );
  }
}

function openWebsite(filePath) {

  const command =
    process.platform === "win32"
      ? "start"
      : "open";

  exec(
    `${command} "" "${filePath}"`
  );
}

function extractProjectName(input) {

  const match =
    input.match(
      /in\s+([a-zA-Z0-9_-]+)/i
    );

  return match
    ? match[1]
    : "website_clone";
}

function extractWebsiteURL(input) {

  const match =
    input.match(
      /(https?:\/\/[^\s]+)/i
    );

  return match
    ? match[1]
    : "";
}

async function captureWebsite(
  url,
  projectName
) {

  const browser =
    await chromium.launch({
      headless: true,
    });

  const page =
    await browser.newPage({
      viewport: {
        width: 1440,
        height: 900,
      },
    });

  try {

    const cleanUrl =
      url.replace("www.", "");

    await page.goto(cleanUrl, {
      waitUntil:
        "domcontentloaded",

      timeout: 60000,
    });

    await page.waitForTimeout(
      3000
    );

    const screenshotPath =
      path.join(
        projectName,
        "website.png"
      );

    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    await browser.close();

    return screenshotPath;

  }

  catch (err) {

    await browser.close();

    throw new Error(
      `Browser failed to reach URL: ${err.message}`
    );
  }
}

async function extractHTMLStructure(
  url
) {

  const browser =
    await chromium.launch({
      headless: true,
    });

  const page =
    await browser.newPage();

  try {

    const cleanUrl =
      url.replace("www.", "");

    await page.goto(cleanUrl, {
      waitUntil:
        "domcontentloaded",

      timeout: 60000,
    });

    await page.waitForTimeout(
      3000
    );

    const structure =
      await page.evaluate(() => {

        const clone =
          document.body.cloneNode(true);

        clone
          .querySelectorAll(
            "script, style, noscript, iframe, video"
          )
          .forEach((el) =>
            el.remove()
          );

        return clone.innerHTML;
      });

    await browser.close();

    return structure
  .replace(/\s+/g, " ")
  .replace(/data-[^=]+="[^"]*"/g, "")
  .replace(/aria-[^=]+="[^"]*"/g, "")
  .slice(0, 6000);
  }

  catch (err) {

    await browser.close();

    throw new Error(
      `Failed to extract structure: ${err.message}`
    );
  }
}

async function generateWebsite(
  websiteUrl,
  fullPrompt,
  structure
) {

  const promptText = `
${fullPrompt}

Cleaned Website HTML Structure:
${structure}

Use the HTML structure to understand:
- layout hierarchy
- card organization
- section flow
- content grouping
- responsive structure

Design Requirements:
- modern SaaS UI
- Inter font
- white/light gray background
- dark navy typography
- subtle shadows
- border-radius: 16px
- premium spacing system
- CSS Grid and Flexbox
- polished buttons
- professional typography hierarchy

Avoid:
- tutorial-style layouts
- Arial font
- outdated gradients
- generic templates

Technical Requirements:
- semantic HTML5
- external CSS only
- external JavaScript only
- reusable CSS classes
- responsive design
- no frameworks
- no animations
- no videos

The HTML MUST include:

<link rel="stylesheet" href="style.css">

and:

<script src="script.js"></script>

IMPORTANT:
- Do NOT truncate output
- Do NOT skip CSS
- Do NOT skip JS
- Return complete code for all sections

Return ONLY in this exact format:

---HTML---
html code

---CSS---
css code

---JS---
javascript code

DO NOT:
- write explanations
- write markdown
- use backticks
`;

  const completion =
    await groq.chat.completions.create({
      model:
        "llama-3.1-8b-instant",

      messages: [
        {
          role: "user",
          content: promptText,
        },
      ],

      temperature: 0.1,

      max_tokens: 3500,
    });

  return completion
    .choices[0]
    .message.content;
}

async function runAgent(
  userInput
) {

  console.log(
    "\n" + "=".repeat(50)
  );

  console.log(
    "Starting Website Clone Process..."
  );

  console.log(
    "=".repeat(50)
  );

  try {

    const projectName =
      extractProjectName(
        userInput
      );

    const websiteUrl =
      extractWebsiteURL(
        userInput
      );

    if (!websiteUrl) {

      console.log(
        "No URL found in prompt."
      );

      return;
    }

    createProjectFolder(
      projectName
    );

    console.log(
      `Step 1: Capturing ${websiteUrl}...`
    );

    await captureWebsite(
      websiteUrl,
      projectName
    );

    console.log(
      "✔ Screenshot Captured"
    );

    console.log(
      "Step 2: Extracting Structure..."
    );

    const structure =
      await extractHTMLStructure(
        websiteUrl
      );

    fs.writeFileSync(
      "structure.html",
      structure
    );

    console.log(
      "✔ Structure Extracted"
    );

    console.log(
      "Step 3: Generating Website..."
    );

    const result =
      await generateWebsite(
        websiteUrl,
        userInput,
        structure
      );

    fs.writeFileSync(
      "debug-response.txt",
      result
    );

    const htmlMatch =
      result.match(
        /---HTML---([\s\S]*?)---CSS---/i
      );

    const cssMatch =
      result.match(
        /---CSS---([\s\S]*?)---JS---/i
      );

    const jsMatch =
      result.match(
        /---JS---([\s\S]*)/i
      );

    const html =
      htmlMatch?.[1]?.trim();

    const css =
      cssMatch?.[1]?.trim();

    const js =
      jsMatch?.[1]?.trim();

    if (!html || !css) {

      console.log(
        "\nDEBUG RESPONSE SAVED"
      );

      throw new Error(
        "Malformed AI response. Check debug-response.txt"
      );
    }

    const htmlPath =
      path.join(
        projectName,
        "index.html"
      );

    const cssPath =
      path.join(
        projectName,
        "style.css"
      );

    const jsPath =
      path.join(
        projectName,
        "script.js"
      );

    await writeFile(
      htmlPath,
      html
    );

    await writeFile(
      cssPath,
      css
    );

    await writeFile(
      jsPath,
      js ||
`
document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log(
      "Website Loaded"
    );
  }
);
`
    );

    console.log(
      "\n✅ Files Generated Successfully"
    );

    console.log(
      `- ${htmlPath}`
    );

    console.log(
      `- ${cssPath}`
    );

    console.log(
      `- ${jsPath}`
    );

    console.log(
      "\nOpening Website..."
    );

    openWebsite(
      htmlPath
    );

  }

  catch (err) {

    console.log(
      "\n❌ Error:"
    );

    console.log(
      err.message
    );
  }
}

async function main() {

  console.clear();

  console.log(
    "AI Website Cloner CLI"
  );

  console.log(
    'Press ENTER twice to submit. Type "exit" to quit.\n'
  );

  while (true) {

    let lines = [];

    while (true) {

      const line =
        await prompt("> ");

      if (
        line
          .trim()
          .toLowerCase() ===
        "exit"
      ) {

        rl.close();

        return;
      }

      if (
        line.trim() === ""
      ) {
        break;
      }

      lines.push(line);
    }

    const userInput =
      lines.join("\n").trim();

    if (userInput) {

      await runAgent(
        userInput
      );
    }
  }
}

main();
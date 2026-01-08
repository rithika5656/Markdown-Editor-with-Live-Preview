// Get elements from the DOM
const markdownInput = document.getElementById('markdown-input');
const markdownPreview = document.getElementById('markdown-preview');

// Initialize marked options for better rendering
marked.setOptions({
    breaks: true,
    gfm: true,
});

// Function to update preview
function updatePreview() {
    const markdownText = markdownInput.value;
    const htmlOutput = marked.parse(markdownText);
    markdownPreview.innerHTML = htmlOutput;
}

// Update preview on input event with debouncing for better performance
let updateTimeout;
markdownInput.addEventListener('input', () => {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(updatePreview, 100);
});

// Load saved content from localStorage
window.addEventListener('load', () => {
    const savedContent = localStorage.getItem('markdownContent');
    if (savedContent) {
        markdownInput.value = savedContent;
        updatePreview();
    }
});

// Save content to localStorage as user types
markdownInput.addEventListener('input', () => {
    localStorage.setItem('markdownContent', markdownInput.value);
});

// Sample markdown content for first-time users
const sampleMarkdown = `# Welcome to Markdown Editor

Start typing markdown on the left to see the formatted output on the right!

## Features
- **Live Preview**: See changes in real-time
- **Local Storage**: Your content is saved automatically
- **Support for:**
  - Headings (h1-h6)
  - **Bold** and *italic* text
  - [Links](https://github.com)
  - Code blocks
  - Lists and tables
  - And more!

### Code Example
\`\`\`javascript
function hello() {
  console.log('Hello, Markdown!');
}
\`\`\`

### Blockquote
> This is a blockquote. You can use it to highlight important information.

### Table
| Feature | Status |
|---------|--------|
| Live Preview | ✓ |
| Auto-save | ✓ |
| Dark Mode | Coming Soon |

---

**Happy Editing!** 🎉`;

// Check if it's first time and no saved content
if (!localStorage.getItem('markdownContent')) {
    markdownInput.value = sampleMarkdown;
    updatePreview();
}

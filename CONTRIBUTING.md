# Contributing to Traditional Musical Instruments of Nepal Platform

Thank you for your interest in contributing to the preservation of Nepal's musical heritage! We welcome contributions from developers, musicians, researchers, designers, and cultural enthusiasts.

## 🌟 Ways to Contribute

### 1. Code Contributions
- Fix bugs and issues
- Implement new features
- Improve performance
- Enhance accessibility
- Write tests
- Update documentation

### 2. Content Contributions
- Add instrument information
- Provide audio recordings
- Create 3D models
- Write educational content
- Translate content
- Verify cultural accuracy

### 3. Design Contributions
- Improve UI/UX
- Create graphics and illustrations
- Design promotional materials
- Enhance responsive layouts

### 4. Research Contributions
- Ethnomusicological research
- Historical documentation
- Cultural context
- Playing technique guides

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Git
- Code editor (VS Code recommended)
- Basic knowledge of React (for code contributions)

### Setup Development Environment

1. **Fork the repository**
   - Visit https://github.com/yourusername/nepali-instruments-platform
   - Click "Fork" button

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/nepali-instruments-platform.git
   cd nepali-instruments-platform
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/original/nepali-instruments-platform.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style

- Use ES6+ JavaScript features
- Follow React best practices and hooks patterns
- Use functional components over class components
- Keep components small and focused
- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing file structure

### CSS Guidelines

- Use CSS custom properties (variables) defined in `index.css`
- Follow BEM naming convention when appropriate
- Keep styles modular and component-specific
- Ensure responsive design (mobile-first)
- Test on multiple screen sizes

### Component Guidelines

```jsx
// Example component structure

import { useState } from 'react'
import './ComponentName.css'

/**
 * Brief description of what the component does
 * @param {Object} props - Component props
 */
function ComponentName({ prop1, prop2 }) {
  const [state, setState] = useState(initialValue)

  const handleAction = () => {
    // Handle action
  }

  return (
    <div className="component-name">
      {/* Component JSX */}
    </div>
  )
}

export default ComponentName
```

### Commit Messages

Follow conventional commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(instruments): add filter by era functionality
fix(audio): resolve playback issue on Safari
docs(readme): update installation instructions
style(navbar): improve mobile menu animation
```

## 🔍 Pull Request Process

### Before Submitting

1. **Test your changes**
   - Run the development server
   - Test on different browsers
   - Check mobile responsiveness
   - Verify no console errors

2. **Update documentation**
   - Update README if needed
   - Add comments to complex code
   - Update TODO.md if adding features

3. **Keep it focused**
   - One feature/fix per PR
   - Keep changes minimal and focused
   - Don't mix formatting changes with features

### Submitting a Pull Request

1. **Sync with upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Fill in the PR template
   - Link related issues

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots (if applicable)
[Add screenshots]

## Testing
- [ ] Tested locally
- [ ] Tested on mobile
- [ ] Tested on different browsers
- [ ] Added/updated tests

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console warnings/errors
```

## 🐛 Reporting Bugs

### Before Reporting
- Check if the bug has already been reported
- Try to reproduce on latest version
- Check if it's a known issue in TODO.md

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable, add screenshots

## Environment
- Browser: [e.g., Chrome 100]
- OS: [e.g., Windows 10]
- Device: [e.g., Desktop, iPhone 12]
- Screen size: [e.g., 1920x1080]

## Additional Context
Any other relevant information
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
## Feature Description
Clear description of the proposed feature

## Problem It Solves
What problem does this feature address?

## Proposed Solution
How should this feature work?

## Alternatives Considered
What other solutions did you consider?

## Additional Context
Mockups, examples, or references

## Cultural Considerations
Any cultural aspects to consider?
```

## 🎨 Content Contribution Guidelines

### Adding Instruments

1. **Gather Information**
   - Accurate name(s) and spellings
   - Category (String, Wind, Percussion)
   - Region(s) of use
   - Historical context
   - Cultural significance
   - Construction materials
   - Playing techniques

2. **Media Requirements**
   - **Images**: High quality (min 1200x800px), properly lit
   - **Audio**: Clear recording, WAV or high-quality MP3
   - **3D Models**: Optimized GLB/GLTF format
   - **Attribution**: Proper credits for all media

3. **Cultural Sensitivity**
   - Verify information with experts
   - Respect religious/cultural significance
   - Use appropriate terminology
   - Avoid stereotypes or generalizations

### Expert Profiles

Requirements for adding expert profiles:
- Verified credentials and experience
- Consent from the individual
- Professional photo
- Audio/video with permission
- Contact information (if they agree)

## 🌍 Translation Guidelines

### For Translators

1. **Maintain Tone**
   - Keep formal, respectful tone
   - Preserve cultural nuances
   - Use appropriate honorifics

2. **Technical Terms**
   - Keep instrument names in original
   - Add transliteration where helpful
   - Include pronunciation guides

3. **Format**
   - Use proper JSON structure
   - Test special characters
   - Maintain HTML structure

## ✅ Code Review Process

### For Reviewers

- Check code quality and style
- Test functionality
- Verify responsive design
- Check for accessibility
- Ensure cultural accuracy (for content)
- Provide constructive feedback
- Approve when ready

### For Contributors

- Respond to feedback promptly
- Make requested changes
- Ask questions if unclear
- Be patient with review process
- Thank reviewers for their time

## 📞 Communication

### Community Channels

- **GitHub Issues**: Bug reports, feature requests
- **Email**: info@nepaliinstruments.edu.np
- **Discussions**: GitHub Discussions (for questions)

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the project
- Show empathy towards others

## 🏆 Recognition

Contributors will be:
- Listed in the project's contributors page
- Credited in release notes
- Acknowledged in documentation (if significant contribution)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

Don't hesitate to ask! We're here to help:
- Open a GitHub Discussion
- Email: info@nepaliinstruments.edu.np
- Tag maintainers in your PR

---

**Thank you for helping preserve Nepal's musical heritage! 🎵**

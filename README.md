# Portfolio Website - Brittany Chiang Style

A modern, responsive portfolio website inspired by Brittany Chiang's design. This is a complete recreation using HTML, CSS, and JavaScript.

## 🚀 Features

### Design & Layout
- **Dark Theme**: Professional dark navy color scheme
- **Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)
- **Modern Typography**: Clean, readable fonts with proper hierarchy
- **Smooth Animations**: Subtle fade-in effects and hover interactions
- **Professional Layout**: Well-structured sections with numbered headings

### Interactive Elements
- **Fixed Navigation**: Header that hides on scroll down, shows on scroll up
- **Mobile Menu**: Hamburger menu for mobile devices
- **Experience Tabs**: Interactive tabbed interface for work experience
- **Project Showcase**: Featured projects with hover effects
- **Smooth Scrolling**: Smooth navigation between sections
- **Loading Animation**: Professional loading screen

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators
- **Skip to Content**: Quick navigation for screen readers

### Performance
- **Optimized Code**: Clean, efficient CSS and JavaScript
- **Lazy Loading**: Images load as needed
- **Smooth Performance**: Throttled scroll events for better performance

## 📁 File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🛠️ Setup Instructions

1. **Download Files**: Save all three files in the same folder
2. **Update Content**: Customize the content with your information
3. **Add Images**: Replace placeholder images with your own
4. **Test Locally**: Open `index.html` in a web browser
5. **Deploy**: Upload to your web hosting service

## ✏️ Customization Guide

### 1. Personal Information
Replace the placeholder content in `index.html`:

- **Name**: Change "Your Name" to your actual name
- **Email**: Update all email addresses
- **Social Links**: Add your actual social media profiles
- **About Section**: Write your own bio and experience
- **Skills List**: Update with your technologies
- **Projects**: Replace with your own projects

### 2. Colors (in styles.css)
The color scheme is defined in CSS variables at the top of `styles.css`:

```css
:root {
  --dark-navy: #020c1b;
  --navy: #0a192f;
  --green: #64ffda;
  /* ... more colors */
}
```

### 3. Content Sections

#### Hero Section
- Update the introduction text
- Change the call-to-action button

#### About Section
- Write your personal story
- Update the skills list
- Replace the profile image

#### Experience Section
- Add your work experience
- Update company names and descriptions
- Modify the tab system if needed

#### Projects Section
- Replace featured projects
- Update project descriptions and technologies
- Add your own project images and links

#### Contact Section
- Update contact information
- Customize the contact message

### 4. Images
Replace these placeholder images:
- Profile photo in About section
- Project screenshots
- Any other images

### 5. Resume
- Add your resume PDF file
- Update the resume link in the navigation

## 🎨 Color Scheme

The website uses a carefully crafted dark theme:

- **Background**: Dark navy (#020c1b, #0a192f)
- **Text**: Light slate colors (#8892b0, #ccd6f6)
- **Accent**: Bright cyan (#64ffda)
- **Highlights**: Light navy (#112240) for cards and sections

## 📱 Responsive Breakpoints

- **Desktop**: 1080px and above
- **Tablet**: 768px - 1079px
- **Mobile**: Below 768px

## 🚀 Deployment Options

### GitHub Pages
1. Create a GitHub repository
2. Upload all files
3. Go to repository Settings → Pages
4. Select source branch
5. Your site will be live at `username.github.io/repository-name`

### Netlify
1. Drag and drop your folder to netlify.com
2. Your site will be deployed instantly
3. Optional: Connect to GitHub for continuous deployment

### Vercel
1. Upload to Vercel dashboard
2. Instant deployment with custom domain support

### Traditional Web Hosting
1. Upload files via FTP to your web host
2. Ensure `index.html` is in the root directory

## 🛡️ Browser Support

- **Chrome**: Latest ✅
- **Firefox**: Latest ✅
- **Safari**: Latest ✅
- **Edge**: Latest ✅
- **IE**: Not supported (uses modern CSS features)

## 📚 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Calibre, Roboto Mono)

## 🔧 Development Tips

### Local Development
- Use a local server for testing (like Live Server extension in VS Code)
- Test on multiple devices and browsers
- Validate HTML and CSS

### Performance
- Optimize images (use WebP format for modern browsers)
- Minify CSS and JavaScript for production
- Consider adding a service worker for offline functionality

### SEO
- Update meta tags in HTML head
- Add Open Graph tags for social media
- Include a sitemap.xml and robots.txt

## 🎯 Key Features Explanation

### Navigation
- Fixed header that hides on scroll down for immersive reading
- Shows on scroll up for easy navigation
- Mobile-friendly hamburger menu

### Loading Screen
- Professional loading animation with logo
- Automatically hides after page load
- Improves perceived performance

### Tab System
- Interactive experience section
- Keyboard accessible
- Responsive design adapts to mobile

### Project Cards
- Hover effects for interactivity
- Clean, organized layout
- External link indicators

## 🔍 SEO Optimization

Add these to your HTML `<head>` section:

```html
<meta name="description" content="Your Name - Software Engineer Portfolio">
<meta name="keywords" content="web developer, software engineer, react, javascript">
<meta name="author" content="Your Name">

<!-- Open Graph -->
<meta property="og:title" content="Your Name - Portfolio">
<meta property="og:description" content="Software Engineer specializing in web development">
<meta property="og:image" content="https://yoursite.com/og-image.jpg">
<meta property="og:url" content="https://yoursite.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@yourusername">
```

## 🐛 Common Issues & Solutions

### Images Not Loading
- Check file paths are correct
- Ensure images are in the same directory
- Use relative paths (./images/photo.jpg)

### Fonts Not Loading
- Google Fonts requires internet connection
- Consider hosting fonts locally for offline use

### Mobile Menu Not Working
- Check JavaScript console for errors
- Ensure all JavaScript files are loaded

### Slow Performance
- Optimize image sizes
- Minify CSS and JavaScript
- Use a content delivery network (CDN)

## 📄 License

This code is provided as-is for educational and personal use. Feel free to customize and use for your own portfolio.

## 🙏 Credits

- Original design inspiration: [Brittany Chiang](https://brittanychiang.com)
- Icons: [Font Awesome](https://fontawesome.com)
- Fonts: [Google Fonts](https://fonts.google.com)

---

**Happy coding!** 🚀

For questions or issues, feel free to create an issue or reach out.
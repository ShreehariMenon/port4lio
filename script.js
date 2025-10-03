// ===== GLOBAL VARIABLES =====
let isTabletOrMobile = false;
let scrollDirection = "up";
let lastScrollTop = 0;

// ===== UTILITY FUNCTIONS =====
const debounce = (func, wait = 10, immediate = true) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

const throttle = (func, delay) => {
  let timeoutId;
  let lastExecTime = 0;
  return function (...args) {
    const currentTime = Date.now();
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

const isElement = obj => obj instanceof Element;

const querySelectorsAll = selector => {
  const elements = document.querySelectorAll(selector);
  return Array.from(elements);
};

const addClassList = (elements, className) => elements.forEach(el => el.classList.add(className));

const removeClassList = (elements, className) => elements.forEach(el => el.classList.remove(className));

// ===== DEVICE DETECTION =====
const isTabletOrMobileDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isTabletDevice = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
  const isMobileDevice = /(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|davinci|vizio|nintendo 3ds|kindle fire|silk|android.*mobile|ios|windows.*phone)/.test(userAgent);
  return isTabletDevice || isMobileDevice;
};

// ===== SMOOTH SCROLLING =====
const enableSmoothScrolling = () => {
  // Check if browser supports smooth scrolling
  if ('scrollBehavior' in document.documentElement.style) {
    return;
  }

  // Polyfill for browsers that don't support smooth scrolling
  const smoothScrollTo = (element, to, duration = 1000) => {
    const start = element.scrollTop;
    const change = to - start;
    const startDate = +new Date();

    const animateScroll = () => {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt((currentTime / duration) * change + start, 10);
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };
    animateScroll();
  };

  // Handle anchor link clicks
  const scrollLinks = querySelectorsAll('a[href^="#"]');
  scrollLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        const offsetTop = targetElement.offsetTop - 100; // Account for fixed header
        smoothScrollTo(document.documentElement, offsetTop);
      }
    });
  });
};

// ===== LOADING SCREEN =====
const handleLoading = () => {
  const loader = document.getElementById('loader');

  const hideLoader = () => {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  };

  // Hide loader after window loads
  window.addEventListener('load', () => {
    setTimeout(hideLoader, 1500); // Minimum loading time
  });

  // Failsafe: hide loader after maximum time
  setTimeout(hideLoader, 3000);
};

// ===== HEADER SCROLL BEHAVIOR =====
const handleHeaderScroll = () => {
  const header = document.getElementById('header');
  let ticking = false;

  const updateHeader = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      scrollDirection = "down";
      header.classList.add('hidden');
    } else if (scrollTop < lastScrollTop) {
      // Scrolling up
      scrollDirection = "up";
      header.classList.remove('hidden');
    }

    // Add/remove scrolled class
    if (scrollTop > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestTick);
};

// ===== MOBILE MENU =====
const handleMobileMenu = () => {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const navLinks = querySelectorsAll('.sidebar a');
  let menuOpen = false;

  const toggleMenu = () => {
    menuOpen = !menuOpen;
    hamburger.classList.toggle('active', menuOpen);
    sidebar.classList.toggle('active', menuOpen);
    sidebar.setAttribute('aria-hidden', !menuOpen);

    // Prevent body scroll when menu is open
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    if (menuOpen) {
      menuOpen = false;
      hamburger.classList.remove('active');
      sidebar.classList.remove('active');
      sidebar.setAttribute('aria-hidden', true);
      document.body.style.overflow = '';
    }
  };

  // Event listeners
  hamburger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', e => {
    if (menuOpen && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', e => {
    if (menuOpen && e.key === 'Escape') {
      closeMenu();
    }
  });

  // Close menu on window resize if it's open
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menuOpen) {
      closeMenu();
    }
  });
};

// ===== EXPERIENCE TABS =====
const handleExperienceTabs = () => {
  const tabs = querySelectorsAll('.jobs-tab-button');
  const panels = querySelectorsAll('.jobs-panel');
  const tabsContainer = document.querySelector('.jobs-tabs');
  let activeTabIndex = 0;

  const setActiveTab = (index) => {
    // Remove active class from all tabs and panels
    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
      tab.setAttribute('aria-selected', i === index);
      tab.setAttribute('tabindex', i === index ? '0' : '-1');
    });

    panels.forEach((panel, i) => {
      panel.classList.toggle('active', i === index);
      panel.hidden = i !== index;
    });

    // Move the highlight indicator
    if (tabsContainer) {
      const isTablet = window.innerWidth <= 768;
      if (isTablet) {
        tabsContainer.style.setProperty('--tab-transform', `translateX(${index * 120}px)`);
      } else {
        tabsContainer.style.setProperty('--tab-transform', `translateY(${index * 42}px)`);
      }
    }

    activeTabIndex = index;
  };

  // Add click event listeners
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setActiveTab(index));

    // Keyboard navigation
    tab.addEventListener('keydown', (e) => {
      let newIndex = activeTabIndex;

      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        newIndex = activeTabIndex > 0 ? activeTabIndex - 1 : tabs.length - 1;
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        newIndex = activeTabIndex < tabs.length - 1 ? activeTabIndex + 1 : 0;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIndex = tabs.length - 1;
      }

      if (newIndex !== activeTabIndex) {
        setActiveTab(newIndex);
        tabs[newIndex].focus();
      }
    });
  });

  // Set initial active tab
  setActiveTab(0);
};

// ===== SCROLL REVEAL ANIMATION =====
const handleScrollReveal = () => {
  const revealElements = querySelectorsAll('.hero > *, .about > *, .jobs > *, .projects > *, .contact > *');
  let observer;

  const showElement = (element, delay = 0) => {
    setTimeout(() => {
      element.classList.add('fade-in-up');
    }, delay);
  };

  const hideElement = (element) => {
    element.classList.remove('fade-in-up');
  };

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
            showElement(entry.target, delay);
          } else if (entry.boundingClientRect.top > 0) {
            hideElement(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach((el) => showElement(el));
  }

  return observer;
};

// ===== KEYBOARD NAVIGATION =====
const handleKeyboardNavigation = () => {
  // Focus visible class for keyboard users
  const handleFirstTab = (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
      window.addEventListener('mousedown', handleMouseDownOnce);
    }
  };

  const handleMouseDownOnce = () => {
    document.body.classList.remove('user-is-tabbing');
    window.removeEventListener('mousedown', handleMouseDownOnce);
    window.addEventListener('keydown', handleFirstTab);
  };

  window.addEventListener('keydown', handleFirstTab);
};

// ===== LINK FOCUS MANAGEMENT =====
const handleLinkFocus = () => {
  const links = querySelectorsAll('a');

  links.forEach(link => {
    link.addEventListener('focus', function() {
      this.classList.add('focus-visible');
    });

    link.addEventListener('blur', function() {
      this.classList.remove('focus-visible');
    });
  });
};

// ===== PROJECT CARD INTERACTIONS =====
const handleProjectCards = () => {
  const projectCards = querySelectorsAll('.project-item');

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-7px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0px)';
    });

    // Handle keyboard navigation
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const link = card.querySelector('.project-title a');
        if (link) {
          link.click();
        }
      }
    });
  });
};

// ===== EMAIL OBFUSCATION =====
const handleEmailObfuscation = () => {
  const emailLinks = querySelectorsAll('a[href*="mailto"]');

  emailLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes('your.email@gmail.com')) {
      // Replace with actual email
      // link.setAttribute('href', href.replace('your.email@gmail.com', 'your.actual.email@gmail.com'));
    }
  });
};

// ===== THEME DETECTION =====
const handleThemeDetection = () => {
  // Detect if user prefers light theme
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    // User prefers light theme - could add light theme toggle here
    console.log('User prefers light theme');
  }

  // Listen for theme changes
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    mediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        console.log('Switched to light theme preference');
      } else {
        console.log('Switched to dark theme preference');
      }
    });
  }
};

// ===== PERFORMANCE OPTIMIZATIONS =====
const handlePerformanceOptimizations = () => {
  // Lazy load images
  const images = querySelectorsAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Preload critical resources
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.as = 'font';
  preloadLink.type = 'font/woff2';
  preloadLink.crossOrigin = 'anonymous';
  preloadLink.href = '/fonts/Calibre-Regular.woff2';
  document.head.appendChild(preloadLink);
};

// ===== ANALYTICS (Optional) =====
const handleAnalytics = () => {
  // Track scroll depth
  let maxScrollDepth = 0;

  const trackScrollDepth = throttle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScrollDepth) {
      maxScrollDepth = scrollPercent;

      // Track milestone percentages
      if ([25, 50, 75, 90].includes(scrollPercent)) {
        console.log(`Scroll depth: ${scrollPercent}%`);
        // Send to analytics service
      }
    }
  }, 100);

  window.addEventListener('scroll', trackScrollDepth);

  // Track external link clicks
  const externalLinks = querySelectorsAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
  externalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      console.log('External link clicked:', link.href);
      // Send to analytics service
    });
  });
};

// ===== ERROR HANDLING =====
const handleErrors = () => {
  window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Send to error tracking service
  });

  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Send to error tracking service
  });
};

// ===== ACCESSIBILITY IMPROVEMENTS =====
const handleAccessibility = () => {
  // Add skip to main content functionality
  const skipLink = document.querySelector('.skip-to-content');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const main = document.getElementById('content');
      if (main) {
        main.focus();
        main.scrollIntoView();
      }
    });
  }

  // Announce route changes for screen readers
  const announceRouteChange = (message) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  // Handle section navigation
  const sectionLinks = querySelectorsAll('a[href^="#"]');
  sectionLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const sectionName = targetSection.querySelector('h2, h1')?.textContent || targetId;
        announceRouteChange(`Navigated to ${sectionName} section`);
      }
    });
  });
};

// ===== INIT FUNCTION =====
const init = () => {
  console.log('🚀 Portfolio loaded');

  // Initialize device detection
  isTabletOrMobile = isTabletOrMobileDevice();

  // Initialize all modules
  handleLoading();
  enableSmoothScrolling();
  handleHeaderScroll();
  handleMobileMenu();
  handleExperienceTabs();
  handleScrollReveal();
  handleKeyboardNavigation();
  handleLinkFocus();
  handleProjectCards();
  handleEmailObfuscation();
  handleThemeDetection();
  handlePerformanceOptimizations();
  handleAnalytics();
  handleErrors();
  handleAccessibility();

  // Add loaded class to body
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 1000);
};

// ===== DOCUMENT READY =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ===== WINDOW LOAD =====
window.addEventListener('load', () => {
  console.log('🎉 All resources loaded');
});

// ===== EXPORT FOR TESTING (Optional) =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    init,
    handleHeaderScroll,
    handleMobileMenu,
    handleExperienceTabs,
    handleScrollReveal,
  };
}

// Logo pulse animation on page load/refresh
document.addEventListener('DOMContentLoaded', function() {
    // Add pulse animation to all logo images
    const logoImages = document.querySelectorAll('.nav-logo-img, .logo-img');

    logoImages.forEach(logo => {
        logo.classList.add('logo-pulse');

        // Remove the animation class after it completes (4.5s for 3 pulses)
        setTimeout(() => {
            logo.classList.remove('logo-pulse');
        }, 4500);
    });

    // Make logos clickable to refresh page
    const logoLinks = document.querySelectorAll('.nav-logo a, .loader-logo');
    logoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.reload();
        });
    });
});

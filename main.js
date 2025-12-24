// activate-panel.js - Enhanced Vanilla JavaScript for Codefort website
// Production-ready with error handling, performance optimizations, and edge case handling

;(() => {
  // ============================================
  // UTILITIES & HELPERS
  // ============================================

  // Debounce function for performance optimization
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Throttle function for scroll events
  function throttle(func, limit) {
    let inThrottle
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  // Safe query selector with error handling
  function safeQuery(selector, context = document) {
    try {
      return context.querySelector(selector)
    } catch (e) {
      console.warn(`Invalid selector: ${selector}`, e)
      return null
    }
  }

  function safeQueryAll(selector, context = document) {
    try {
      return context.querySelectorAll(selector)
    } catch (e) {
      console.warn(`Invalid selector: ${selector}`, e)
      return []
    }
  }

  // Request Animation Frame polyfill
  const requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    ((callback) => {
      setTimeout(callback, 1000 / 60)
    })

  // ============================================
  // INITIALIZATION
  // ============================================

  function initializeApp() {
    // Check if DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", runApp)
    } else {
      runApp()
    }
  }

  function runApp() {
    try {
      initMobileMenu()
      initDesktopDropdown()
      initProjectsAccordion()
      initProjectNavigation()
      initTypedText()
      initSmoothScroll()
      initScrollAnimations()
      initServiceFeatures()
      initHeaderScroll()
      initAccessibility()
      initPerformanceMonitoring()
      initAccordion()
      startParticles();
      initRunEmail();
    } catch (error) {
      console.error("Application initialization error:", error)
    }
  }


  function initAccordion(){

    const accordion = document.querySelector(".Projects_accordion__SVvzD");
    const accordions = accordion.querySelectorAll(".Projects_accordionPanel__k2ce_");
    accordions[1].style.backgroundImage = "url(/_next/accordion/furniture.jpg)";
    accordions[1].style.backgroundPosition = "center center";
    accordions[1].style.backgroundRepeat = "no-repeat";
    accordions[1].style.backgroundSize = "cover";

    accordions[0].style.backgroundImage = "url(/_next/accordion/fintech.jpeg)";
    accordions[0].style.backgroundPosition = "center center";
    accordions[0].style.backgroundRepeat = "no-repeat";
    accordions[0].style.backgroundSize = "cover";

    accordions[2].style.backgroundImage = "url(/_next/accordion/nft.png)";
    accordions[2].style.backgroundPosition = "center center";
    accordions[2].style.backgroundRepeat = "no-repeat";
    accordions[2].style.backgroundSize = "cover";
    
    const accordionPanels = document.querySelectorAll('.Projects_accordionPanel__k2ce_');
  const accordionTriggers = document.querySelectorAll('.Projects_accordionTrigger__QvU3e');
  const navigationIcons = document.querySelectorAll('.Projects_navigationIcon__Ww6uO');
  const arrowLeft = navigationIcons[0];
  const arrowRight = navigationIcons[1];
  
  let activeIndex = 0;
  updateAccordion(1)
  // Function to update accordion state
  function updateAccordion(index) {
    // Update active index
    activeIndex = index;
    
    // Reset all panels
    accordionPanels.forEach((panel, i) => {
      const content = panel.querySelector('.Projects_accordionContent__vpAcZ');
      const overlay = panel.querySelector('.Projects_overlay__jgi58');
      const trigger = panel.querySelector('.Projects_accordionTrigger__QvU3e');
      
      
      if (i === index) {
        const button  = panel.querySelector("a");
        // Expand active panel
        content.setAttribute('aria-hidden', 'false');
        trigger.setAttribute('aria-expanded', 'true');
        
        // Remove inactive overlay class if present
        overlay.classList.remove('Projects_overlayInactive__E_x2P');
        overlay.classList.remove('false');
        
        // Add active styling
        panel.style.flex = '3'; // Expanded width
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
        overlay.style.opacity = '0.7';
        
        // Update chip styling for active panel
        const chip = panel.querySelector('.Projects_accordionChip__2ET1P');
        if (chip) {
          chip.style.backgroundColor = 'rgb(59, 133, 183)';
          chip.style.color = 'white';
        }

        button.onclick = function(){
          window.open(button.href, "_blank");
        }
      } else {
        // Collapse inactive panels
        content.setAttribute('aria-hidden', 'true');
        trigger.setAttribute('aria-expanded', 'false');
        
        // Add inactive overlay class
        overlay.classList.add('Projects_overlayInactive__E_x2P');
        
        // Collapsed styling
        panel.style.flex = '1';
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        overlay.style.opacity = '0.3';
        
        // Reset chip styling for inactive panels
        const chip = panel.querySelector('.Projects_accordionChip__2ET1P');
        if (chip) {
          chip.style.backgroundColor = 'rgba(59, 133, 183, 0.1)';
          chip.style.color = 'rgb(59, 133, 183)';
        }
      }
    });
    
    // Update navigation arrows state
    updateNavigationArrows();
  }
  
  // Function to update navigation arrows
  function updateNavigationArrows() {
    // Update left arrow
    if (activeIndex === 0) {
      arrowLeft.style.opacity = '0.5';
      arrowLeft.style.cursor = 'not-allowed';
    } else {
      arrowLeft.style.opacity = '1';
      arrowLeft.style.cursor = 'pointer';
    }
    
    // Update right arrow
    if (activeIndex === accordionPanels.length - 1) {
      arrowRight.style.opacity = '0.5';
      arrowRight.style.cursor = 'not-allowed';
    } else {
      arrowRight.style.opacity = '1';
      arrowRight.style.cursor = 'pointer';
    }
  }
  
  // Add click event to each panel
  accordionPanels.forEach((panel, index) => {
    panel.addEventListener('click', () => {
      if (activeIndex !== index) {
        updateAccordion(index);
      }
    });
  });
  
  // Add click event to "View Product" links (prevent event bubbling)
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent triggering panel click
      // Link will naturally navigate as it's an anchor tag
    });
  });
  
  // Navigation arrows functionality
  arrowLeft.addEventListener('click', () => {
    if (activeIndex > 0) {
      updateAccordion(activeIndex - 1);
    }
  });
  
  arrowRight.addEventListener('click', () => {
    if (activeIndex < accordionPanels.length - 1) {
      updateAccordion(activeIndex + 1);
    }
  });
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    switch(e.key) {
      case 'ArrowLeft':
        if (activeIndex > 0) {
          updateAccordion(activeIndex - 1);
        }
        break;
      case 'ArrowRight':
        if (activeIndex < accordionPanels.length - 1) {
          updateAccordion(activeIndex + 1);
        }
        break;
      case 'Home':
        updateAccordion(0);
        break;
      case 'End':
        updateAccordion(accordionPanels.length - 1);
        break;
    }
  })

  }


  function initRunEmail() {
    // Brevo API configuration
    const BREVO_API_KEY = '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'; // Replace with your Brevo API key
    const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
    
    // Email configuration
    const RECIPIENT_EMAIL = 'lizzy1230@gmail.com'; // Replace with your email
    const SENDER_EMAIL = 'seanpacey493@gmail.com'; // Replace with your sender email
    const SENDER_NAME = 'Contact Form';
    const EMAIL_SUBJECT = 'New Contact Form Submission';
    
    // Form validation helper
    function validateEmail(email) {
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    }

    function validatePhone(phone) {
      if (!phone || phone.length < 4) return true // Optional field
      return /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g.test(
        phone,
      )
    }

    // Format form data for email
    function formatEmailContent(formData) {
      let content = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
      `;
      
      if (formData.companyName) {
        content += `<p><strong>Company:</strong> ${formData.companyName}</p>`;
      }
      
      if (formData.phoneNumber) {
        content += `<p><strong>Phone:</strong> ${formData.phoneNumber}</p>`;
      }
      
      content += `
        <h3>Message:</h3>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
      `;
      
      return content;
    }

    // Send email using Brevo API
    async function sendEmailViaBrevo(formData) {
      const emailData = {
        sender: {
          name: SENDER_NAME,
          email: SENDER_EMAIL
        },
        to: [{
          email: RECIPIENT_EMAIL,
          name: 'Website Owner'
        }],
        subject: EMAIL_SUBJECT,
        htmlContent: formatEmailContent(formData),
        textContent: `New contact form submission from ${formData.fullName} (${formData.email}).
          ${formData.companyName ? `Company: ${formData.companyName}` : ''}
          ${formData.phoneNumber ? `Phone: ${formData.phoneNumber}` : ''}
          
          Message: ${formData.message}
          
          Submitted on: ${new Date().toLocaleString()}`,
        replyTo: {
          email: formData.email,
          name: formData.fullName
        },
        headers: {
          'X-Mailer': 'Website Contact Form'
        }
      };

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send email');
      }

      return response.json();
    }

    // Form submission handler
    function initContactForm() {
      const form = document.querySelector("#contact")
      if (!form) return

      form.addEventListener("submit", async (e) => {
        e.preventDefault()

        // Clear previous messages
        const errorElement = form.querySelector(".error-message")
        const successElement = form.querySelector(".success-message")
        if (errorElement) errorElement.remove()
        if (successElement) successElement.remove()

        // Get form values
        const fullName = form.querySelector('input[name="fullName"]')?.value || ""
        const email = form.querySelector('input[name="email"]')?.value || ""
        const companyName = form.querySelector('input[name="companyName"]')?.value || ""
        const phoneNumber = form.querySelector('input[name="phoneNumber"]')?.value || ""
        const message = form.querySelector('#messageId')?.value || ""

        // Validation
        if (!fullName.trim()) {
          showMessage("error", "Please enter your full name", form)
          return
        }

        if (!email.trim()) {
          showMessage("error", "Please enter your email", form)
          return
        }

        if (!validateEmail(email)) {
          showMessage("error", "Invalid email address", form)
          return
        }

        if (!message.trim()) {
          showMessage("error", "Please enter your message", form)
          return
        }

        if (phoneNumber && !validatePhone(phoneNumber)) {
          showMessage("error", "Invalid phone number", form)
          return
        }

        // Prepare data
        const formData = {
          fullName: fullName.trim(),
          email: email.trim(),
          message: message.trim(),
        }

        if (companyName.trim()) {
          formData.companyName = companyName.trim()
        }

        if (phoneNumber.trim()) {
          formData.phoneNumber = phoneNumber.trim()
        }

        // Show loading state
        const submitBtn = form.querySelector('button.Contaxct_formButton__buqaF')
        const originalText = submitBtn.textContent
        const originalHTML = submitBtn.innerHTML
        submitBtn.disabled = true
        submitBtn.innerHTML = '<span class="spinner"></span> Sending...'

        try {
          // Send email via Brevo
          await sendEmailViaBrevo(formData)
          
          // Show success message
          showMessage("success", "Message sent successfully! We'll get back to you soon.", form)
          form.reset()
          
        } catch (error) {
          console.error("Email sending error:", error)
          
          // Provide more specific error messages
          let errorMsg = "Failed to send message. Please try again."
          if (error.message.includes('api-key')) {
            errorMsg = "Server configuration error. Please contact the website administrator."
          } else if (error.message.includes('quota')) {
            errorMsg = "Message quota exceeded. Please try again later."
          } else if (error.message.includes('invalid')) {
            errorMsg = "Invalid email configuration. Please check your email address."
          }
          
          showMessage("error", errorMsg, form)
        } finally {
          submitBtn.disabled = false
          submitBtn.textContent = originalText
          submitBtn.innerHTML = originalHTML
        }
      })

      function showMessage(type, message, form) {
        const messageElement = document.createElement("div")
        messageElement.className = `${type}-message`
        messageElement.style.cssText = `
          margin: 15px 0;
          padding: 12px 20px;
          border-radius: 4px;
          font-weight: 500;
          ${type === 'error' ? 
            'background-color: #fee; color: #c33; border: 1px solid #fcc;' : 
            'background-color: #efe; color: #393; border: 1px solid #cfc;'
          }
        `
        
        // Add icon
        const icon = type === 'error' ? '⚠️' : '✅'
        messageElement.innerHTML = `${icon} ${message}`
        
        // Insert at the top of the form
        form.insertBefore(messageElement, form.firstChild)
        
        // Remove message after appropriate time
        const removeTime = type === 'error' ? 8000 : 5000
        setTimeout(() => {
          if (messageElement.parentNode) {
            messageElement.style.opacity = '0'
            messageElement.style.transition = 'opacity 0.3s'
            setTimeout(() => {
              if (messageElement.parentNode) {
                messageElement.remove()
              }
            }, 300)
          }
        }, removeTime)
      }
    }

    // Add some CSS for the spinner
    const style = document.createElement('style')
    style.textContent = `
      .spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      button[disabled] {
        opacity: 0.7;
        cursor: not-allowed;
      }
    `
    document.head.appendChild(style)

    // Initialize when DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initContactForm)
    } else {
      initContactForm()
    }
  }

  function initParticles() {
    // Wait for tsparticles library to be fully available
    const maxAttempts = 20
    let attempts = 0

    const checkAndInit = () => {
      // Check multiple ways the library might be exposed
      const tsParticles =
        window.tsParticles ||
        (window.pJS && window.pJS.lib) ||
        (typeof window.particlesJS !== "undefined" ? window : null)

      if (tsParticles && tsParticles.load) {
        console.log("[v0] tsParticles library found, initializing...")

        // Make sure the target element exists
        const targetElement = document.getElementById("tsparticles")
        if (!targetElement) {
          console.error("[v0] #tsparticles element not found in HTML")
          return
        }

        // Initialize particles
        tsParticles
          .load("tsparticles", {
            fullScreen: {
              enable: false,
              zIndex: 0,
            },
            particles: {
              number: {
                value: 1000,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: {
                value: ["#ffffff", "#e0e0e0", "#c0c0c0", "#a0a0a0"],
              },
              shape: {
                type: "square",
                stroke: {
                  width: 0,
                  color: "#000000",
                },
              },
              opacity: {
                value: 0.5,
                random: true,
                anim: {
                  enable: true,
                  speed: 0.5,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 4,
                random: true,
                anim: {
                  enable: false,
                  speed: 2,
                  size_min: 0.1,
                  sync: false,
                },
              },
              line_linked: {
                enable: false,
              },
              move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: true,
                  mode: "grab",
                },
                onclick: {
                  enable: true,
                  mode: "push",
                },
                resize: true,
              },
              modes: {
                grab: {
                  distance: 140,
                  line_linked: {
                    opacity: 0.3,
                  },
                },
                push: {
                  particles_nb: 4,
                },
              },
            },
            retina_detect: true,
            background: {
              color: "transparent",
            },
          })
          .catch((error) => {
            console.error("[v0] Failed to initialize particles:", error)
          })

        return true
      }

      // Retry if library not ready yet
      if (attempts < maxAttempts) {
        attempts++
        console.log(`[v0] Waiting for tsParticles... attempt ${attempts}/${maxAttempts}`)
        setTimeout(checkAndInit, 100)
      } else {
        console.error("[v0] tsParticles library failed to load after multiple attempts")
      }
    }

    // Start checking
    checkAndInit()
  }

  function startParticles(){
    // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initParticles)
  } else {
    initParticles()
  }
  }

  

  // ============================================
  // 1. ENHANCED MOBILE MENU TOGGLE
  // ============================================
  function initMobileMenu() {
    const menuOpenBtn = safeQuery(".Header_menuOpen__u0_H5")
    const mobileNav = safeQuery(".Header_mobileNav__nlBu7")
    const menuCloseBtn = mobileNav ? safeQuery('img[src="/images/close.svg"]', mobileNav) : null
    console.log(menuOpenBtn, mobileNav )
    if (!menuOpenBtn || !mobileNav) return

    function openMenu() {
      mobileNav.classList.add("Header_mobileNavOpen__Yp5YU")
      mobileNav.setAttribute("aria-hidden", "false")
      document.body.style.overflow = "hidden"

      // Focus first focusable element
      const firstFocusable = mobileNav.querySelector('a, button, input, [tabindex]:not([tabindex="-1"])')
      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 100)
      }
    }

    function closeMenu() {
      mobileNav.classList.remove("Header_mobileNavOpen__Yp5YU")
      mobileNav.setAttribute("aria-hidden", "true")
      document.body.style.overflow = ""
      menuOpenBtn.focus() // Return focus to trigger
    }

    menuOpenBtn.addEventListener("click", openMenu)

    if (menuCloseBtn) {
      menuCloseBtn.addEventListener("click", closeMenu)
    }

    // Close on outside click
    mobileNav.addEventListener("click", (e) => {
      if (e.target === mobileNav) {
        closeMenu()
      }
    })

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("Header_mobileNavOpen__Yp5YU")) {
        closeMenu()
      }
    })

    const mobileLinks = safeQueryAll("a", mobileNav)
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href")
        if (href && href.startsWith("#")) {
          closeMenu()
        }
      })
    })
  }

  // ============================================
  // 2. ENHANCED DESKTOP SERVICES DROPDOWN
  // ============================================
  function initDesktopDropdown() {
    const servicesLink = safeQuery(".Header_linkMulti__uOmVn")
    const servicesDropdown = safeQuery(".Header_servicesNavWrapperOuter__eBYPR")

    if (!servicesLink || !servicesDropdown) return

    let isOpen = false
    let closeTimeout

    function openDropdown() {
      clearTimeout(closeTimeout)
      isOpen = true
      servicesDropdown.style.display = "block"
      servicesDropdown.setAttribute("aria-hidden", "false")
      servicesLink.setAttribute("aria-expanded", "true")

      // Trigger reflow for animation
      requestAnimFrame(() => {
        servicesDropdown.style.opacity = "1"
        servicesDropdown.style.transform = "translateY(0)"
      })
    }

    function closeDropdown(immediate = false) {
      isOpen = false
      servicesLink.setAttribute("aria-expanded", "false")
      servicesDropdown.setAttribute("aria-hidden", "true")
      servicesDropdown.style.opacity = "0"
      servicesDropdown.style.transform = "translateY(-10px)"

      const delay = immediate ? 0 : 200
      closeTimeout = setTimeout(() => {
        servicesDropdown.style.display = "none"
      }, delay)
    }

    servicesLink.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()
      isOpen ? closeDropdown() : openDropdown()
    })

    if (window.matchMedia("(min-width: 768px)").matches) {
      servicesLink.addEventListener("mouseenter", openDropdown)

      servicesLink.addEventListener("mouseleave", () => {
        closeTimeout = setTimeout(() => closeDropdown(), 300)
      })

      servicesDropdown.addEventListener("mouseenter", () => {
        clearTimeout(closeTimeout)
      })

      servicesDropdown.addEventListener("mouseleave", () => {
        closeDropdown()
      })
    }

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!servicesLink.contains(e.target) && !servicesDropdown.contains(e.target)) {
        closeDropdown(true)
      }
    })

    servicesLink.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDropdown(true)
        servicesLink.focus()
      }
    })
  }

  // ============================================
  // 3. ENHANCED PROJECTS ACCORDION
  // ============================================
  function initProjectsAccordion() {
    const accordionPanels = safeQueryAll(".Projects_accordionPanel__k2ce_")

    if (accordionPanels.length === 0) return

    function activatePanel(targetPanel, withTransition = true) {
      if (!targetPanel) return

      accordionPanels.forEach((panel) => {
        const overlay = safeQuery(".Projects_overlay__jgi58", panel)
        const isTarget = panel === targetPanel

        if (withTransition) {
          panel.style.transition = "all 0.3s ease"
        }

        if (isTarget) {
          panel.classList.add("active")
          panel.setAttribute("aria-expanded", "true")
          if (overlay) {
            overlay.classList.remove("Projects_overlayInactive__E_x2P")
          }
        } else {
          panel.classList.remove("active")
          panel.setAttribute("aria-expanded", "false")
          if (overlay) {
            overlay.classList.add("Projects_overlayInactive__E_x2P")
          }
        }
      })
    }

    accordionPanels.forEach((panel, index) => {
      const trigger = safeQuery(".Projects_accordionTrigger__QvU3e", panel)

      if (trigger) {
        // Set initial ARIA attributes
        trigger.setAttribute("role", "button")
        trigger.setAttribute("aria-controls", `panel-${index}`)
        panel.setAttribute("id", `panel-${index}`)

        trigger.addEventListener("click", (e) => {
          e.preventDefault()
          activatePanel(panel)
        })

        trigger.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            activatePanel(panel)
          }
        })
      }
    })

    // Set first panel as active by default
    if (accordionPanels[0]) {
      activatePanel(accordionPanels[0], false)
    }
  }

  // ============================================
  // 4. ENHANCED PROJECT NAVIGATION ARROWS
  // ============================================
  function initProjectNavigation() {
    const accordionPanels = safeQueryAll(".Projects_accordionPanel__k2ce_")
    const arrowLeft = safeQuery('.Projects_navigationIcon__Ww6uO[src="/images/arrow-left.svg"]')
    const arrowRight = safeQuery('.Projects_navigationIcon__Ww6uO[src="/images/arrow-right.svg"]')

    if (accordionPanels.length === 0 || !arrowLeft || !arrowRight) return

    let currentIndex = 0
    let isAnimating = false

    function activatePanel(index) {
      if (isAnimating || index < 0 || index >= accordionPanels.length) return

      isAnimating = true
      currentIndex = index

      accordionPanels.forEach((panel, i) => {
        const overlay = safeQuery(".Projects_overlay__jgi58", panel)
        const isActive = i === index

        if (isActive) {
          panel.classList.add("active")
          panel.setAttribute("aria-expanded", "true")
          if (overlay) overlay.classList.remove("Projects_overlayInactive__E_x2P")
        } else {
          panel.classList.remove("active")
          panel.setAttribute("aria-expanded", "false")
          if (overlay) overlay.classList.add("Projects_overlayInactive__E_x2P")
        }
      })

      setTimeout(() => {
        isAnimating = false
      }, 400)
    }

    arrowRight.addEventListener("click", () => {
      const nextIndex = (currentIndex + 1) % accordionPanels.length
      activatePanel(nextIndex)
    })

    arrowLeft.addEventListener("click", () => {
      const prevIndex = (currentIndex - 1 + accordionPanels.length) % accordionPanels.length
      activatePanel(prevIndex)
    })

    document.addEventListener("keydown", (e) => {
      const projectsSection = safeQuery(".Projects_accordion__SVvzD")
      if (!projectsSection) return

      const rect = projectsSection.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0

      if (isInView) {
        if (e.key === "ArrowRight") {
          e.preventDefault()
          const nextIndex = (currentIndex + 1) % accordionPanels.length
          activatePanel(nextIndex)
        } else if (e.key === "ArrowLeft") {
          e.preventDefault()
          const prevIndex = (currentIndex - 1 + accordionPanels.length) % accordionPanels.length
          activatePanel(prevIndex)
        }
      }
    })

    let touchStartX = 0
    let touchEndX = 0

    const projectsContainer = safeQuery(".Projects_accordion__SVvzD")
    if (projectsContainer) {
      projectsContainer.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].screenX
        },
        { passive: true },
      )

      projectsContainer.addEventListener(
        "touchend",
        (e) => {
          touchEndX = e.changedTouches[0].screenX
          handleSwipe()
        },
        { passive: true },
      )

      function handleSwipe() {
        const swipeThreshold = 50
        const diff = touchStartX - touchEndX

        if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0) {
            // Swipe left - next
            const nextIndex = (currentIndex + 1) % accordionPanels.length
            activatePanel(nextIndex)
          } else {
            // Swipe right - previous
            const prevIndex = (currentIndex - 1 + accordionPanels.length) % accordionPanels.length
            activatePanel(prevIndex)
          }
        }
      }
    }
  }

  // ============================================
  // 5. ENHANCED TYPED TEXT EFFECT
  // ============================================
  function initTypedText() {
    const typedElement = safeQuery(".Hero_heroTitle__IbUgH")

    if (!typedElement) return

    let texts;


    if( location.pathname == "/" ){
      texts = [
        "Build your dream with us",
        "Transform your ideas into reality",
        "Scale your business efficiently",
        "Create exceptional experiences",
      ]
    }
    else if(location.pathname == "/product-design"){
      texts = [
        "Wow your users with the best product experience"
      ]
    }
    else if(location.pathname == "/blockchain"){
      texts = [
        "Unleash the potential of Blockchain with our expertise"
      ]
    }
    else if(location.pathname == "/ai-and-ml"){
      texts = [
        "Supercharge your business with intelligent and data-driven solutions"
      ]
    }
    else if(location.pathname == "/software-development"){
      texts = [
        "Bring your ideas into reality with cutting-edge solutions"
      ]
    }
     else if(location.pathname == "/startup-solutions"){
      texts = [
        "Build your dream with our budget-friendly solutions"
      ]
    }

    else if(location.pathname == "/maintainance"){
      texts = [
        "Boost your business with seamless software performance"
      ]
    }

    
    else if(location.pathname == "/outsourcing"){
      texts = [
        "Achieve Remarkable Success with a Strategic Partnership"
      ]
    }

     else if(location.pathname == "/our-process"){
      texts = [
        "Transforming Ideas into Digital Reality"
      ]
    }

    
     else if(location.pathname == "/about-us"){
      texts = [
        "We transform businesses with technology"
      ]
    }

    

    let textIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 100
    let timeoutId

    let cursor = safeQuery(".typed-cursor")
    if (!cursor) {
      cursor = document.createElement("span")
      cursor.className = "typed-cursor"
      cursor.textContent = "|"
      cursor.style.cssText = "animation: blink 1s infinite; margin-left: 2px;"
      typedElement.parentNode.appendChild(cursor)

      // Add blink animation
      const style = document.createElement("style")
      style.textContent = `
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `
      document.head.appendChild(style)
    }

    function type() {
      const currentText = texts[textIndex]

      if (isDeleting) {
        typedElement.textContent = currentText.substring(0, charIndex - 1)
        charIndex--
        typingSpeed = 50
      } else {
        typedElement.textContent = currentText.substring(0, charIndex + 1)
        charIndex++
        typingSpeed = 100
      }

      if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length
        typingSpeed = 500
      }

      timeoutId = setTimeout(type, typingSpeed)
    }

    setTimeout(type, 500)

    window.addEventListener("beforeunload", () => {
      clearTimeout(timeoutId)
    })
  }

  // ============================================
  // 6. ENHANCED SMOOTH SCROLL
  // ============================================
  function initSmoothScroll() {
    const scrollToElement = (target, offset = 80) => {
      if (!target) return

      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }

    safeQueryAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href")
        if (!href || href === "#" || href.length <= 1) return

        e.preventDefault()
        const target = safeQuery(href)
        if (target) {
          scrollToElement(target)

          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, href)
          }
        }
      })
    })

    if (window.location.hash) {
      const target = safeQuery(window.location.hash)
      if (target) {
        setTimeout(() => scrollToElement(target), 100)
      }
    }
  }

  // ============================================
  // 7. ENHANCED SCROLL ANIMATIONS
  // ============================================
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated")
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"

          // Unobserve after animation
          animationObserver.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const animatedSelectors = [
      ".ServiceFeatures_featureMain___wpBe > div > div",
      ".WhyCodefort_why__9A5In",
      ".Projects_projectsHeaderTexts__cgRT4 > div.animated",
       ".Projects_projectsHeaderTexts__cgRT4 > div",
      ".Footer_copyrightWrapper__9VI0F > div > div",
      ".Footer_footerNavsWrapperInner__rU8OM > div > div",
    ]

    animatedSelectors.forEach((selector) => {
      const elements = safeQueryAll(selector)
      elements.forEach((el, index) => {
        // Set initial state
        el.style.opacity = "0"
        el.style.transform = "translateY(75px)"
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`

        animationObserver.observe(el)
      })
    })

    window.addEventListener("beforeunload", () => {
      animationObserver.disconnect()
    })
  }

  // ============================================
  // 8. ENHANCED SERVICE FEATURES PROGRESS
  // ============================================
  function initServiceFeatures() {
    const featuresSection = safeQuery(".ServiceFeatures_container__EEVn8")
    const lineInner = safeQuery(".ServiceFeatures_lineInner__SWYyr")
    const stepWrappers = safeQueryAll(".ServiceFeatures_stepWrapper__YtNjT")
    const features = safeQueryAll(".ServiceFeatures_feature__7vlr_")

    if (!featuresSection || features.length === 0) return

    const handleScroll = throttle(() => {
      const sectionTop = featuresSection.offsetTop
      const sectionHeight = featuresSection.offsetHeight
      const scrollPosition = window.scrollY + window.innerHeight / 2

      if (scrollPosition > sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const progress = Math.max(0, Math.min(1, (scrollPosition - sectionTop) / sectionHeight))
        const activeIndex = Math.min(Math.floor(progress * features.length), features.length - 1)

        // Update progress line with RAF for smooth animation
        if (lineInner) {
          requestAnimFrame(() => {
            lineInner.style.height = progress * 100 + "%"
          })
        }

        // Update step indicators
        stepWrappers.forEach((step, index) => {
          const img = safeQuery("img", step)
          if (img) {
            const shouldBeActive = index <= activeIndex
            const isActive = img.src.includes("selected.svg")

            if (shouldBeActive && !isActive) {
              img.src = "/images/selected.svg"
              img.alt = "selected"
            } else if (!shouldBeActive && isActive) {
              img.src = "/images/unselected.svg"
              img.alt = "unselected"
            }
          }
        })

        features.forEach((feature, index) => {
          if (index === activeIndex) {
            feature.classList.add("active")
          } else {
            feature.classList.remove("active")
          }
        })
      }
    }, 16) // ~60fps

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Initial check
    handleScroll()
  }

  // ============================================
  // 9. ENHANCED HEADER SCROLL EFFECT
  // ============================================
  function initHeaderScroll() {
    const header = safeQuery(".Header_header__z1DZP")

    if (!header) return

    let lastScroll = 0
    let ticking = false

    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (currentScroll > 100) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }

      if (currentScroll > lastScroll && currentScroll > 150) {
        header.style.transform = "translateY(-100%)"
      } else {
        header.style.transform = "translateY(0)"
      }

      lastScroll = currentScroll
      ticking = false
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimFrame(handleScroll)
          ticking = true
        }
      },
      { passive: true },
    )
  }

  // ============================================
  // 10. ACCESSIBILITY ENHANCEMENTS
  // ============================================
  function initAccessibility() {
    const skipLink = document.createElement("a")
    skipLink.href = "#main-content"
    skipLink.textContent = "Skip to main content"
    skipLink.className = "skip-link"
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 0;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 100;
    `
    skipLink.addEventListener("focus", () => {
      skipLink.style.top = "0"
    })
    skipLink.addEventListener("blur", () => {
      skipLink.style.top = "-40px"
    })
    document.body.insertBefore(skipLink, document.body.firstChild)

    const mainContent = safeQuery("main") || safeQuery('[role="main"]')
    if (mainContent && !mainContent.id) {
      mainContent.id = "main-content"
    }

    const style = document.createElement("style")
    style.textContent = `
      *:focus-visible {
        outline: 2px solid #4A90E2;
        outline-offset: 2px;
      }
      .skip-link:focus {
        top: 0 !important;
      }
    `
    document.head.appendChild(style)
  }

  // ============================================
  // 11. PERFORMANCE MONITORING
  // ============================================
  function initPerformanceMonitoring() {
    if ("performance" in window) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          const perfData = window.performance.timing
          const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
          console.log(`Page load time: ${pageLoadTime}ms`)

          // Log any long tasks
          if ("PerformanceObserver" in window) {
            try {
              const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  if (entry.duration > 50) {
                    console.warn(`Long task detected: ${entry.duration}ms`)
                  }
                }
              })
              observer.observe({ entryTypes: ["longtask"] })
            } catch (e) {
              // Browser doesn't support longtask observation
            }
          }
        }, 0)
      })
    }
  }

  // ============================================
  // START APPLICATION
  // ============================================
  
    initializeApp()
})()


// Vanilla JavaScript replacement for main-app-46e10138c02ff0df-7RS2K.js
// This removes all Next.js image optimization and routing logic

;(() => {
  // Simple initialization - no Next.js logic
  console.log("Vanilla JS initialized")

  // Remove any Next.js image query string tampering
  // This ensures images load normally without /_next/image optimization
  if (window.location.search.includes("_next")) {
    window.history.replaceState({}, document.title, window.location.pathname)
  }
})()
if(location.href == location.origin ){
;(() => {
  // Configuration
  const sentences = [
    "Transform your business ideas with Codefort solutions",
    "Build scalable software that grows with you",
    "Elevate your business with custom development",
  ]

  const typingSpeed = 80 // milliseconds per character
  const erasingSpeed = 50 // milliseconds per character when erasing
  const delayBetweenSentences = 2000 // pause before erasing
  const delayBeforeTyping = 500 // pause before typing next sentence

  let sentenceIndex = 0
  let charIndex = 0
  let isErasing = false
  let typingTimeout

  // Find the hero title element
  function initTypingAnimation() {
    // Look for the span inside Hero_heroTitle__IbUgH
    const heroTitle = document.querySelector(".Hero_heroTitle__IbUgH")

    if (!heroTitle) {
      console.error("[v0] Hero title element not found")
      return
    }

    // Find the text span (first span child) and cursor span
    const textSpan = heroTitle.querySelector("span:first-child")
    const cursorSpan = heroTitle.querySelector(".typed-cursor")

    if (!textSpan) {
      console.error("[v0] Text span not found")
      return
    }

    // Start the typing animation
    typeText(textSpan, cursorSpan)
  }

  function typeText(textElement, cursorElement) {
    const currentSentence = sentences[sentenceIndex]

    if (!isErasing && charIndex <= currentSentence.length) {
      // Typing forward
      textElement.textContent = currentSentence.substring(0, charIndex)
      charIndex++

      if (charIndex > currentSentence.length) {
        // Finished typing, wait then start erasing
        typingTimeout = setTimeout(() => {
          isErasing = true
          typeText(textElement, cursorElement)
        }, delayBetweenSentences)
      } else {
        typingTimeout = setTimeout(() => typeText(textElement, cursorElement), typingSpeed)
      }
    } else if (isErasing && charIndex >= 0) {
      // Erasing backward
      textElement.textContent = currentSentence.substring(0, charIndex)
      charIndex--

      if (charIndex < 0) {
        // Finished erasing, move to next sentence
        isErasing = false
        sentenceIndex = (sentenceIndex + 1) % sentences.length
        charIndex = 0

        typingTimeout = setTimeout(() => typeText(textElement, cursorElement), delayBeforeTyping)
      } else {
        typingTimeout = setTimeout(() => typeText(textElement, cursorElement), erasingSpeed)
      }
    }
  }


  
    console.log(location.href, location.origin )
    // Initialize when DOM is ready
    if (document.readyState === "loading" ) {
      document.addEventListener("DOMContentLoaded", initTypingAnimation)
    } else {
      initTypingAnimation()
    }



  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
  })
})()
  } else {
    console.log("NOt found")
    clearTimeout(typingTimeout)
  }

// Vanilla JavaScript tsparticles initialization
// This creates the floating square particles effect shown in the image

 ;(() => {
  
})()


/**
 * Feature Text Reveal Animation
 * Animates solid color overlays to reveal text content on scroll
 */

/**
 * Feature Text Reveal Animation
 * Animates solid color overlays to reveal text content on scroll
 */

;(() => {
  // Configuration
  const CONFIG = {
    rootMargin: "0px 0px -100px 0px", // Trigger when element is 100px from bottom of viewport
    threshold: 0.1,
    animationDuration: 600, // ms per overlay
    staggerDelay: 100, // ms between each overlay animation
  }

  // Track which elements have been animated
  const animatedElements = new WeakSet()

  /**
   * Initialize the scroll-based reveal animation
   */
  function initFeatureRevealAnimation() {
    // Find all feature sections (not just the text wrapper)
    const featureSections = document.querySelectorAll(".ServiceFeatures_feature__7vlr_")

    if (!featureSections.length) {
      console.warn("[Feature Reveal] No feature sections found")
      return
    }

    console.log(`[Feature Reveal] Found ${featureSections.length} feature sections`)

    // Create intersection observer
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: CONFIG.rootMargin,
      threshold: CONFIG.threshold,
    })

    // Observe each feature section
    featureSections.forEach((section) => {
      observer.observe(section)
    })
  }

  /**
   * Handle intersection observer callback
   */
  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      // Only animate when entering viewport and not already animated
      if (entry.isIntersecting && !animatedElements.has(entry.target)) {
        animateFeatureReveal(entry.target)
        animatedElements.add(entry.target)
        // Stop observing this element since we only want to animate once
        observer.unobserve(entry.target)
      }
    })
  }

  /**
   * Animate the feature reveal by sliding overlays up
   */
  function animateFeatureReveal(featureSection) {
    const containers = featureSection.querySelectorAll('div[style*="position: relative"][style*="overflow: hidden"]')

    if (!containers.length) {
      console.warn("[Feature Reveal] No animation containers found in section")
      return
    }

    containers.forEach((container, index) => {
      const overlay = container.querySelector(
        'div[style*="position: absolute"][style*="z-index: 20"][style*="background: rgb(59, 133, 183)"]',
      )
      const content = container.querySelector('div[style*="opacity: 0"][style*="translateY"]')

      if (!overlay || !content) {
        console.warn("[Feature Reveal] Missing overlay or content in container", {
          overlay: !!overlay,
          content: !!content,
        })
        return
      }

      // Calculate staggered delay
      const delay = index * CONFIG.staggerDelay

      // Animate after delay
      setTimeout(() => {
        animateOverlaySlideUp(overlay, content)
      }, delay)
    })
  }

  /**
   * Animate a single overlay sliding up to reveal content
   */
  function animateOverlaySlideUp(overlay, content) {
    content.style.transition = `opacity ${CONFIG.animationDuration}ms ease-out, transform ${CONFIG.animationDuration}ms ease-out`
    content.style.opacity = "1"
    content.style.transform = "translateY(0) translateZ(0)"

    overlay.style.transformOrigin = "bottom"
    overlay.style.transition = `transform ${CONFIG.animationDuration}ms cubic-bezier(0.65, 0, 0.35, 1)`

    // Force reflow to ensure transition applies
    void overlay.offsetHeight

    overlay.style.transform = "scaleY(0)"

    setTimeout(() => {
      if (overlay && overlay.parentNode) {
        overlay.style.display = "none"
      }
    }, CONFIG.animationDuration + 50)
  }

  /**
   * Fallback for browsers without IntersectionObserver
   */
  function initFallbackAnimation() {
    console.warn("[Feature Reveal] IntersectionObserver not supported, using fallback")

    const featureSections = document.querySelectorAll(".ServiceFeatures_feature__7vlr_")

    featureSections.forEach((section) => {
      if (!animatedElements.has(section)) {
        const rect = section.getBoundingClientRect()
        const isInViewport = rect.top < window.innerHeight - 100 && rect.bottom > 0

        if (isInViewport) {
          animateFeatureReveal(section)
          animatedElements.add(section)
        }
      }
    })
  }

  /**
   * Initialize when DOM is ready
   */
  function init() {
      start()
  }

  function start() {
    // Check for IntersectionObserver support
    alert("Ogbeni")
    if ("IntersectionObserver" in window) {
      initFeatureRevealAnimation()
    } else {
      // Fallback for older browsers
      initFallbackAnimation()
      window.addEventListener("scroll", throttle(initFallbackAnimation, 200))
    }
  }

  /**
   * Throttle helper function
   */
  function throttle(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Start initialization
  init()
})()






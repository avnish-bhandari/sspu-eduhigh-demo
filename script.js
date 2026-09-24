/**
 * EdmunHigh - Interactive Navigation & Hero Scripts
 * Provides responsive navigation, accessible dropdowns, sticky header elevation,
 * and smooth interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const siteHeader = document.getElementById('siteHeader');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const programsDropdown = document.getElementById('programsDropdown');
  const programsBtn = document.getElementById('programsBtn');
  const mobileProgramsBtn = document.getElementById('mobileProgramsBtn');
  const mobileSubMenu = document.getElementById('mobileSubMenu');

  /* --------------------------------------------------------------------------
     1. Sticky Header Elevation on Scroll
     -------------------------------------------------------------------------- */
  const handleScroll = () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  /* --------------------------------------------------------------------------
     2. Desktop Dropdown Menu Accessibility & Click Support
     -------------------------------------------------------------------------- */
  if (programsBtn && programsDropdown) {
    programsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = programsBtn.getAttribute('aria-expanded') === 'true';
      programsBtn.setAttribute('aria-expanded', !isExpanded);
      programsDropdown.classList.toggle('active', !isExpanded);
    });

    // Close desktop dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!programsDropdown.contains(e.target)) {
        programsBtn.setAttribute('aria-expanded', 'false');
        programsDropdown.classList.remove('active');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && programsDropdown.classList.contains('active')) {
        programsBtn.setAttribute('aria-expanded', 'false');
        programsDropdown.classList.remove('active');
        programsBtn.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. Mobile Navigation Drawer Toggle
     -------------------------------------------------------------------------- */
  if (mobileMenuToggle && mobileNavDrawer) {
    const toggleMobileMenu = () => {
      const isOpen = mobileNavDrawer.classList.contains('open');
      mobileMenuToggle.classList.toggle('active', !isOpen);
      mobileNavDrawer.classList.toggle('open', !isOpen);
      mobileMenuToggle.setAttribute('aria-expanded', !isOpen);
      
      // Prevent body scrolling when mobile menu is open
      document.body.style.overflow = isOpen ? '' : 'hidden';
    };

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Close drawer when any nav link is clicked
    const mobileLinks = mobileNavDrawer.querySelectorAll('a:not(.mobile-dropdown-btn)');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileNavDrawer.classList.remove('open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Handle Mobile Dropdown Accordion
    if (mobileProgramsBtn && mobileSubMenu) {
      mobileProgramsBtn.addEventListener('click', () => {
        mobileSubMenu.classList.toggle('open');
        const chevron = mobileProgramsBtn.querySelector('.chevron-icon');
        if (chevron) {
          chevron.style.transform = mobileSubMenu.classList.contains('open') 
            ? 'rotate(180deg)' 
            : 'rotate(0deg)';
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     4. Smooth Scroll for Anchor Links with Header Offset
     -------------------------------------------------------------------------- */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = siteHeader ? siteHeader.offsetHeight : 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* --------------------------------------------------------------------------
     5. Lead Capturing Form Interactive Handling
     -------------------------------------------------------------------------- */
  const leadForm = document.getElementById('leadForm');
  const formStatus = document.getElementById('formStatus');
  const btnSubmitLead = document.getElementById('btnSubmitLead');

  if (leadForm && formStatus) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const program = document.getElementById('program').value;
      const grade = document.getElementById('grade').value;

      // Basic validation
      if (!fullName || !email || !phone || !program || !grade) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill out all fields before submitting.';
        return;
      }

      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please enter a valid email address.';
        return;
      }

      // Simulate submission state
      const originalBtnText = btnSubmitLead.innerHTML;
      btnSubmitLead.innerHTML = '<span>Submitting...</span>';
      btnSubmitLead.disabled = true;

      setTimeout(() => {
        formStatus.className = 'form-status success';
        formStatus.textContent = `Thank you, ${fullName}! Your inquiry has been received. An admissions counselor will reach out shortly.`;
        leadForm.reset();
        btnSubmitLead.innerHTML = originalBtnText;
        btnSubmitLead.disabled = false;
      }, 750);
    });
  }

  /* --------------------------------------------------------------------------
     6. Programs Interactive Tabs & Dot Pagination Controller
     -------------------------------------------------------------------------- */
  const programsData = [
    {
      title: 'STEM Program',
      image: 'assets/images/programs/stem.jpg',
      alt: 'STEM Program - Students working in modern science laboratory',
      desc: 'Preparing for our school students future in science, technology, engineering, and mathematics.'
    },
    {
      title: 'College AP Program',
      image: 'assets/images/programs/college-ap.jpg',
      alt: 'College AP Program - Students studying in academic library',
      desc: 'Rigorous advanced placement courses providing college credits and intellectual rigor for high achievers.'
    },
    {
      title: 'Arts Program',
      image: 'assets/images/programs/arts.jpg',
      alt: 'Arts Program - Students creating fine art in studio',
      desc: 'Cultivating creativity through visual fine arts, digital media, music performance, and theater production.'
    },
    {
      title: 'Athletics Program',
      image: 'assets/images/programs/athletics.jpg',
      alt: 'Athletics Program - Students training on athletic sports field',
      desc: 'Fostering sportsmanship, physical wellness, discipline, and teamwork across varsity athletic disciplines.'
    },
    {
      title: 'Languages Program',
      image: 'assets/images/programs/languages.jpg',
      alt: 'Languages Program - Diverse students collaborating in language study',
      desc: 'Mastering global languages and cultural literacy with immersive curriculum and international exchange.'
    },
    {
      title: 'Humanities Program',
      image: 'assets/images/programs/humanities.jpg',
      alt: 'Humanities Program - Students engaged in literature and history seminar',
      desc: 'Deepening critical inquiry through philosophy, world history, literature, and civic engagement.'
    }
  ];

  const programTabBtns = document.querySelectorAll('.program-tab-btn');
  const programDotBtns = document.querySelectorAll('.program-dot-btn');
  const programFeaturedImg = document.getElementById('programFeaturedImg');
  const programCardDesc = document.getElementById('programCardDesc');

  if (programTabBtns.length > 0 && programFeaturedImg && programCardDesc) {
    const switchProgram = (index) => {
      const selectedProgram = programsData[index];
      if (!selectedProgram) return;

      // 1. Update Tabs Active State
      programTabBtns.forEach((btn, i) => {
        const isActive = i === index;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive);
      });

      // 2. Update Dots Active State
      programDotBtns.forEach((dotBtn, i) => {
        const isActive = i === index;
        dotBtn.classList.toggle('active', isActive);
        dotBtn.innerHTML = isActive 
          ? '<span class="dot-outer-ring"><span class="dot-inner-core"></span></span>' 
          : '<span class="dot-simple"></span>';
      });

      // 3. Smooth Fade Transition for Image & Description Card
      programFeaturedImg.classList.add('fade-out');
      programCardDesc.classList.add('fade-out');

      setTimeout(() => {
        programFeaturedImg.src = selectedProgram.image;
        programFeaturedImg.alt = selectedProgram.alt;
        programCardDesc.textContent = selectedProgram.desc;

        programFeaturedImg.classList.remove('fade-out');
        programCardDesc.classList.remove('fade-out');
      }, 200);
    };

    // Attach click listeners to Tab Buttons
    programTabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'), 10);
        switchProgram(index);
      });
    });

    // Attach click listeners to Dot Buttons
    programDotBtns.forEach((dotBtn) => {
      dotBtn.addEventListener('click', () => {
        const index = parseInt(dotBtn.getAttribute('data-index'), 10);
        switchProgram(index);
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. Alumni Interactive Carousel Controller
     -------------------------------------------------------------------------- */
  const alumniTrack = document.getElementById('alumniTrack');
  const alumniNextBtn = document.getElementById('alumniNextBtn');
  const alumniPrevBtn = document.getElementById('alumniPrevBtn');

  if (alumniTrack && alumniNextBtn && alumniPrevBtn) {
    const updateAlumniNav = () => {
      const maxScrollLeft = alumniTrack.scrollWidth - alumniTrack.clientWidth;
      const currentScroll = alumniTrack.scrollLeft;

      // Show/hide prev button
      if (currentScroll > 15) {
        alumniPrevBtn.style.display = 'flex';
      } else {
        alumniPrevBtn.style.display = 'none';
      }

      // Show/hide next button
      if (currentScroll >= maxScrollLeft - 15) {
        alumniNextBtn.style.display = 'none';
      } else {
        alumniNextBtn.style.display = 'flex';
      }
    };

    const getScrollStep = () => {
      const card = alumniTrack.querySelector('.alumni-card');
      if (card) {
        const gap = 20;
        return card.offsetWidth + gap;
      }
      return 335;
    };

    alumniNextBtn.addEventListener('click', () => {
      const step = getScrollStep();
      alumniTrack.scrollBy({ left: step, behavior: 'smooth' });
    });

    alumniPrevBtn.addEventListener('click', () => {
      const step = getScrollStep();
      alumniTrack.scrollBy({ left: -step, behavior: 'smooth' });
    });

    alumniTrack.addEventListener('scroll', updateAlumniNav, { passive: true });
    window.addEventListener('resize', updateAlumniNav, { passive: true });
    updateAlumniNav(); // Initial check
  }

  /* --------------------------------------------------------------------------
     8. FAQ Accordion Interactive Controller
     -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('active');

      // Close all items for smooth single-open accordion behavior
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove('active');
        const otherTrigger = otherItem.querySelector('.faq-trigger');
        if (otherTrigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // If clicked item was not previously active, expand it
      if (!isAlreadyActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
});


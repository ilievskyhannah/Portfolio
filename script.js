/* ==========================================================================
   PRODUCT DESIGNER PORTFOLIO - INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Theme Switcher (Dark / Light Mode)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  setTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    // The button shows the mode it switches to (sun in dark, moon in light; CSS swaps the icons)
    const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    themeToggleBtn.setAttribute('aria-label', label);
    themeToggleBtn.setAttribute('title', label);
  }

  /* --------------------------------------------------------------------------
     2. Navbar Scroll Effect & Active Link
     -------------------------------------------------------------------------- */
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbarWrapper.classList.add('scrolled');
    } else {
      navbarWrapper.classList.remove('scrolled');
    }
  });

  /* --------------------------------------------------------------------------
     2b. Mobile Nav Toggle
     -------------------------------------------------------------------------- */
  const navToggleBtn = document.getElementById('nav-toggle');

  if (navToggleBtn && navbarWrapper) {
    navToggleBtn.addEventListener('click', () => {
      const isOpen = navbarWrapper.classList.toggle('nav-open');
      navToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navbarWrapper.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navbarWrapper.classList.remove('nav-open');
        navToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. Selected Work Filtering
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.classList.add('animate-fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     4. Case Study Modals System
     -------------------------------------------------------------------------- */
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalContainer = document.getElementById('modal-container');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body-content');

  // Modal templates store
  const caseStudiesData = {
    'facts-commando': {
      title: 'Facts Commando — Personal Profile',
      subtitle: 'User metrics dashboard & impact transparency engine',
      badge: '▶ Animated Video Walkthrough',
      role: 'UX/UI Designer & Product Designer',
      timeline: 'Q4 2023',
      impact: '827,929+ Total Organic Exposure',
      isVideo: true,
      content: `
        <div class="case-study-meta-grid">
          <div class="meta-item">
            <span class="meta-label">ROLE</span>
            <span class="meta-val">UX/UI Designer & Product Designer</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">TIMELINE</span>
            <span class="meta-val">Q4 2023</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">KEY METRIC</span>
            <span class="meta-val" style="color:#3b82f6;">827,929 Total Exposure</span>
          </div>
        </div>

        <!-- Animated UI Video Player Container -->
        <div class="video-player-container">
          <div class="video-player-header">
            <div class="video-status-dot"></div>
            <span class="video-title-text">DEMO WALKTHROUGH — Facts Commando Profile Engine</span>
            <span class="video-quality-badge">HD 1080P</span>
          </div>

          <!-- Video Viewport Frame -->
          <div class="video-viewport" id="facts-video-viewport">
            <img src="./pasted-1785658078320-0.png" alt="Facts Commando Interactive Walkthrough" class="video-poster-img" id="video-poster">
            
            <!-- Dynamic Animated UI Overlays -->
            <div class="video-ui-overlay">
              <div class="live-counter-box">
                <span class="live-pulse">● LIVE ENGAGEMENT</span>
                <div class="live-counter-val" id="live-exposure-val">827,929</div>
                <div class="live-counter-lbl">Total Exposure Generated</div>
              </div>

              <div class="live-comment-toast" id="live-toast-1">
                💬 <strong>Roni Mendel:</strong> "Profile dashboard reached 1,000 member comments!"
              </div>

              <div class="play-center-btn" id="play-center-trigger">
                <span>▶</span>
              </div>
            </div>

            <!-- Video Progress Bar -->
            <div class="video-progress-track">
              <div class="video-progress-fill" id="video-progress-bar"></div>
            </div>
          </div>

          <!-- Video Controls Toolbar -->
          <div class="video-controls-bar">
            <div class="controls-left">
              <button class="video-ctrl-btn" id="video-play-btn" title="Play/Pause">▶</button>
              <span class="video-time-display" id="video-time-txt">00:04 / 00:20</span>
            </div>
            <div class="controls-right">
              <span class="ctrl-tag">Auto-Loop</span>
              <button class="video-ctrl-btn" id="video-sound-btn" title="Toggle Audio">🔊</button>
              <button class="video-ctrl-btn" id="video-fs-btn" title="Fullscreen">⛶</button>
            </div>
          </div>
        </div>

        <div style="margin-top:20px;">
          <h3 style="font-family:var(--font-heading); font-size:20px; margin-bottom:10px;">Personal Profile Architecture</h3>
          <p style="font-size:15px; color:var(--text-secondary); line-height:1.7;">
            The Facts Commando personal profile architecture was engineered to empower each registered user with transparent analytics, weekly impact tracking, and seamless sharing controls. The interface eliminates complex menus in favor of a clean, glanceable dashboard layout.
          </p>
        </div>
      `
    },
    'mri-center': {
      title: 'MRI Center — Research Institute Website',
      subtitle: 'Solo redesign for Tel Aviv University\'s brain imaging institute',
      badge: 'Research Institute UX',
      role: 'UX/UI Designer & Product Designer — Solo',
      timeline: '2025',
      impact: '12 → 0 Recurring Booking Inquiries',
      content: `
        <div class="case-study-meta-grid">
          <div class="meta-item">
            <span class="meta-label">ROLE</span>
            <span class="meta-val">Solo — Research to Code</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">ONBOARDING IMPACT</span>
            <span class="meta-val" style="color:#10b981;">12 → 0 Inquiries</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">SCANS INDEXED</span>
            <span class="meta-val">4,470+</span>
          </div>
        </div>

        <div class="modal-image-showcase">
          <img src="./mri-header-hero.png" alt="MRI Center Website" style="width:100%; border-radius:16px; border:1px solid var(--border-subtle); margin:20px 0;">
        </div>

        <h3 style="font-family:var(--font-heading); font-size:22px; margin-bottom:12px;">A Bottleneck Hiding in a Brochure Site</h3>
        <p style="font-size:15px; color:var(--text-secondary); line-height:1.7;">
          The institute director had become a human bottleneck — at least 12 people regularly contacted him directly just to book scanner time. A 6-step onboarding flow replaced those emails, and inquiries dropped to zero.
        </p>
      `
    },
    'ot-ai': {
      title: 'O.T AI — Reflective Decision-Support Platform',
      subtitle: 'AI platform for occupational therapists, built on qualitative research',
      badge: 'Clinical AI · Sole Researcher',
      role: 'Sole UX/UI Designer & Researcher',
      timeline: '2022 – 2026',
      impact: 'Core Behavioral Logic Shipped to Production',
      content: `
        <div class="case-study-meta-grid">
          <div class="meta-item">
            <span class="meta-label">ROLE</span>
            <span class="meta-val">Sole UX/UI Designer & Researcher</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">INTERVIEWS</span>
            <span class="meta-val">7 In-Depth Interviews</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">PRODUCTION REVIEW</span>
            <span class="meta-val" style="color:#10b981;">36 Session Transcripts</span>
          </div>
        </div>

        <div class="modal-image-showcase">
          <img src="./ot-ai-preview.png" alt="O.T AI Platform Showcase" style="width:100%; border-radius:16px; border:1px solid var(--border-subtle); margin:20px 0;">
        </div>

        <h3 style="font-family:var(--font-heading); font-size:22px; margin-bottom:12px;">From Answer Bot to Reflection Engine</h3>
        <p style="font-size:15px; color:var(--text-secondary); line-height:1.7;">
          Research proved the original plan — an instant-answer bot for therapists — wrong. I redesigned it as a Socratic AI that asks reflective questions instead of giving answers, backed by 7 in-depth interviews and years later, an evaluation of 36 live production session transcripts.
        </p>
      `
    }
  };

  // Video playback simulation handle
  let videoTimer = null;
  let isVideoPlaying = false;
  let videoProgress = 0;

  // Open modal triggers
  document.querySelectorAll('.open-modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const studyKey = trigger.getAttribute('data-study');
      openModal(studyKey);
    });
  });

  function openModal(key) {
    const data = caseStudiesData[key];
    if (!data) return;

    modalBody.innerHTML = `
      <div class="hero-badge" style="margin-bottom:12px;">${data.badge}</div>
      <h2 style="font-family:var(--font-heading); font-size:clamp(26px, 3.5vw, 38px); font-weight:700; line-height:1.15; margin-bottom:8px;">${data.title}</h2>
      <p style="font-size:16px; color:var(--text-muted); margin-bottom:20px;">${data.subtitle}</p>
      ${data.content}
    `;

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    // If Facts Commando video modal, initialize video playback animation
    if (data.isVideo) {
      initFactsVideoPlayer();
    }
  }

  // Auto-initialize video player if present on dedicated page
  if (document.getElementById('facts-video-viewport')) {
    initFactsVideoPlayer();
  }

  function initFactsVideoPlayer() {
    const playBtn = document.getElementById('video-play-btn');
    const centerPlayTrigger = document.getElementById('play-center-trigger');
    const progressBar = document.getElementById('video-progress-bar');
    const timeTxt = document.getElementById('video-time-txt');
    const counterVal = document.getElementById('live-exposure-val');
    const toast1 = document.getElementById('live-toast-1');

    if (!playBtn || !progressBar) return;

    isVideoPlaying = true;
    videoProgress = 0;
    playBtn.textContent = '❚❚';
    if (centerPlayTrigger) centerPlayTrigger.style.display = 'none';

    let baseCount = 827929;

    if (videoTimer) clearInterval(videoTimer);
    videoTimer = setInterval(() => {
      if (!isVideoPlaying) return;

      videoProgress += 1;
      if (videoProgress > 100) {
        videoProgress = 0;
      }

      progressBar.style.width = videoProgress + '%';
      
      const seconds = Math.floor((videoProgress / 100) * 20);
      const secStr = seconds < 10 ? '0' + seconds : seconds;
      timeTxt.textContent = `00:${secStr} / 00:20`;

      // Animate exposure counter slightly
      if (counterVal && Math.random() > 0.4) {
        baseCount += Math.floor(Math.random() * 8) + 1;
        counterVal.textContent = baseCount.toLocaleString();
      }

      // Toggle toast visibility
      if (toast1) {
        if (seconds >= 3 && seconds <= 16) {
          toast1.classList.add('visible');
        } else {
          toast1.classList.remove('visible');
        }
      }
    }, 200);

    const togglePlay = () => {
      isVideoPlaying = !isVideoPlaying;
      playBtn.textContent = isVideoPlaying ? '❚❚' : '▶';
      if (centerPlayTrigger) {
        centerPlayTrigger.style.display = isVideoPlaying ? 'none' : 'flex';
      }
    };

    playBtn.addEventListener('click', togglePlay);
    if (centerPlayTrigger) centerPlayTrigger.addEventListener('click', togglePlay);
  }

  function closeModal() {
    if (videoTimer) {
      clearInterval(videoTimer);
      videoTimer = null;
    }
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeModal();
      }
    });
  }

  /* --------------------------------------------------------------------------
     5. Copy Email & Toast Notification
     -------------------------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'ilievskyhannah@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard! 📋');
      });
    });
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  /* --------------------------------------------------------------------------
     6. Hero Scroll Zoom (All Case Study Pages)
     -------------------------------------------------------------------------- */
  const caseStudyHeroImg = document.querySelector('.case-study-hero-fullbleed img');

  if (caseStudyHeroImg) {
    const heroSection = caseStudyHeroImg.closest('.case-study-hero-fullbleed');
    const maxZoom = 0.45;
    let ticking = false;

    function updateHeroZoom() {
      const rect = heroSection.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      caseStudyHeroImg.style.transform = `scale(${1 + maxZoom * progress})`;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeroZoom);
        ticking = true;
      }
    }, { passive: true });

    updateHeroZoom();
  }

  // Global functions for inline chatbot & interactive elements
  window.sendPresetChat = function(promptText) {
    const chatInput = document.getElementById('tesla-chat-input');
    if (chatInput) {
      chatInput.value = promptText;
      window.sendUserChat();
    }
  };

  window.handleChatKeyPress = function(e) {
    if (e.key === 'Enter') {
      window.sendUserChat();
    }
  };

  window.sendUserChat = function() {
    const chatInput = document.getElementById('tesla-chat-input');
    const chatMsgs = document.getElementById('tesla-chat-msgs');
    if (!chatInput || !chatMsgs) return;

    const userText = chatInput.value.trim();
    if (!userText) return;

    // Append User Message
    const userMsgEl = document.createElement('div');
    userMsgEl.className = 'chat-msg msg-user';
    userMsgEl.textContent = userText;
    chatMsgs.appendChild(userMsgEl);

    chatInput.value = '';
    chatMsgs.scrollTop = chatMsgs.scrollHeight;

    // Simulated Bot Reply
    setTimeout(() => {
      const botMsgEl = document.createElement('div');
      botMsgEl.className = 'chat-msg msg-bot';
      
      let reply = "I can certainly help you with that! Would you like to view specs or connect directly with a Tesla Advisor?";
      if (userText.toLowerCase().includes('tax credit') || userText.toLowerCase().includes('pricing')) {
        reply = "The Model Y starts at $31,490 after federal tax credit & estimated gas savings. Qualifying buyers get up to $7,500 instantly off purchase.";
      } else if (userText.toLowerCase().includes('test drive')) {
        reply = "Great choice! I can reserve a self-serve 30-minute Demo Drive at your nearest Tesla location. Which date works best?";
      } else if (userText.toLowerCase().includes('range') || userText.toLowerCase().includes('battery')) {
        reply = "Model Y Long Range offers up to 310 miles (EPA est.) on a single charge and adds 160 miles in just 15 minutes at a Supercharger!";
      }

      botMsgEl.textContent = reply;
      chatMsgs.appendChild(botMsgEl);
      chatMsgs.scrollTop = chatMsgs.scrollHeight;
    }, 600);
  };

  window.editMobileName = function() {
    const newName = prompt('Enter new user name for profile mockup:', 'Roni Mendel');
    if (newName) {
      const nameEl = document.getElementById('mobile-user-name');
      if (nameEl) nameEl.textContent = newName;
    }
  };

});

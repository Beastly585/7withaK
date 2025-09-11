document.addEventListener('DOMContentLoaded', function () {


  const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    } else {
      entry.target.classList.remove('in-view'); // reset when leaving viewport
    }
  });
}, { threshold: 0.1 }); // 20% visible triggers animation

document.querySelectorAll('.autoshow').forEach(el => observer.observe(el));


    function addSwipeFunctionality() {
  const lightboxes = [document.querySelector('.lightbox'), document.querySelector('.lightbox1')];
  
  lightboxes.forEach(lightbox => {
    if (!lightbox) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50; // Minimum distance for a swipe to be registered
    
    lightbox.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    lightbox.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      
      if (Math.abs(swipeDistance) < minSwipeDistance) return;
      
      if (swipeDistance > 0) {
        // Swipe right - previous image
        if (lightbox.classList.contains('active')) {
          if (lightbox.classList.contains('lightbox')) {
            showPrevImage();
          } else {
            showPrevDigital();
          }
        }
      } else {
        // Swipe left - next image
        if (lightbox.classList.contains('active')) {
          if (lightbox.classList.contains('lightbox')) {
            showNextImage();
          } else {
            showNextDigital();
          }
        }
      }
    }
  });
} 

  addSwipeFunctionality();

    const btn = document.querySelector('.lets-work');
  
    if (btn) {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`);
      });

      btn.addEventListener('mouseleave', () => {
        // Reset to center when leaving
        btn.style.setProperty('--x', '50%');
        btn.style.setProperty('--y', '50%');
      });
    }

    const btn1 = document.querySelector('.nav-back');
  
    if (btn1) {
      btn1.addEventListener('mousemove', (e) => {
        const rect1 = btn1.getBoundingClientRect();
        const x1 = e.clientX - rect1.left;
        const y1 = e.clientY - rect1.top;
        
        btn1.style.setProperty('--x1', `${x1}px`);
        btn1.style.setProperty('--y1', `${y1}px`);
      });

      btn1.addEventListener('mouseleave', () => {
        // Reset to center when leaving
        btn1.style.setProperty('--x1', '50%');
        btn1.style.setProperty('--y1', '50%');
      });
    }
  // Lightbox elements
  const hoverButtons = document.querySelectorAll('.hover-button')
  const lightbox = document.querySelector('.lightbox');
  const lightbox1 = document.querySelector('.lightbox1');
  const lightbox1Image = document.querySelector('.lightbox1-image');
  const lightbox1Close = document.querySelector('.lightbox1-close');
  const prevButton1 = document.querySelector('.prev1-nav');
  const nextButton1 = document.querySelector('.next1-nav');
  const lightboxCounter1 = document.querySelector('.lightbox1-counter');


  const digitalCards = document.querySelectorAll('.digital-card');
  const digitalImages = document.querySelectorAll('.digital-card .digital');

  // Initialize digital lightbox
  function initDigitalLightbox() {
      // Add click event to each digital card
      digitalCards.forEach(card => {
          card.addEventListener('click', function() {
              openDigitalLightbox(this);
          });
      });

      // Digital lightbox controls
      lightbox1Close.addEventListener('click', closeDigitalLightbox);
      prevButton1.addEventListener('click', showPrevDigital);
      nextButton1.addEventListener('click', showNextDigital);

      // Keyboard navigation for digital lightbox
      document.addEventListener('keydown', function(e) {
          if (lightbox1.classList.contains('active')) {
              if (e.key === 'Escape') closeDigitalLightbox();
              if (e.key === 'ArrowLeft') showPrevDigital();
              if (e.key === 'ArrowRight') showNextDigital();
          }
      });

      // Close digital lightbox when clicking on background
      lightbox1.addEventListener('click', function(e) {
          if (e.target === lightbox1) {
              closeDigitalLightbox();
          }
      });
  }

  // Open digital lightbox
  function openDigitalLightbox(card) {
      currentIndex = Array.from(digitalCards).indexOf(card);
      updateDigitalLightboxImage();
      lightbox1.classList.add('active');
      document.body.style.overflow = 'hidden';
  }

  // Close digital lightbox
  function closeDigitalLightbox() {
      lightbox1.classList.remove('active');
      document.body.style.overflow = '';
  }

  // Show previous digital image
  function showPrevDigital() {
      if (currentIndex > 0) {
          currentIndex--;
      } else {
          currentIndex = digitalCards.length - 1;
      }
      updateDigitalLightboxImage();
  }

  // Show next digital image
  function showNextDigital() {
      if (currentIndex < digitalCards.length - 1) {
          currentIndex++;
      } else {
          currentIndex = 0;
      }
      updateDigitalLightboxImage();
  }

  // Update digital lightbox with current image
  function updateDigitalLightboxImage() {
      const currentDigital = digitalCards[currentIndex];
      const imageSrc = currentDigital.querySelector('.digital').src;
      
      lightbox1Image.src = imageSrc;
      lightboxCounter1.textContent = `${currentIndex + 1} / ${digitalCards.length}`;
  }

  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxClose = document.querySelector('.lightbox-close');
  const prevButton = document.querySelector('.prev-nav');
  const nextButton = document.querySelector('.next-nav');
  const lightboxCounter = document.querySelector('.lightbox-counter');
  const projectTitle = document.querySelector('.project-title');
  const imageDate = document.querySelector('.image-date');
  const photographerLocation = document.querySelector('.photographer-location');
  const photographerDescription = document.querySelector('.photographer-description');
  const imageInfo = document.querySelector('.image-info');

  // Gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Filter elements
  const filterToggle = document.querySelector('.filter-toggle-btn');
  const filterChevron = document.querySelector('.dropdown i');
  const filterEnvironment = document.querySelector('.filter-environment');
  const categoryPills = document.querySelectorAll('.filter-pill[data-category]');

  // State variables
  let currentImages = [];
  let currentIndex = 0;
  let activeFilters = {
    categories: ['fashion', 'commercial', 'runway', 'test'] // Added 'test' category
  };



  // Initialize gallery
  function initGallery() {
    // Add click event to each gallery item
    galleryItems.forEach(item => {
      item.addEventListener('click', function () {
        openLightbox(this);
      });
    });

    // Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Filter toggle
    filterToggle.addEventListener('click', function () {
      filterEnvironment.classList.toggle('active');
      filterChevron.classList.toggle('dropped');
    });

    // Category pill events
    categoryPills.forEach(pill => {
      pill.addEventListener('click', function () {
        this.classList.toggle('active');
        updateCategoryFilters();
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
      }
    });

    // Close lightbox when clicking on background
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Apply initial filters
    applyFilters();
  }

  // Update category filters
  function updateCategoryFilters() {
    activeFilters.categories = Array.from(categoryPills)
      .filter(pill => pill.classList.contains('active'))
      .map(pill => pill.dataset.category);

    applyFilters();
  }

  // Apply all active filters
  function applyFilters() {
    // Get all gallery items
    const items = Array.from(galleryItems);

    // Filter by category
    const filtered = items.filter(item => {
      return activeFilters.categories.includes(item.dataset.category);
    });

    // Hide all items first
    items.forEach(item => {
      item.style.display = 'none';
    });

    // Show filtered items
    filtered.forEach((item, index) => {
      item.style.display = 'block';
      item.style.order = index;
    });

    // Update current images for lightbox navigation
    currentImages = filtered;
  }

  // Open lightbox with specific image
  function openLightbox(item) {
    currentImages = Array.from(document.querySelectorAll('.gallery-item[style*="display: block"]'));
    currentIndex = currentImages.indexOf(item);

    // Update lightbox image
    updateLightboxImage();

    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
  }

  // Show previous image
  function showPrevImage() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = currentImages.length - 1; // Loop to end
    }
    updateLightboxImage();
  }

  // Show next image
  function showNextImage() {
    if (currentIndex < currentImages.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop to beginning
    }
    updateLightboxImage();
  }

  // Update lightbox with current image
  function updateLightboxImage() {
    const currentItem = currentImages[currentIndex];
    const imageSrc = currentItem.querySelector('img').src;

    lightboxImage.src = imageSrc;
    projectTitle.textContent = currentItem.dataset.project;
    imageDate.textContent = `${formatDate(currentItem.dataset.date)}`;
    
    // Update location and description
    photographerLocation.textContent = currentItem.dataset.location || '';
    photographerDescription.textContent = currentItem.dataset.description || '';
    
    // Clear previous photographer/designer buttons
    const existingButtons = document.querySelectorAll('.photographer-btn, .designer-btn');
    existingButtons.forEach(btn => btn.remove());
    
    // Create photographer button if data exists
    if (currentItem.dataset.photographer) {
      const photographerBtn = document.createElement('button');
      photographerBtn.className = 'photographer-btn';
      photographerBtn.innerHTML = `<i class="fas fa-camera"></i><span>${currentItem.dataset.photographer}</span>`;
      
      // Add click event to open link if available
      if (currentItem.dataset.photographerLink) {
        photographerBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          window.open(currentItem.dataset.photographerLink, '_blank');
        });
      }
      
      // Insert before the photographer details
      const photographerDetails = document.querySelector('.photographer-details');
      imageInfo.insertBefore(photographerBtn, photographerDetails);
    }
    
    // Create designer button if data exists
    if (currentItem.dataset.designer) {
      const designerBtn = document.createElement('button');
      designerBtn.className = 'designer-btn';
      designerBtn.innerHTML = `<i class="fa-solid fa-shirt"></i><span>${currentItem.dataset.designer}</span>`;
      
      // Add click event to open link if available
      if (currentItem.dataset.designerLink) {
        designerBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          window.open(currentItem.dataset.designerLink, '_blank');
        });
      }
      
      // Insert before the photographer details
      const photographerDetails = document.querySelector('.photographer-details');
      imageInfo.insertBefore(designerBtn, photographerDetails);
    }
    
    // Style the buttons container
    const buttons = document.querySelectorAll('.photographer-btn, .designer-btn');
    if (buttons.length > 0) {
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'info-buttons';
      buttonsContainer.style.display = 'flex';
      buttonsContainer.style.gap = '10px';
      buttonsContainer.style.marginTop = '0px';
      buttonsContainer.style.flexWrap = 'wrap';
      buttonsContainer.style.justifyContent = 'center';
      
      // Move buttons into container
      buttons.forEach(btn => {
        buttonsContainer.appendChild(btn);
      });
      
      // Insert container before photographer details
      const photographerDetails = document.querySelector('.photographer-details');
      imageInfo.insertBefore(buttonsContainer, photographerDetails);
    }
    
    lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  }

  // Format date to more readable format
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  // Back button functionality
  const backButton = document.querySelector('.back-to-projects');
  const projectsPage = document.querySelector('.projects-page');
  const infoPage = document.querySelector('.info-page');

  if (backButton) {
    backButton.addEventListener('click', function () {
      projectsPage.classList.remove('hidden');
      infoPage.classList.remove('active');
    });
  }

  // Page navigation functionality
  const letsWorkBtn = document.querySelector('.lets-work');
  
  if (letsWorkBtn) {
    letsWorkBtn.addEventListener('click', function () {
      projectsPage.classList.add('hidden');
      infoPage.classList.add('active');
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });
  }

  // Initialize the gallery
  initGallery();
  initDigitalLightbox();

});
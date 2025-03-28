document.addEventListener('DOMContentLoaded', function() {
    // Path animation setup
    const paths = {
        desktop: document.querySelector('.route svg:not(.mobile) .overlay'),
        mobile: document.querySelector('.route svg.mobile .overlay')
    };

    const pathLengths = {
        desktop: paths.desktop.getTotalLength(),
        mobile: paths.mobile.getTotalLength()
    };

    for (const type in paths) {
        paths[type].style.strokeDasharray = `${pathLengths[type]} ${pathLengths[type]}`;
        paths[type].style.strokeDashoffset = pathLengths[type];
    }

    // Scroll animations
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate work items if this is the featured work section
                if (entry.target.classList.contains('featured-work')) {
                    const workItems = entry.target.querySelectorAll('.work-item');
                    workItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Set initial styles and observe sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // Initialize work items with hidden state
    document.querySelectorAll('.work-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease-out';
    });

    // Path animation on scroll
    function updatePath() {
        const scrollPercent = (document.documentElement.scrollTop + document.body.scrollTop) / 
            (document.documentElement.scrollHeight - window.innerHeight);
        
        for (const type in paths) {
            const drawLength = pathLengths[type] * scrollPercent;
            paths[type].style.strokeDashoffset = pathLengths[type] - drawLength;
        }
    }

    // Smooth scroll for submit button
    const submitButton = document.querySelector('.submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            // You can add your submission form logic here
            alert('Submission form coming soon!');
        });
    }

    // Add hover effect to categories
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-3px)';
            category.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });
        
        category.addEventListener('mouseleave', () => {
            category.style.transform = 'translateY(0)';
            category.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        });
    });

    // Listen for scroll events
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updatePath);
    });
    
    // Initial update
    updatePath();


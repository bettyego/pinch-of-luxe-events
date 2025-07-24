// Cache busting script - forces browser to reload resources
(function() {
    // Add timestamp to all CSS and JS files
    const timestamp = Date.now();
    
    // Function to add cache buster to URLs
    function addCacheBuster(url) {
        const separator = url.includes('?') ? '&' : '?';
        return url + separator + 'v=' + timestamp;
    }
    
    // Override fetch to add cache busters
    const originalFetch = window.fetch;
    window.fetch = function(url, options = {}) {
        if (typeof url === 'string' && (url.endsWith('.js') || url.endsWith('.css') || url.includes('/src/'))) {
            url = addCacheBuster(url);
        }
        return originalFetch(url, options);
    };
    
    // Add cache buster to dynamically loaded resources
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    if (node.tagName === 'SCRIPT' && node.src) {
                        node.src = addCacheBuster(node.src);
                    }
                    if (node.tagName === 'LINK' && node.href && node.rel === 'stylesheet') {
                        node.href = addCacheBuster(node.href);
                    }
                }
            });
        });
    });
    
    observer.observe(document.head, { childList: true, subtree: true });
    
    // Force reload of existing stylesheets
    document.addEventListener('DOMContentLoaded', function() {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(function(link) {
            if (link.href && !link.href.includes('v=')) {
                link.href = addCacheBuster(link.href);
            }
        });
    });
})();

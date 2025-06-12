
/**
 * دیجی‌کتاب - جاوا اسکریپت اصلی
 */

(function($) {
    'use strict';

    // Global variables
    let currentPage = 1;
    let isLoading = false;
    let currentFilters = {
        category: '',
        author: '',
        search: ''
    };

    // Initialize when document is ready
    $(document).ready(function() {
        initializeDigiKetab();
    });

    function initializeDigiKetab() {
        // Event listeners
        setupEventListeners();
        
        // Initialize components
        initializeSearch();
        initializeFilters();
        initializeViewToggle();
        initializeBookCards();
        initializeModal();
        
        // Load initial books if container is empty
        if ($('#digiketab-books-container .digiketab-book-card').length === 0) {
            loadBooks();
        }
    }

    function setupEventListeners() {
        // Search functionality
        $('#digiketab-search-btn').off('click').on('click', handleSearch);
        $('#digiketab-search').off('keypress').on('keypress', function(e) {
            if (e.which === 13) {
                handleSearch();
            }
        });

        // Filter functionality
        $('#digiketab-category-filter, #digiketab-author-filter').off('change').on('change', handleFilter);

        // View toggle
        $('#digiketab-grid-view').off('click').on('click', function() {
            switchView('grid');
        });
        $('#digiketab-shelf-view').off('click').on('click', function() {
            switchView('shelf');
        });

        // Load more
        $('#digiketab-load-more-btn').off('click').on('click', loadMoreBooks);

        // Book actions
        $(document).off('click', '.digiketab-read-btn').on('click', '.digiketab-read-btn', function(e) {
            e.stopPropagation();
            const bookId = $(this).data('book-id');
            openBookReader(bookId);
        });

        $(document).off('click', '.digiketab-download-btn').on('click', '.digiketab-download-btn', function(e) {
            e.stopPropagation();
            const bookId = $(this).data('book-id');
            downloadBook(bookId);
        });

        $(document).off('click', '.digiketab-book-card').on('click', '.digiketab-book-card', function(e) {
            if (!$(e.target).is('button')) {
                const bookId = $(this).data('book-id');
                showBookDetails(bookId);
            }
        });

        // Modal functionality
        $('.digiketab-modal-close').off('click').on('click', function() {
            $(this).closest('.digiketab-modal').hide();
        });

        $(window).off('click.modal').on('click.modal', function(e) {
            if ($(e.target).hasClass('digiketab-modal')) {
                $('.digiketab-modal').hide();
            }
        });
    }

    function initializeSearch() {
        // Auto-complete functionality could be added here
        $('#digiketab-search').attr('placeholder', 'جستجوی کتاب، نویسنده یا موضوع...');
    }

    function initializeFilters() {
        // Set default values if needed
        currentFilters.category = $('#digiketab-category-filter').val() || '';
        currentFilters.author = $('#digiketab-author-filter').val() || '';
    }

    function initializeViewToggle() {
        // Set initial view based on container class
        if ($('#digiketab-books-container').hasClass('digiketab-books-shelf')) {
            $('#digiketab-shelf-view').addClass('active');
            $('#digiketab-grid-view').removeClass('active');
        } else {
            $('#digiketab-grid-view').addClass('active');
            $('#digiketab-shelf-view').removeClass('active');
        }
    }

    function initializeBookCards() {
        // Add hover effects and animations
        $('.digiketab-book-card').each(function() {
            $(this).css('animation-delay', Math.random() * 0.5 + 's');
        });
    }

    function initializeModal() {
        // Ensure modal is hidden initially
        $('.digiketab-modal').hide();
    }

    function handleSearch() {
        const searchTerm = $('#digiketab-search').val().trim();
        currentFilters.search = searchTerm;
        currentPage = 1;
        
        if (searchTerm) {
            searchBooks(searchTerm);
        } else {
            loadBooks();
        }
    }

    function handleFilter() {
        currentFilters.category = $('#digiketab-category-filter').val();
        currentFilters.author = $('#digiketab-author-filter').val();
        currentPage = 1;
        
        loadBooks();
    }

    function searchBooks(searchTerm) {
        if (isLoading) return;
        
        isLoading = true;
        showLoading();
        
        $.ajax({
            url: digiketab_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'digiketab_search_books',
                nonce: digiketab_ajax.nonce,
                search: searchTerm
            },
            success: function(response) {
                if (response.success) {
                    displayBooks(response.data);
                    hideLoadMore();
                } else {
                    showError('خطا در جستجو');
                }
            },
            error: function() {
                showError('خطا در ارتباط با سرور');
            },
            complete: function() {
                isLoading = false;
                hideLoading();
            }
        });
    }

    function loadBooks() {
        if (isLoading) return;
        
        isLoading = true;
        showLoading();
        
        $.ajax({
            url: digiketab_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'digiketab_get_books',
                nonce: digiketab_ajax.nonce,
                category: currentFilters.category,
                author: currentFilters.author,
                limit: 12,
                offset: 0
            },
            success: function(response) {
                if (response.success) {
                    displayBooks(response.data);
                    showLoadMore();
                } else {
                    showError('خطا در بارگیری کتاب‌ها');
                }
            },
            error: function() {
                showError('خطا در ارتباط با سرور');
            },
            complete: function() {
                isLoading = false;
                hideLoading();
            }
        });
    }

    function loadMoreBooks() {
        if (isLoading) return;
        
        isLoading = true;
        $('#digiketab-load-more-btn').text('در حال بارگیری...');
        
        $.ajax({
            url: digiketab_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'digiketab_get_books',
                nonce: digiketab_ajax.nonce,
                category: currentFilters.category,
                author: currentFilters.author,
                limit: 12,
                offset: currentPage * 12
            },
            success: function(response) {
                if (response.success) {
                    appendBooks(response.data);
                    currentPage++;
                    
                    if (response.data.length < 12) {
                        hideLoadMore();
                    }
                } else {
                    showError('خطا در بارگیری کتاب‌های بیشتر');
                }
            },
            error: function() {
                showError('خطا در ارتباط با سرور');
            },
            complete: function() {
                isLoading = false;
                $('#digiketab-load-more-btn').text('📚 مشاهده کتاب‌های بیشتر');
            }
        });
    }

    function switchView(viewType) {
        $('.digiketab-view-toggle button').removeClass('active');
        $('#digiketab-' + viewType + '-view').addClass('active');
        
        $('#digiketab-books-container')
            .removeClass('digiketab-books-grid digiketab-books-shelf')
            .addClass('digiketab-books-' + viewType);
        
        // Save preference to localStorage
        localStorage.setItem('digiketab_view_preference', viewType);
    }

    function displayBooks(books) {
        const container = $('#digiketab-books-container');
        container.html('');
        
        if (books.length === 0) {
            container.html('<div class="digiketab-no-books">هیچ کتابی یافت نشد</div>');
            return;
        }
        
        books.forEach(function(book, index) {
            const bookHtml = createBookHTML(book);
            const bookElement = $(bookHtml);
            bookElement.css('animation-delay', (index * 0.1) + 's');
            container.append(bookElement);
        });
        
        // Re-initialize book cards
        initializeBookCards();
    }

    function appendBooks(books) {
        const container = $('#digiketab-books-container');
        const existingBooks = container.find('.digiketab-book-card').length;
        
        books.forEach(function(book, index) {
            const bookHtml = createBookHTML(book);
            const bookElement = $(bookHtml);
            bookElement.css('animation-delay', ((existingBooks + index) * 0.1) + 's');
            container.append(bookElement);
        });
    }

    function createBookHTML(book) {
        const thumbnail = book.thumbnail || '';
        const author = book.author || '';
        const category = book.category || '';
        const pages = book.pages || '';

        return `
            <div class="digiketab-book-card" data-book-id="${book.id}">
                <div class="digiketab-book-cover">
                    ${thumbnail ? 
                        `<img src="${thumbnail}" alt="${escapeHtml(book.title)}" loading="lazy" />` : 
                        '<div class="digiketab-book-placeholder">📖</div>'
                    }
                    <div class="digiketab-book-overlay">
                        <button class="digiketab-read-btn" data-book-id="${book.id}" title="مطالعه کتاب">
                            📖 مطالعه
                        </button>
                        <button class="digiketab-download-btn" data-book-id="${book.id}" title="دانلود کتاب">
                            ⬇️ دانلود
                        </button>
                    </div>
                </div>
                
                <div class="digiketab-book-info">
                    <h3 class="digiketab-book-title">${escapeHtml(book.title)}</h3>
                    ${author ? `<p class="digiketab-book-author">👤 ${escapeHtml(author)}</p>` : ''}
                    ${category ? `<p class="digiketab-book-category">🏷️ ${escapeHtml(category)}</p>` : ''}
                    ${pages ? `<p class="digiketab-book-pages">📄 ${escapeHtml(pages)} صفحه</p>` : ''}
                </div>
            </div>
        `;
    }

    function openBookReader(bookId) {
        // Check if we're already in a reader page
        if (window.location.href.includes('digiketab_reader')) {
            window.location.href = updateUrlParameter(window.location.href, 'book_id', bookId);
        } else {
            // Open in new window/tab
            const readerUrl = window.location.origin + window.location.pathname + '?digiketab_reader=1&book_id=' + bookId;
            window.open(readerUrl, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
        }
    }

    function downloadBook(bookId) {
        // Trigger download
        window.location.href = window.location.pathname + '?digiketab_download=1&book_id=' + bookId;
    }

    function showBookDetails(bookId) {
        // Load book details in modal
        $.ajax({
            url: digiketab_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'digiketab_get_book_details',
                nonce: digiketab_ajax.nonce,
                book_id: bookId
            },
            success: function(response) {
                if (response.success) {
                    displayBookDetailsModal(response.data);
                }
            }
        });
    }

    function displayBookDetailsModal(book) {
        const modalHtml = `
            <div class="digiketab-book-details">
                <div class="digiketab-book-details-header">
                    <div class="digiketab-book-details-cover">
                        ${book.thumbnail ? 
                            `<img src="${book.thumbnail}" alt="${escapeHtml(book.title)}" />` : 
                            '<div class="digiketab-book-placeholder">📖</div>'
                        }
                    </div>
                    <div class="digiketab-book-details-info">
                        <h2>${escapeHtml(book.title)}</h2>
                        ${book.author ? `<p><strong>نویسنده:</strong> ${escapeHtml(book.author)}</p>` : ''}
                        ${book.category ? `<p><strong>دسته‌بندی:</strong> ${escapeHtml(book.category)}</p>` : ''}
                        ${book.pages ? `<p><strong>تعداد صفحات:</strong> ${escapeHtml(book.pages)}</p>` : ''}
                        ${book.publication_year ? `<p><strong>سال انتشار:</strong> ${escapeHtml(book.publication_year)}</p>` : ''}
                    </div>
                </div>
                <div class="digiketab-book-details-content">
                    ${book.content ? `<div class="digiketab-book-description">${book.content}</div>` : ''}
                </div>
                <div class="digiketab-book-details-actions">
                    <button class="digiketab-read-btn" data-book-id="${book.id}">📖 شروع مطالعه</button>
                    <button class="digiketab-download-btn" data-book-id="${book.id}">⬇️ دانلود کتاب</button>
                </div>
            </div>
        `;
        
        $('#digiketab-modal-body').html(modalHtml);
        $('#digiketab-modal').show();
    }

    function showLoading() {
        const loadingHtml = '<div class="digiketab-loading">در حال بارگیری...</div>';
        $('#digiketab-books-container').html(loadingHtml);
    }

    function hideLoading() {
        $('.digiketab-loading').remove();
    }

    function showLoadMore() {
        $('.digiketab-load-more').show();
    }

    function hideLoadMore() {
        $('.digiketab-load-more').hide();
    }

    function showError(message) {
        const errorHtml = `<div class="digiketab-error">❌ ${message}</div>`;
        $('#digiketab-books-container').html(errorHtml);
    }

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    function updateUrlParameter(url, param, paramVal) {
        let newAdditionalURL = "";
        let tempArray = url.split("?");
        let baseURL = tempArray[0];
        let additionalURL = tempArray[1];
        let temp = "";
        if (additionalURL) {
            tempArray = additionalURL.split("&");
            for (let i = 0; i < tempArray.length; i++) {
                if (tempArray[i].split('=')[0] != param) {
                    newAdditionalURL += temp + tempArray[i];
                    temp = "&";
                }
            }
        }
        let rows_txt = temp + "" + param + "=" + paramVal;
        return baseURL + "?" + newAdditionalURL + rows_txt;
    }

    // Public methods for external use
    window.DigiKetab = {
        loadBooks: loadBooks,
        searchBooks: searchBooks,
        switchView: switchView,
        openReader: openBookReader
    };

})(jQuery);

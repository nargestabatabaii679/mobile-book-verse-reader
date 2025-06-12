
<?php
// Library template
$category = isset($atts['category']) ? $atts['category'] : '';
$limit = isset($atts['limit']) ? $atts['limit'] : 12;
$view = isset($atts['view']) ? $atts['view'] : 'grid';

$args = array(
    'post_type' => 'digiketab_book',
    'post_status' => 'publish',
    'posts_per_page' => $limit
);

if ($category) {
    $args['tax_query'] = array(
        array(
            'taxonomy' => 'book_category',
            'field' => 'slug',
            'terms' => $category
        )
    );
}

$books = get_posts($args);
$categories = get_terms(array('taxonomy' => 'book_category', 'hide_empty' => false));
$authors = get_terms(array('taxonomy' => 'book_author', 'hide_empty' => false));
?>

<div id="digiketab-library" class="digiketab-container">
    <!-- Header -->
    <div class="digiketab-header">
        <h1 class="digiketab-title">📚 کتابخانه دیجیتال</h1>
        <p class="digiketab-subtitle">مجموعه‌ای از بهترین کتاب‌ها برای مطالعه آنلاین</p>
    </div>

    <!-- Search and Filters -->
    <div class="digiketab-controls">
        <div class="digiketab-search-section">
            <div class="digiketab-search-box">
                <input type="text" id="digiketab-search" placeholder="جستجوی کتاب، نویسنده یا موضوع..." />
                <button type="button" id="digiketab-search-btn">🔍</button>
            </div>
        </div>

        <div class="digiketab-filters">
            <div class="digiketab-filter-group">
                <label>دسته‌بندی:</label>
                <select id="digiketab-category-filter">
                    <option value="">همه دسته‌ها</option>
                    <?php foreach ($categories as $cat): ?>
                        <option value="<?php echo esc_attr($cat->slug); ?>"><?php echo esc_html($cat->name); ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="digiketab-filter-group">
                <label>نویسنده:</label>
                <select id="digiketab-author-filter">
                    <option value="">همه نویسندگان</option>
                    <?php foreach ($authors as $author): ?>
                        <option value="<?php echo esc_attr($author->slug); ?>"><?php echo esc_html($author->name); ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="digiketab-view-toggle">
                <button type="button" id="digiketab-grid-view" class="<?php echo $view === 'grid' ? 'active' : ''; ?>">📊</button>
                <button type="button" id="digiketab-shelf-view" class="<?php echo $view === 'shelf' ? 'active' : ''; ?>">📚</button>
            </div>
        </div>
    </div>

    <!-- Books Grid -->
    <div id="digiketab-books-container" class="digiketab-books-<?php echo $view; ?>">
        <?php foreach ($books as $book): 
            $thumbnail = get_the_post_thumbnail_url($book->ID, 'medium');
            $author = get_post_meta($book->ID, 'book_author', true);
            $pages = get_post_meta($book->ID, 'book_pages', true);
            $category_terms = get_the_terms($book->ID, 'book_category');
            $category = $category_terms ? $category_terms[0]->name : '';
        ?>
            <div class="digiketab-book-card" data-book-id="<?php echo $book->ID; ?>">
                <div class="digiketab-book-cover">
                    <?php if ($thumbnail): ?>
                        <img src="<?php echo esc_url($thumbnail); ?>" alt="<?php echo esc_attr($book->post_title); ?>" />
                    <?php else: ?>
                        <div class="digiketab-book-placeholder">📖</div>
                    <?php endif; ?>
                    <div class="digiketab-book-overlay">
                        <button class="digiketab-read-btn" data-book-id="<?php echo $book->ID; ?>">📖 مطالعه</button>
                        <button class="digiketab-download-btn" data-book-id="<?php echo $book->ID; ?>">⬇️ دانلود</button>
                    </div>
                </div>
                
                <div class="digiketab-book-info">
                    <h3 class="digiketab-book-title"><?php echo esc_html($book->post_title); ?></h3>
                    <?php if ($author): ?>
                        <p class="digiketab-book-author">👤 <?php echo esc_html($author); ?></p>
                    <?php endif; ?>
                    <?php if ($category): ?>
                        <p class="digiketab-book-category">🏷️ <?php echo esc_html($category); ?></p>
                    <?php endif; ?>
                    <?php if ($pages): ?>
                        <p class="digiketab-book-pages">📄 <?php echo esc_html($pages); ?> صفحه</p>
                    <?php endif; ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <!-- Load More Button -->
    <div class="digiketab-load-more">
        <button type="button" id="digiketab-load-more-btn">📚 مشاهده کتاب‌های بیشتر</button>
    </div>

    <!-- Book Detail Modal -->
    <div id="digiketab-modal" class="digiketab-modal" style="display: none;">
        <div class="digiketab-modal-content">
            <span class="digiketab-modal-close">&times;</span>
            <div id="digiketab-modal-body">
                <!-- Content will be loaded dynamically -->
            </div>
        </div>
    </div>
</div>

<script>
jQuery(document).ready(function($) {
    let currentPage = 1;
    let isLoading = false;

    // Search functionality
    $('#digiketab-search-btn').click(function() {
        searchBooks();
    });

    $('#digiketab-search').keypress(function(e) {
        if (e.which == 13) {
            searchBooks();
        }
    });

    // Filter functionality
    $('#digiketab-category-filter, #digiketab-author-filter').change(function() {
        filterBooks();
    });

    // View toggle
    $('#digiketab-grid-view').click(function() {
        switchView('grid');
    });

    $('#digiketab-shelf-view').click(function() {
        switchView('shelf');
    });

    // Load more
    $('#digiketab-load-more-btn').click(function() {
        loadMoreBooks();
    });

    // Book actions
    $(document).on('click', '.digiketab-read-btn', function() {
        const bookId = $(this).data('book-id');
        openBookReader(bookId);
    });

    $(document).on('click', '.digiketab-download-btn', function() {
        const bookId = $(this).data('book-id');
        downloadBook(bookId);
    });

    // Modal functionality
    $('.digiketab-modal-close').click(function() {
        $('#digiketab-modal').hide();
    });

    function searchBooks() {
        const searchTerm = $('#digiketab-search').val();
        
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
                }
            }
        });
    }

    function filterBooks() {
        const category = $('#digiketab-category-filter').val();
        const author = $('#digiketab-author-filter').val();
        
        $.ajax({
            url: digiketab_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'digiketab_get_books',
                nonce: digiketab_ajax.nonce,
                category: category,
                author: author,
                limit: 12,
                offset: 0
            },
            success: function(response) {
                if (response.success) {
                    displayBooks(response.data);
                    currentPage = 1;
                }
            }
        });
    }

    function loadMoreBooks() {
        if (isLoading) return;
        
        isLoading = true;
        $('#digiketab-load-more-btn').text('در حال بارگیری...');
        
        const category = $('#digiketab-category-filter').val();
        const author = $('#digiketab-author-filter').val();
        
        $.ajax({
            url: digiketab_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'digiketab_get_books',
                nonce: digiketab_ajax.nonce,
                category: category,
                author: author,
                limit: 12,
                offset: currentPage * 12
            },
            success: function(response) {
                if (response.success) {
                    appendBooks(response.data);
                    currentPage++;
                }
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
        $('#digiketab-books-container').removeClass('digiketab-books-grid digiketab-books-shelf');
        $('#digiketab-books-container').addClass('digiketab-books-' + viewType);
    }

    function displayBooks(books) {
        let html = '';
        books.forEach(function(book) {
            html += createBookHTML(book);
        });
        $('#digiketab-books-container').html(html);
    }

    function appendBooks(books) {
        let html = '';
        books.forEach(function(book) {
            html += createBookHTML(book);
        });
        $('#digiketab-books-container').append(html);
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
                        `<img src="${thumbnail}" alt="${book.title}" />` : 
                        '<div class="digiketab-book-placeholder">📖</div>'
                    }
                    <div class="digiketab-book-overlay">
                        <button class="digiketab-read-btn" data-book-id="${book.id}">📖 مطالعه</button>
                        <button class="digiketab-download-btn" data-book-id="${book.id}">⬇️ دانلود</button>
                    </div>
                </div>
                
                <div class="digiketab-book-info">
                    <h3 class="digiketab-book-title">${book.title}</h3>
                    ${author ? `<p class="digiketab-book-author">👤 ${author}</p>` : ''}
                    ${category ? `<p class="digiketab-book-category">🏷️ ${category}</p>` : ''}
                    ${pages ? `<p class="digiketab-book-pages">📄 ${pages} صفحه</p>` : ''}
                </div>
            </div>
        `;
    }

    function openBookReader(bookId) {
        // Open book reader in modal or new page
        window.open(`?digiketab_reader=1&book_id=${bookId}`, '_blank');
    }

    function downloadBook(bookId) {
        // Trigger book download
        window.location.href = `?digiketab_download=1&book_id=${bookId}`;
    }
});
</script>


<?php
// Book reader template
$book_id = isset($atts['book_id']) ? intval($atts['book_id']) : 0;

if (isset($_GET['book_id'])) {
    $book_id = intval($_GET['book_id']);
}

if (!$book_id) {
    echo '<p>کتاب مورد نظر یافت نشد.</p>';
    return;
}

$book = get_post($book_id);
if (!$book || $book->post_type !== 'digiketab_book') {
    echo '<p>کتاب مورد نظر یافت نشد.</p>';
    return;
}

$pdf_file = get_post_meta($book_id, 'book_pdf_file', true);
$author = get_post_meta($book_id, 'book_author', true);
$pages = get_post_meta($book_id, 'book_pages', true);
?>

<div id="digiketab-reader" class="digiketab-reader-container">
    <!-- Reader Header -->
    <div class="digiketab-reader-header">
        <div class="digiketab-reader-info">
            <h1 class="digiketab-reader-title"><?php echo esc_html($book->post_title); ?></h1>
            <?php if ($author): ?>
                <p class="digiketab-reader-author">نویسنده: <?php echo esc_html($author); ?></p>
            <?php endif; ?>
        </div>
        
        <div class="digiketab-reader-controls">
            <button id="digiketab-fullscreen-btn" title="تمام صفحه">🔳</button>
            <button id="digiketab-download-btn" title="دانلود کتاب">⬇️</button>
            <button id="digiketab-share-btn" title="اشتراک‌گذاری">📤</button>
            <button id="digiketab-close-btn" title="بستن">✖️</button>
        </div>
    </div>

    <!-- Reader Content -->
    <div class="digiketab-reader-content">
        <?php if ($pdf_file): ?>
            <!-- PDF Viewer -->
            <div id="digiketab-pdf-container">
                <iframe 
                    src="<?php echo esc_url($pdf_file); ?>" 
                    width="100%" 
                    height="600px" 
                    frameborder="0">
                </iframe>
            </div>
            
            <!-- Custom PDF Controls -->
            <div class="digiketab-pdf-controls">
                <button id="digiketab-prev-page">⬅️ صفحه قبل</button>
                <span id="digiketab-page-info">صفحه <span id="current-page">1</span> از <span id="total-pages"><?php echo $pages ? $pages : '?'; ?></span></span>
                <button id="digiketab-next-page">صفحه بعد ➡️</button>
                
                <div class="digiketab-zoom-controls">
                    <button id="digiketab-zoom-out">🔍-</button>
                    <span id="digiketab-zoom-level">100%</span>
                    <button id="digiketab-zoom-in">🔍+</button>
                </div>
            </div>
        <?php else: ?>
            <!-- Text Content Viewer -->
            <div id="digiketab-text-container">
                <div class="digiketab-text-content">
                    <?php echo wp_kses_post($book->post_content); ?>
                </div>
                
                <!-- Text Controls -->
                <div class="digiketab-text-controls">
                    <div class="digiketab-font-controls">
                        <label>اندازه فونت:</label>
                        <button id="digiketab-font-decrease">A-</button>
                        <span id="digiketab-font-size">16px</span>
                        <button id="digiketab-font-increase">A+</button>
                    </div>
                    
                    <div class="digiketab-theme-controls">
                        <label>پوسته:</label>
                        <button class="digiketab-theme-btn active" data-theme="light">روشن</button>
                        <button class="digiketab-theme-btn" data-theme="dark">تیره</button>
                        <button class="digiketab-theme-btn" data-theme="sepia">کاغذی</button>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <!-- Progress Bar -->
    <div class="digiketab-progress-container">
        <div class="digiketab-progress-bar">
            <div id="digiketab-progress" class="digiketab-progress-fill"></div>
        </div>
        <span class="digiketab-progress-text">پیشرفت مطالعه: <span id="digiketab-progress-percent">0%</span></span>
    </div>

    <!-- Share Modal -->
    <div id="digiketab-share-modal" class="digiketab-modal" style="display: none;">
        <div class="digiketab-modal-content">
            <span class="digiketab-modal-close">&times;</span>
            <h3>اشتراک‌گذاری کتاب</h3>
            
            <div class="digiketab-share-options">
                <div class="digiketab-qr-code">
                    <div id="digiketab-qr-container"></div>
                    <p>QR کد برای دسترسی سریع</p>
                </div>
                
                <div class="digiketab-share-links">
                    <input type="text" id="digiketab-share-url" value="<?php echo esc_url(get_permalink($book_id)); ?>" readonly />
                    <button id="digiketab-copy-url">کپی لینک</button>
                    
                    <div class="digiketab-social-share">
                        <a href="#" id="digiketab-share-telegram" target="_blank">📱 تلگرام</a>
                        <a href="#" id="digiketab-share-whatsapp" target="_blank">💬 واتساپ</a>
                        <a href="#" id="digiketab-share-email" target="_blank">📧 ایمیل</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
jQuery(document).ready(function($) {
    let currentPage = 1;
    let totalPages = <?php echo $pages ? intval($pages) : 1; ?>;
    let zoomLevel = 100;
    let fontSize = 16;
    let currentTheme = 'light';

    // Initialize reader
    initializeReader();

    function initializeReader() {
        // Set initial values
        $('#current-page').text(currentPage);
        $('#total-pages').text(totalPages);
        $('#digiketab-zoom-level').text(zoomLevel + '%');
        $('#digiketab-font-size').text(fontSize + 'px');
        
        // Apply initial theme
        applyTheme(currentTheme);
    }

    // PDF Controls
    $('#digiketab-prev-page').click(function() {
        if (currentPage > 1) {
            currentPage--;
            updatePageDisplay();
        }
    });

    $('#digiketab-next-page').click(function() {
        if (currentPage < totalPages) {
            currentPage++;
            updatePageDisplay();
        }
    });

    $('#digiketab-zoom-out').click(function() {
        if (zoomLevel > 50) {
            zoomLevel -= 25;
            updateZoom();
        }
    });

    $('#digiketab-zoom-in').click(function() {
        if (zoomLevel < 200) {
            zoomLevel += 25;
            updateZoom();
        }
    });

    // Text Controls
    $('#digiketab-font-decrease').click(function() {
        if (fontSize > 12) {
            fontSize -= 2;
            updateFontSize();
        }
    });

    $('#digiketab-font-increase').click(function() {
        if (fontSize < 24) {
            fontSize += 2;
            updateFontSize();
        }
    });

    $('.digiketab-theme-btn').click(function() {
        $('.digiketab-theme-btn').removeClass('active');
        $(this).addClass('active');
        currentTheme = $(this).data('theme');
        applyTheme(currentTheme);
    });

    // Reader Controls
    $('#digiketab-fullscreen-btn').click(function() {
        toggleFullscreen();
    });

    $('#digiketab-download-btn').click(function() {
        downloadBook();
    });

    $('#digiketab-share-btn').click(function() {
        openShareModal();
    });

    $('#digiketab-close-btn').click(function() {
        window.close();
    });

    // Share functionality
    $('#digiketab-copy-url').click(function() {
        const urlField = $('#digiketab-share-url')[0];
        urlField.select();
        document.execCommand('copy');
        alert('لینک کپی شد!');
    });

    $('.digiketab-modal-close').click(function() {
        $(this).closest('.digiketab-modal').hide();
    });

    function updatePageDisplay() {
        $('#current-page').text(currentPage);
        updateProgress();
    }

    function updateZoom() {
        $('#digiketab-zoom-level').text(zoomLevel + '%');
        // Apply zoom to PDF iframe or content
        const scale = zoomLevel / 100;
        $('#digiketab-pdf-container iframe, #digiketab-text-container').css('transform', `scale(${scale})`);
    }

    function updateFontSize() {
        $('#digiketab-font-size').text(fontSize + 'px');
        $('.digiketab-text-content').css('font-size', fontSize + 'px');
    }

    function applyTheme(theme) {
        $('#digiketab-reader').removeClass('theme-light theme-dark theme-sepia');
        $('#digiketab-reader').addClass('theme-' + theme);
    }

    function updateProgress() {
        const progress = (currentPage / totalPages) * 100;
        $('#digiketab-progress').css('width', progress + '%');
        $('#digiketab-progress-percent').text(Math.round(progress) + '%');
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    function downloadBook() {
        <?php if ($pdf_file): ?>
            window.open('<?php echo esc_url($pdf_file); ?>', '_blank');
        <?php else: ?>
            // Create text file download
            const content = $('.digiketab-text-content').text();
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = '<?php echo esc_js($book->post_title); ?>.txt';
            link.click();
        <?php endif; ?>
    }

    function openShareModal() {
        $('#digiketab-share-modal').show();
        generateQRCode();
        setupSocialLinks();
    }

    function generateQRCode() {
        // Simple QR code generation (you can use a library like qrcode.js)
        const url = $('#digiketab-share-url').val();
        $('#digiketab-qr-container').html(`
            <div style="width: 150px; height: 150px; border: 2px solid #333; display: flex; align-items: center; justify-content: center; font-size: 12px;">
                QR Code<br/>${url}
            </div>
        `);
    }

    function setupSocialLinks() {
        const url = encodeURIComponent($('#digiketab-share-url').val());
        const title = encodeURIComponent('<?php echo esc_js($book->post_title); ?>');
        
        $('#digiketab-share-telegram').attr('href', `https://t.me/share/url?url=${url}&text=${title}`);
        $('#digiketab-share-whatsapp').attr('href', `https://wa.me/?text=${title} ${url}`);
        $('#digiketab-share-email').attr('href', `mailto:?subject=${title}&body=${url}`);
    }

    // Keyboard shortcuts
    $(document).keydown(function(e) {
        switch(e.keyCode) {
            case 37: // Left arrow
                $('#digiketab-prev-page').click();
                break;
            case 39: // Right arrow
                $('#digiketab-next-page').click();
                break;
            case 27: // Escape
                $('#digiketab-close-btn').click();
                break;
            case 70: // F key
                if (e.ctrlKey) {
                    e.preventDefault();
                    $('#digiketab-fullscreen-btn').click();
                }
                break;
        }
    });
});
</script>

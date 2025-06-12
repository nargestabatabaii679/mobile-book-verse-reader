
<?php
/**
 * Plugin Name: دیجی‌کتاب - کتابخانه دیجیتال
 * Plugin URI: https://example.com/digiketab
 * Description: کتابخانه دیجیتال کامل با قابلیت مطالعه آفلاین کتاب‌ها
 * Version: 1.0.0
 * Author: دیجی‌کتاب تیم
 * Text Domain: digiketab
 * Domain Path: /languages
 * License: GPL v2 or later
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('DIGIKETAB_VERSION', '1.0.0');
define('DIGIKETAB_PLUGIN_URL', plugin_dir_url(__FILE__));
define('DIGIKETAB_PLUGIN_PATH', plugin_dir_path(__FILE__));

// Main plugin class
class DigiKetab {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('admin_enqueue_scripts', array($this, 'admin_enqueue_scripts'));
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    public function init() {
        // Load text domain for translations
        load_plugin_textdomain('digiketab', false, dirname(plugin_basename(__FILE__)) . '/languages');
        
        // Create custom post type for books
        $this->create_book_post_type();
        
        // Add admin menu
        add_action('admin_menu', array($this, 'add_admin_menu'));
        
        // Add shortcodes
        add_shortcode('digiketab_library', array($this, 'library_shortcode'));
        add_shortcode('digiketab_reader', array($this, 'reader_shortcode'));
        
        // AJAX handlers
        add_action('wp_ajax_digiketab_get_books', array($this, 'ajax_get_books'));
        add_action('wp_ajax_nopriv_digiketab_get_books', array($this, 'ajax_get_books'));
        add_action('wp_ajax_digiketab_search_books', array($this, 'ajax_search_books'));
        add_action('wp_ajax_nopriv_digiketab_search_books', array($this, 'ajax_search_books'));
    }
    
    public function create_book_post_type() {
        $labels = array(
            'name' => 'کتاب‌ها',
            'singular_name' => 'کتاب',
            'menu_name' => 'دیجی‌کتاب',
            'add_new' => 'افزودن کتاب جدید',
            'add_new_item' => 'افزودن کتاب جدید',
            'edit_item' => 'ویرایش کتاب',
            'new_item' => 'کتاب جدید',
            'view_item' => 'مشاهده کتاب',
            'search_items' => 'جستجوی کتاب',
            'not_found' => 'کتابی یافت نشد',
            'not_found_in_trash' => 'کتابی در زباله‌دان یافت نشد'
        );
        
        $args = array(
            'labels' => $labels,
            'public' => true,
            'publicly_queryable' => true,
            'show_ui' => true,
            'show_in_menu' => false, // We'll create custom menu
            'query_var' => true,
            'rewrite' => array('slug' => 'book'),
            'capability_type' => 'post',
            'has_archive' => true,
            'hierarchical' => false,
            'menu_position' => null,
            'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
            'show_in_rest' => true
        );
        
        register_post_type('digiketab_book', $args);
        
        // Register taxonomies
        register_taxonomy('book_category', 'digiketab_book', array(
            'hierarchical' => true,
            'labels' => array(
                'name' => 'دسته‌بندی‌ها',
                'singular_name' => 'دسته‌بندی'
            ),
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'rewrite' => array('slug' => 'book-category'),
        ));
        
        register_taxonomy('book_author', 'digiketab_book', array(
            'hierarchical' => false,
            'labels' => array(
                'name' => 'نویسندگان',
                'singular_name' => 'نویسنده'
            ),
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'rewrite' => array('slug' => 'book-author'),
        ));
    }
    
    public function enqueue_scripts() {
        wp_enqueue_style('digiketab-style', DIGIKETAB_PLUGIN_URL . 'assets/css/digiketab.css', array(), DIGIKETAB_VERSION);
        wp_enqueue_script('digiketab-script', DIGIKETAB_PLUGIN_URL . 'assets/js/digiketab.js', array('jquery'), DIGIKETAB_VERSION, true);
        
        // Localize script for AJAX
        wp_localize_script('digiketab-script', 'digiketab_ajax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('digiketab_nonce')
        ));
    }
    
    public function admin_enqueue_scripts() {
        wp_enqueue_style('digiketab-admin-style', DIGIKETAB_PLUGIN_URL . 'assets/css/admin.css', array(), DIGIKETAB_VERSION);
        wp_enqueue_script('digiketab-admin-script', DIGIKETAB_PLUGIN_URL . 'assets/js/admin.js', array('jquery'), DIGIKETAB_VERSION, true);
    }
    
    public function add_admin_menu() {
        add_menu_page(
            'دیجی‌کتاب',
            'دیجی‌کتاب',
            'manage_options',
            'digiketab',
            array($this, 'admin_page'),
            'dashicons-book-alt',
            20
        );
        
        add_submenu_page(
            'digiketab',
            'همه کتاب‌ها',
            'همه کتاب‌ها',
            'manage_options',
            'edit.php?post_type=digiketab_book'
        );
        
        add_submenu_page(
            'digiketab',
            'افزودن کتاب',
            'افزودن کتاب',
            'manage_options',
            'post-new.php?post_type=digiketab_book'
        );
        
        add_submenu_page(
            'digiketab',
            'دسته‌بندی‌ها',
            'دسته‌بندی‌ها',
            'manage_options',
            'edit-tags.php?taxonomy=book_category&post_type=digiketab_book'
        );
        
        add_submenu_page(
            'digiketab',
            'نویسندگان',
            'نویسندگان',
            'manage_options',
            'edit-tags.php?taxonomy=book_author&post_type=digiketab_book'
        );
        
        add_submenu_page(
            'digiketab',
            'تنظیمات',
            'تنظیمات',
            'manage_options',
            'digiketab-settings',
            array($this, 'settings_page')
        );
    }
    
    public function admin_page() {
        include DIGIKETAB_PLUGIN_PATH . 'templates/admin-dashboard.php';
    }
    
    public function settings_page() {
        include DIGIKETAB_PLUGIN_PATH . 'templates/admin-settings.php';
    }
    
    public function library_shortcode($atts) {
        $atts = shortcode_atts(array(
            'category' => '',
            'limit' => 12,
            'view' => 'grid' // grid or shelf
        ), $atts);
        
        ob_start();
        include DIGIKETAB_PLUGIN_PATH . 'templates/library.php';
        return ob_get_clean();
    }
    
    public function reader_shortcode($atts) {
        $atts = shortcode_atts(array(
            'book_id' => 0
        ), $atts);
        
        ob_start();
        include DIGIKETAB_PLUGIN_PATH . 'templates/reader.php';
        return ob_get_clean();
    }
    
    public function ajax_get_books() {
        check_ajax_referer('digiketab_nonce', 'nonce');
        
        $category = sanitize_text_field($_POST['category']);
        $author = sanitize_text_field($_POST['author']);
        $limit = intval($_POST['limit']);
        $offset = intval($_POST['offset']);
        
        $args = array(
            'post_type' => 'digiketab_book',
            'post_status' => 'publish',
            'posts_per_page' => $limit,
            'offset' => $offset
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
        
        if ($author) {
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'book_author',
                    'field' => 'slug',
                    'terms' => $author
                )
            );
        }
        
        $books = get_posts($args);
        $books_data = array();
        
        foreach ($books as $book) {
            $books_data[] = array(
                'id' => $book->ID,
                'title' => $book->post_title,
                'content' => $book->post_content,
                'thumbnail' => get_the_post_thumbnail_url($book->ID, 'medium'),
                'author' => get_post_meta($book->ID, 'book_author', true),
                'category' => get_post_meta($book->ID, 'book_category', true),
                'pages' => get_post_meta($book->ID, 'book_pages', true),
                'pdf_file' => get_post_meta($book->ID, 'book_pdf_file', true),
                'publication_year' => get_post_meta($book->ID, 'book_publication_year', true)
            );
        }
        
        wp_send_json_success($books_data);
    }
    
    public function ajax_search_books() {
        check_ajax_referer('digiketab_nonce', 'nonce');
        
        $search_term = sanitize_text_field($_POST['search']);
        
        $args = array(
            'post_type' => 'digiketab_book',
            'post_status' => 'publish',
            's' => $search_term,
            'posts_per_page' => 20
        );
        
        $books = get_posts($args);
        $books_data = array();
        
        foreach ($books as $book) {
            $books_data[] = array(
                'id' => $book->ID,
                'title' => $book->post_title,
                'thumbnail' => get_the_post_thumbnail_url($book->ID, 'medium'),
                'author' => get_post_meta($book->ID, 'book_author', true),
                'category' => get_post_meta($book->ID, 'book_category', true)
            );
        }
        
        wp_send_json_success($books_data);
    }
    
    public function activate() {
        // Create database tables
        $this->create_tables();
        
        // Create default categories
        $this->create_default_terms();
        
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    public function deactivate() {
        flush_rewrite_rules();
    }
    
    private function create_tables() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'digiketab_logs';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            book_id mediumint(9) NOT NULL,
            action varchar(50) NOT NULL,
            user_id mediumint(9),
            timestamp datetime DEFAULT CURRENT_TIMESTAMP,
            details text,
            PRIMARY KEY (id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    private function create_default_terms() {
        // Create default categories
        $categories = array('ادبیات', 'علمی', 'تاریخ', 'فلسفه', 'کودک و نوجوان');
        foreach ($categories as $category) {
            if (!term_exists($category, 'book_category')) {
                wp_insert_term($category, 'book_category');
            }
        }
    }
}

// Initialize the plugin
new DigiKetab();

// Add meta boxes for book details
add_action('add_meta_boxes', 'digiketab_add_meta_boxes');
function digiketab_add_meta_boxes() {
    add_meta_box(
        'digiketab_book_details',
        'جزئیات کتاب',
        'digiketab_book_details_callback',
        'digiketab_book',
        'normal',
        'high'
    );
}

function digiketab_book_details_callback($post) {
    wp_nonce_field('digiketab_save_meta_box_data', 'digiketab_meta_box_nonce');
    
    $author = get_post_meta($post->ID, 'book_author', true);
    $pages = get_post_meta($post->ID, 'book_pages', true);
    $publication_year = get_post_meta($post->ID, 'book_publication_year', true);
    $pdf_file = get_post_meta($post->ID, 'book_pdf_file', true);
    $isbn = get_post_meta($post->ID, 'book_isbn', true);
    $language = get_post_meta($post->ID, 'book_language', true);
    
    echo '<table class="form-table">';
    echo '<tr><td><label for="book_author">نویسنده:</label></td>';
    echo '<td><input type="text" id="book_author" name="book_author" value="' . esc_attr($author) . '" size="50" /></td></tr>';
    
    echo '<tr><td><label for="book_pages">تعداد صفحات:</label></td>';
    echo '<td><input type="number" id="book_pages" name="book_pages" value="' . esc_attr($pages) . '" /></td></tr>';
    
    echo '<tr><td><label for="book_publication_year">سال انتشار:</label></td>';
    echo '<td><input type="number" id="book_publication_year" name="book_publication_year" value="' . esc_attr($publication_year) . '" /></td></tr>';
    
    echo '<tr><td><label for="book_pdf_file">فایل PDF:</label></td>';
    echo '<td><input type="url" id="book_pdf_file" name="book_pdf_file" value="' . esc_attr($pdf_file) . '" size="50" /></td></tr>';
    
    echo '<tr><td><label for="book_isbn">شابک (ISBN):</label></td>';
    echo '<td><input type="text" id="book_isbn" name="book_isbn" value="' . esc_attr($isbn) . '" /></td></tr>';
    
    echo '<tr><td><label for="book_language">زبان:</label></td>';
    echo '<td><select id="book_language" name="book_language">';
    echo '<option value="fa"' . selected($language, 'fa', false) . '>فارسی</option>';
    echo '<option value="en"' . selected($language, 'en', false) . '>English</option>';
    echo '<option value="ar"' . selected($language, 'ar', false) . '>العربية</option>';
    echo '</select></td></tr>';
    echo '</table>';
}

// Save meta box data
add_action('save_post', 'digiketab_save_meta_box_data');
function digiketab_save_meta_box_data($post_id) {
    if (!isset($_POST['digiketab_meta_box_nonce'])) {
        return;
    }
    
    if (!wp_verify_nonce($_POST['digiketab_meta_box_nonce'], 'digiketab_save_meta_box_data')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    $fields = array('book_author', 'book_pages', 'book_publication_year', 'book_pdf_file', 'book_isbn', 'book_language');
    
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, $field, sanitize_text_field($_POST[$field]));
        }
    }
}

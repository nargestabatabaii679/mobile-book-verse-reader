
<?php
// Admin dashboard template
if (!current_user_can('manage_options')) {
    wp_die('شما مجوز دسترسی به این صفحه را ندارید.');
}

// Get statistics
$total_books = wp_count_posts('digiketab_book')->publish;
$total_categories = wp_count_terms('book_category');
$total_authors = wp_count_terms('book_author');

global $wpdb;
$table_name = $wpdb->prefix . 'digiketab_logs';
$total_reads = $wpdb->get_var("SELECT COUNT(*) FROM $table_name WHERE action = 'read'");
?>

<div class="wrap">
    <h1>📚 داشبورد دیجی‌کتاب</h1>
    
    <!-- Statistics Cards -->
    <div class="digiketab-admin-stats">
        <div class="digiketab-stat-card">
            <div class="digiketab-stat-icon">📚</div>
            <div class="digiketab-stat-info">
                <h3><?php echo number_format($total_books); ?></h3>
                <p>کل کتاب‌ها</p>
            </div>
        </div>
        
        <div class="digiketab-stat-card">
            <div class="digiketab-stat-icon">🏷️</div>
            <div class="digiketab-stat-info">
                <h3><?php echo number_format($total_categories); ?></h3>
                <p>دسته‌بندی‌ها</p>
            </div>
        </div>
        
        <div class="digiketab-stat-card">
            <div class="digiketab-stat-icon">👤</div>
            <div class="digiketab-stat-info">
                <h3><?php echo number_format($total_authors); ?></h3>
                <p>نویسندگان</p>
            </div>
        </div>
        
        <div class="digiketab-stat-card">
            <div class="digiketab-stat-icon">📖</div>
            <div class="digiketab-stat-info">
                <h3><?php echo number_format($total_reads); ?></h3>
                <p>تعداد مطالعه</p>
            </div>
        </div>
    </div>

    <!-- Quick Actions -->
    <div class="digiketab-admin-actions">
        <h2>اقدامات سریع</h2>
        <div class="digiketab-action-buttons">
            <a href="<?php echo admin_url('post-new.php?post_type=digiketab_book'); ?>" class="button button-primary">
                ➕ افزودن کتاب جدید
            </a>
            <a href="<?php echo admin_url('edit.php?post_type=digiketab_book'); ?>" class="button">
                📋 مدیریت کتاب‌ها
            </a>
            <a href="<?php echo admin_url('edit-tags.php?taxonomy=book_category&post_type=digiketab_book'); ?>" class="button">
                🏷️ مدیریت دسته‌بندی‌ها
            </a>
            <a href="<?php echo admin_url('admin.php?page=digiketab-settings'); ?>" class="button">
                ⚙️ تنظیمات
            </a>
        </div>
    </div>

    <!-- Recent Books -->
    <div class="digiketab-admin-recent">
        <h2>آخرین کتاب‌های اضافه شده</h2>
        <?php
        $recent_books = get_posts(array(
            'post_type' => 'digiketab_book',
            'post_status' => 'publish',
            'posts_per_page' => 5,
            'orderby' => 'date',
            'order' => 'DESC'
        ));
        ?>
        
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th>عنوان کتاب</th>
                    <th>نویسنده</th>
                    <th>دسته‌بندی</th>
                    <th>تاریخ انتشار</th>
                    <th>عملیات</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($recent_books as $book): 
                    $author = get_post_meta($book->ID, 'book_author', true);
                    $category_terms = get_the_terms($book->ID, 'book_category');
                    $category = $category_terms ? $category_terms[0]->name : '-';
                ?>
                    <tr>
                        <td>
                            <strong><?php echo esc_html($book->post_title); ?></strong>
                        </td>
                        <td><?php echo esc_html($author ?: '-'); ?></td>
                        <td><?php echo esc_html($category); ?></td>
                        <td><?php echo get_the_date('Y/m/d', $book->ID); ?></td>
                        <td>
                            <a href="<?php echo get_edit_post_link($book->ID); ?>" class="button button-small">ویرایش</a>
                            <a href="<?php echo get_permalink($book->ID); ?>" class="button button-small" target="_blank">مشاهده</a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <!-- Reading Analytics -->
    <div class="digiketab-admin-analytics">
        <h2>آمار مطالعه</h2>
        <div class="digiketab-chart-container">
            <?php
            // Get reading statistics for the last 30 days
            $thirty_days_ago = date('Y-m-d', strtotime('-30 days'));
            $reading_stats = $wpdb->get_results($wpdb->prepare("
                SELECT DATE(timestamp) as date, COUNT(*) as reads 
                FROM $table_name 
                WHERE action = 'read' AND timestamp >= %s 
                GROUP BY DATE(timestamp) 
                ORDER BY date
            ", $thirty_days_ago));
            ?>
            
            <canvas id="reading-chart" width="400" height="200"></canvas>
            
            <script>
            // Simple chart implementation (you can use Chart.js for better charts)
            document.addEventListener('DOMContentLoaded', function() {
                const canvas = document.getElementById('reading-chart');
                const ctx = canvas.getContext('2d');
                
                // Sample data - replace with actual data
                const data = <?php echo json_encode($reading_stats); ?>;
                
                // Draw simple bar chart
                ctx.fillStyle = '#0073aa';
                ctx.fillRect(50, 50, 100, 100);
                ctx.fillText('آمار مطالعه 30 روز گذشته', 50, 30);
            });
            </script>
        </div>
    </div>

    <!-- System Information -->
    <div class="digiketab-admin-info">
        <h2>اطلاعات سیستم</h2>
        <table class="form-table">
            <tr>
                <th>نسخه پلاگین:</th>
                <td><?php echo DIGIKETAB_VERSION; ?></td>
            </tr>
            <tr>
                <th>نسخه وردپرس:</th>
                <td><?php echo get_bloginfo('version'); ?></td>
            </tr>
            <tr>
                <th>نسخه PHP:</th>
                <td><?php echo PHP_VERSION; ?></td>
            </tr>
            <tr>
                <th>پوسته فعال:</th>
                <td><?php echo wp_get_theme()->get('Name'); ?></td>
            </tr>
        </table>
    </div>
</div>

<style>
.digiketab-admin-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

.digiketab-stat-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.digiketab-stat-icon {
    font-size: 3em;
    margin-left: 15px;
}

.digiketab-stat-info h3 {
    margin: 0;
    font-size: 2em;
    color: #0073aa;
}

.digiketab-stat-info p {
    margin: 5px 0 0 0;
    color: #666;
}

.digiketab-admin-actions {
    margin: 30px 0;
}

.digiketab-action-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.digiketab-admin-recent,
.digiketab-admin-analytics,
.digiketab-admin-info {
    margin: 30px 0;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
}

.digiketab-chart-container {
    margin: 20px 0;
    text-align: center;
}
</style>

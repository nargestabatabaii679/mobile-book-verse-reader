
<?php
// Admin settings template
if (!current_user_can('manage_options')) {
    wp_die('شما مجوز دسترسی به این صفحه را ندارید.');
}

// Handle form submission
if (isset($_POST['submit'])) {
    check_admin_referer('digiketab_settings');
    
    $settings = array(
        'books_per_page' => intval($_POST['books_per_page']),
        'default_view' => sanitize_text_field($_POST['default_view']),
        'enable_download' => isset($_POST['enable_download']),
        'enable_sharing' => isset($_POST['enable_sharing']),
        'library_title' => sanitize_text_field($_POST['library_title']),
        'library_description' => sanitize_textarea_field($_POST['library_description']),
        'default_language' => sanitize_text_field($_POST['default_language']),
        'enable_comments' => isset($_POST['enable_comments']),
        'enable_ratings' => isset($_POST['enable_ratings'])
    );
    
    update_option('digiketab_settings', $settings);
    echo '<div class="notice notice-success"><p>تنظیمات با موفقیت ذخیره شد!</p></div>';
}

// Get current settings
$settings = get_option('digiketab_settings', array(
    'books_per_page' => 12,
    'default_view' => 'grid',
    'enable_download' => true,
    'enable_sharing' => true,
    'library_title' => 'کتابخانه دیجیتال',
    'library_description' => 'مجموعه‌ای از بهترین کتاب‌ها برای مطالعه آنلاین',
    'default_language' => 'fa',
    'enable_comments' => false,
    'enable_ratings' => false
));
?>

<div class="wrap">
    <h1>⚙️ تنظیمات دیجی‌کتاب</h1>
    
    <form method="post" action="">
        <?php wp_nonce_field('digiketab_settings'); ?>
        
        <table class="form-table">
            <tr>
                <th scope="row">
                    <label for="library_title">عنوان کتابخانه</label>
                </th>
                <td>
                    <input type="text" id="library_title" name="library_title" value="<?php echo esc_attr($settings['library_title']); ?>" class="regular-text" />
                    <p class="description">عنوانی که در بالای کتابخانه نمایش داده می‌شود</p>
                </td>
            </tr>
            
            <tr>
                <th scope="row">
                    <label for="library_description">توضیحات کتابخانه</label>
                </th>
                <td>
                    <textarea id="library_description" name="library_description" rows="3" cols="50"><?php echo esc_textarea($settings['library_description']); ?></textarea>
                    <p class="description">توضیح کوتاهی در مورد کتابخانه</p>
                </td>
            </tr>
            
            <tr>
                <th scope="row">
                    <label for="books_per_page">تعداد کتاب در هر صفحه</label>
                </th>
                <td>
                    <input type="number" id="books_per_page" name="books_per_page" value="<?php echo esc_attr($settings['books_per_page']); ?>" min="1" max="50" />
                    <p class="description">تعداد کتاب‌هایی که در هر صفحه نمایش داده می‌شود</p>
                </td>
            </tr>
            
            <tr>
                <th scope="row">
                    <label for="default_view">نمای پیش‌فرض</label>
                </th>
                <td>
                    <select id="default_view" name="default_view">
                        <option value="grid" <?php selected($settings['default_view'], 'grid'); ?>>شبکه‌ای</option>
                        <option value="shelf" <?php selected($settings['default_view'], 'shelf'); ?>>قفسه‌ای</option>
                    </select>
                    <p class="description">نحوه نمایش پیش‌فرض کتاب‌ها</p>
                </td>
            </tr>
            
            <tr>
                <th scope="row">
                    <label for="default_language">زبان پیش‌فرض</label>
                </th>
                <td>
                    <select id="default_language" name="default_language">
                        <option value="fa" <?php selected($settings['default_language'], 'fa'); ?>>فارسی</option>
                        <option value="en" <?php selected($settings['default_language'], 'en'); ?>>English</option>
                        <option value="ar" <?php selected($settings['default_language'], 'ar'); ?>>العربية</option>
                    </select>
                </td>
            </tr>
            
            <tr>
                <th scope="row">ویژگی‌های کتابخانه</th>
                <td>
                    <fieldset>
                        <label>
                            <input type="checkbox" name="enable_download" value="1" <?php checked($settings['enable_download']); ?> />
                            فعال‌سازی دانلود کتاب‌ها
                        </label><br />
                        
                        <label>
                            <input type="checkbox" name="enable_sharing" value="1" <?php checked($settings['enable_sharing']); ?> />
                            فعال‌سازی اشتراک‌گذاری کتاب‌ها
                        </label><br />
                        
                        <label>
                            <input type="checkbox" name="enable_comments" value="1" <?php checked($settings['enable_comments']); ?> />
                            فعال‌سازی نظرات برای کتاب‌ها
                        </label><br />
                        
                        <label>
                            <input type="checkbox" name="enable_ratings" value="1" <?php checked($settings['enable_ratings']); ?> />
                            فعال‌سازی امتیازدهی کتاب‌ها
                        </label>
                    </fieldset>
                </td>
            </tr>
        </table>
        
        <h2>تنظیمات نمایش</h2>
        <table class="form-table">
            <tr>
                <th scope="row">رنگ‌بندی کتابخانه</th>
                <td>
                    <p>می‌توانید استایل کتابخانه را از طریق فایل CSS سفارشی تغییر دهید.</p>
                    <code>assets/css/digiketab.css</code>
                </td>
            </tr>
        </table>
        
        <h2>تنظیمات پیشرفته</h2>
        <table class="form-table">
            <tr>
                <th scope="row">کد کوتاه کتابخانه</th>
                <td>
                    <code>[digiketab_library]</code>
                    <p class="description">این کد را در هر صفحه یا پست برای نمایش کتابخانه استفاده کنید</p>
                    
                    <h4>پارامترهای اختیاری:</h4>
                    <ul>
                        <li><code>[digiketab_library category="ادبیات"]</code> - نمایش کتاب‌های یک دسته خاص</li>
                        <li><code>[digiketab_library limit="8"]</code> - محدود کردن تعداد کتاب‌ها</li>
                        <li><code>[digiketab_library view="shelf"]</code> - نمای قفسه‌ای</li>
                    </ul>
                </td>
            </tr>
            
            <tr>
                <th scope="row">کد کوتاه خواننده</th>
                <td>
                    <code>[digiketab_reader book_id="123"]</code>
                    <p class="description">برای نمایش خواننده یک کتاب خاص</p>
                </td>
            </tr>
        </table>
        
        <h2>پشتیبان‌گیری و بازیابی</h2>
        <table class="form-table">
            <tr>
                <th scope="row">صدور داده‌ها</th>
                <td>
                    <button type="button" class="button" id="export-books">📤 صدور کتاب‌ها (JSON)</button>
                    <p class="description">تمام کتاب‌ها و تنظیمات را به صورت فایل JSON دانلود کنید</p>
                </td>
            </tr>
            
            <tr>
                <th scope="row">وارد کردن داده‌ها</th>
                <td>
                    <input type="file" id="import-books" accept=".json" />
                    <button type="button" class="button" id="import-books-btn">📥 وارد کردن کتاب‌ها</button>
                    <p class="description">فایل JSON کتاب‌ها را وارد کنید</p>
                </td>
            </tr>
        </table>
        
        <?php submit_button('ذخیره تنظیمات'); ?>
    </form>
</div>

<script>
jQuery(document).ready(function($) {
    // Export books
    $('#export-books').click(function() {
        window.location.href = ajaxurl + '?action=digiketab_export_books&nonce=' + '<?php echo wp_create_nonce("digiketab_export"); ?>';
    });
    
    // Import books
    $('#import-books-btn').click(function() {
        const fileInput = $('#import-books')[0];
        if (fileInput.files.length === 0) {
            alert('لطفاً یک فایل انتخاب کنید');
            return;
        }
        
        const formData = new FormData();
        formData.append('action', 'digiketab_import_books');
        formData.append('file', fileInput.files[0]);
        formData.append('nonce', '<?php echo wp_create_nonce("digiketab_import"); ?>');
        
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                if (response.success) {
                    alert('کتاب‌ها با موفقیت وارد شدند!');
                    location.reload();
                } else {
                    alert('خطا در وارد کردن فایل: ' + response.data);
                }
            }
        });
    });
});
</script>

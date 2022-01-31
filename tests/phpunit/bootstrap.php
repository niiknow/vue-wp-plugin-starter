<?php
/**
 * The following snippets uses `PLUGIN` to prefix
 * the constants and class names. You should replace
 * it with something that matches your plugin name.
 */
// define test environment
define('PLUGIN_PHPUNIT', true);

// define fake ABSPATH
if (!defined('ABSPATH')) {
    define('ABSPATH', sys_get_temp_dir());
}

// define fake PLUGIN_ABSPATH
if (!defined('PLUGIN_ABSPATH')) {
    define('PLUGIN_ABSPATH', sys_get_temp_dir() . '/wp-content/plugins/my-plugin/');
}

require_once __DIR__ . '/../../vendor/autoload.php';

/**
 * WP_REST_Controller class.
 */
if (!class_exists('WP_REST_Controller')) {
    require_once __DIR__ . '/inc/class-wp-rest-controller.php';
}

// Include the class for PluginTestCase
require_once __DIR__ . '/inc/PluginTestCase.php';

// Since our plugin files are loaded with composer, we should be good to go
// https://swas.io/blog/wordpress-plugin-unit-test-with-brainmonkey/

if (!function_exists('__')) {
    function __($a, $b)
    {
        return $a;
    }
}

if (!function_exists('esc_html')) {
    function esc_html($a)
    {
        return $a;
    }
}

if (!function_exists('get_post_types')) {
    function get_post_types($a, $b)
    {
        if ($b === 'names') {
            return ['post', 'page'];
        }
    }
}

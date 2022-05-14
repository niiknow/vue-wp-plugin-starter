<?php
/**
 * The following snippets uses `PLUGIN` to prefix
 * the constants and class names. You should replace
 * it with something that matches your plugin name.
 */
// define test environment
define('PLUGIN_PHPUNIT', true);

// define fake ABSPATH
if (! defined('ABSPATH')) {
    define('ABSPATH', sys_get_temp_dir());
}

// define fake PLUGIN_ABSPATH
if (! defined('PLUGIN_ABSPATH')) {
    define('PLUGIN_ABSPATH', sys_get_temp_dir().'/wp-content/plugins/my-plugin/');
}

require_once __DIR__.'/../vendor/autoload.php';

/*
 * WP_REST_Controller class.
 */
if (! class_exists('WP_REST_Controller')) {
    require_once __DIR__.'/class-wp-rest-controller.php';
}

// Include the class for PluginTestCase
require_once __DIR__.'/phpunit/PluginTestCase.php';

// Since our plugin files are loaded with composer, we should be good to go
// https://swas.io/blog/wordpress-plugin-unit-test-with-brainmonkey/

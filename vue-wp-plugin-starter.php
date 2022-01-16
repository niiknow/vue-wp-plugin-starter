<?php
/*
Plugin Name: PLUGIN_NAME
Description: PLUGIN_NAME
Version: 1.0.0
Author: noogen
Text Domain: baseapp
Domain Path: /languages
License: GPL3
License URI: https://www.gnu.org/licenses/gpl-3.0.html
*/

// don't call the file directly
if (! defined( 'ABSPATH' )) exit;

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| this application. We just need to utilize it! We'll simply require it
| into the script here so we don't need to manually load our classes.
|
*/

require __DIR__ . '/vendor/autoload.php';

// instantiate and run the plugin
\Baseapp\Main::get_instance( __FILE__ )->run();

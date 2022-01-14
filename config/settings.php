<?php
// don't call the file directly
if (! defined( 'ABSPATH' )) exit;

return array(
    'enable_debug_messages' => array(
        'name' => __( 'Enable Debug Messages', \Baseapp\Main::PREFIX ),
		'description' => __( 'When enabled the plugin will output debug messages in the JavaScript console.', \Baseapp\Main::PREFIX ),
		'type' => 'toggle',
		'code' => 'css',
		'default' => false
	),
	'cleanup_db_on_plugin_uninstall' => array(
		'name' => __( 'Cleanup database upon plugin uninstall.', \Baseapp\Main::PREFIX ),
		'description' => __( 'When enabled the plugin will remove any database data upon plugin uninstall.', \Baseapp\Main::PREFIX ),
		'type' => 'toggle',
		'code' => 'css',
		'default' => false
	)
);

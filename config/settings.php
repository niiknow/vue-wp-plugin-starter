<?php

return array(
	'enable_debug_messages' => [
		'name' => __( 'Enable Debug Messages', \Baseapp\Main::PREFIX ),
		'description' => __( 'When enabled the plugin will output debug messages in the JavaScript console.', \Baseapp\Main::PREFIX ),
		'type' => 'toggle',
		'code' => 'css',
		'default' => false
	],
	'cleanup_db_on_plugin_deactivation' => [
		'name' => __( 'Cleanup database upon plugin deactivation.', \Baseapp\Main::PREFIX ),
		'description' => __( 'When enabled the plugin will remove any database data upon plugin deactivation.', \Baseapp\Main::PREFIX ),
		'type' => 'toggle',
		'code' => 'css',
		'default' => false
	]
);

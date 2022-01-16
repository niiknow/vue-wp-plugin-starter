<?php
// don't call the file directly
if (! defined( 'ABSPATH' )) exit;

// this allow for using wordpress server-side translation
return array(
	'sections' => array(
		'general' => __('General', \Baseapp\Main::PREFIX),
		'advanced' => __('Advanced', \Baseapp\Main::PREFIX),
		'debugging' => __('Debugging', \Baseapp\Main::PREFIX)
	),
	'options' => array(
	    'enable_debug_messages' => array(
	        'name' => __('Enable Debug Messages', \Baseapp\Main::PREFIX),
			'description' => __('When enabled the plugin will output debug messages in the JavaScript console.', \Baseapp\Main::PREFIX),
			'section' => 'debugging',
			'type' => 'toggle',
			'code' => 'css',
			'default' => false
		),
		'cleanup_db_on_plugin_uninstall' => array(
			'name' => __('Cleanup database upon plugin uninstall', \Baseapp\Main::PREFIX ),
			'description' => __('When enabled the plugin will remove any database data upon plugin uninstall.', \Baseapp\Main::PREFIX),
			'section' => 'advanced',
			'type' => 'toggle',
			'code' => 'css',
			'default' => false
		),
		'include_post_types' => array(
			'name' => __('Post Types', \Baseapp\Main::PREFIX),
			'description' => __('Which post types do you want to index?', \Baseapp\Main::PREFIX),
			'section' => 'general',
			'type' => 'dropdownMultiselect',
			'optionsCallback' => function() { return get_post_types( '', 'names' ); },
			'default' => array('post', 'page'),
		)
	)
);

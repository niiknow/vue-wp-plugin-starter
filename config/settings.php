<?php
// don't call the file directly
if (!defined('ABSPATH')) {
    exit;
}

// this allow for using wordpress server-side translation
return array(
    'sections' => array(
        'general'   => __('General', \Baseapp\Main::PREFIX),
        'advanced'  => __('Advanced', \Baseapp\Main::PREFIX),
        'debugging' => __('Debugging', \Baseapp\Main::PREFIX),
    ),
    'options'  => array(
        'input'                          => array(
            'name'        => __('Input', \Baseapp\Main::PREFIX),
            'description' => __('Simple text input', \Baseapp\Main::PREFIX),
            'section'     => 'general',
            'type'        => 'text',
            'default'     => '',
        ),
        'email'                          => array(
            'name'        => __('Email', \Baseapp\Main::PREFIX),
            'description' => __('Email type input', \Baseapp\Main::PREFIX),
            'section'     => 'general',
            'type'        => 'email',
            'default'     => '',
        ),
        'url'                            => array(
            'name'        => __('URL', \Baseapp\Main::PREFIX),
            'description' => __('URL input', \Baseapp\Main::PREFIX),
            'section'     => 'general',
            'type'        => 'url',
            'default'     => '',
        ),
        'color'                          => array(
            'name'        => __('Color', \Baseapp\Main::PREFIX),
            'description' => __('Color picker', \Baseapp\Main::PREFIX),
            'section'     => 'general',
            'type'        => 'color',
            'default'     => '',
        ),
        'textarea'                       => array(
            'name'        => __('Textarea', \Baseapp\Main::PREFIX),
            'description' => __('Simple textarea', \Baseapp\Main::PREFIX),
            'section'     => 'general',
            'type'        => 'textarea',
            'default'     => '',
        ),
        'dropdown'                       => array(
            'name'        => __('Select one', \Baseapp\Main::PREFIX),
            'description' => __('Single select dropdown', \Baseapp\Main::PREFIX),
            'section'     => 'general',
            'type'        => 'dropdown',
            'default'     => 'option1',
            'options'     => ['option1', 'option2', 'option3'],
        ),
        'additional_css'                 => array(
            'name'        => __('Additional CSS', \Baseapp\Main::PREFIX),
            'description' => __('Add additional CSS to page', \Baseapp\Main::PREFIX),
            'section'     => 'advanced',
            'type'        => 'code',
            'default'     => '',
        ),
        'enable_debug_messages'          => array(
            'name'        => __('Enable Debug Messages', \Baseapp\Main::PREFIX),
            'description' => __('When enabled the plugin will output debug messages in the JavaScript console.', \Baseapp\Main::PREFIX),
            'section'     => 'debugging',
            'type'        => 'toggle',
            'default'     => false,
        ),
        'cleanup_db_on_plugin_uninstall' => array(
            'name'        => __('Cleanup database upon plugin uninstall', \Baseapp\Main::PREFIX),
            'description' => __('When enabled the plugin will remove any database data upon plugin uninstall.', \Baseapp\Main::PREFIX),
            'section'     => 'advanced',
            'type'        => 'toggle',
            'default'     => false,
        ),
        'include_post_types'             => array(
            'name'            => __('Post Types', \Baseapp\Main::PREFIX),
            'description'     => __('Demo multi-select dropdown', \Baseapp\Main::PREFIX),
            'section'         => 'general',
            'type'            => 'dropdownMultiselect',
            'optionsCallback' => function () {return get_post_types('', 'names');},
            'default'         => array('post', 'page'),
        ),
    ),
);

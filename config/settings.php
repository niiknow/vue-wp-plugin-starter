<?php

// don't call the file directly
if (! defined('ABSPATH')) {
    exit;
}

// this allow for using wordpress server-side translation
return [
    'sections' => [
        'general'   => __('General', \PluginSpace\Main::PREFIX),
        'advanced'  => __('Advanced', \PluginSpace\Main::PREFIX),
        'debugging' => __('Debugging', \PluginSpace\Main::PREFIX),
    ],
    'options'  => [
        'input'                          => [
            'name'        => __('Input', \PluginSpace\Main::PREFIX),
            'description' => __('Simple text input', \PluginSpace\Main::PREFIX),
            'section'     => 'general',
            'type'        => 'text',
            'default'     => '',
        ],
        'email'                          => [
            'name'        => __('Email', \PluginSpace\Main::PREFIX),
            'description' => __('Email type input', \PluginSpace\Main::PREFIX),
            'section'     => 'general',
            'type'        => 'email',
            'default'     => '',
        ],
        'url'                            => [
            'name'        => __('URL', \PluginSpace\Main::PREFIX),
            'description' => __('URL input', \PluginSpace\Main::PREFIX),
            'section'     => 'general',
            'type'        => 'url',
            'default'     => '',
        ],
        'color'                          => [
            'name'        => __('Color', \PluginSpace\Main::PREFIX),
            'description' => __('Color picker', \PluginSpace\Main::PREFIX),
            'section'     => 'general',
            'type'        => 'color',
            'default'     => '#000', // empty text means #000 by default anyway so might as well set it
        ],
        'textarea'                       => [
            'name'        => __('Textarea', \PluginSpace\Main::PREFIX),
            'description' => __('Simple textarea', \PluginSpace\Main::PREFIX),
            'section'     => 'general',
            'type'        => 'textarea',
            'default'     => '',
        ],
        'dropdown'                       => [
            'name'        => __('Select one', \PluginSpace\Main::PREFIX),
            'description' => __('Single select dropdown', \PluginSpace\Main::PREFIX),
            'section'     => 'general',
            'type'        => 'dropdown',
            'default'     => 'option1',
            'options'     => ['option1', 'option2', 'option3'],
        ],
        'additional_css'                 => [
            'name'        => __('Additional CSS', \PluginSpace\Main::PREFIX),
            'description' => __('Add additional CSS to page', \PluginSpace\Main::PREFIX),
            'section'     => 'advanced',
            'type'        => 'code',
            'default'     => '',
        ],
        'enable_debug_messages'          => [
            'name'        => __('Enable Debug Messages', \PluginSpace\Main::PREFIX),
            'description' => __('When enabled the plugin will output debug messages in the JavaScript console.', \PluginSpace\Main::PREFIX),
            'section'     => 'debugging',
            'type'        => 'toggle',
            'default'     => false,
        ],
        'cleanup_db_on_plugin_uninstall' => [
            'name'        => __('Cleanup database upon plugin uninstall', \PluginSpace\Main::PREFIX),
            'description' => __('When enabled the plugin will remove any database data upon plugin uninstall.', \PluginSpace\Main::PREFIX),
            'section'     => 'advanced',
            'type'        => 'toggle',
            'default'     => false,
        ],
        'include_post_types'             => [
            'name'            => __('Post Types', \PluginSpace\Main::PREFIX),
            'description'     => __('Demo multi-select dropdown', \PluginSpace\Main::PREFIX),
            'section'         => 'general',
            'type'            => 'dropdownMultiselect',
            'optionsCallback' => function () {
                return get_post_types('', 'names');
            },
            'default'         => ['post', 'page'],
        ],
    ],
];

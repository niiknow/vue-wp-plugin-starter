<?php
namespace Baseapp;

/**
 * Scripts and styles helper
 */
class Assets
{
	/**
	 * Initialize this class
	 */
    function __construct()
    {
        if (is_admin()) {
            add_action('admin_enqueue_scripts', [ $this, 'register' ], 5);
        } else {
            add_action('wp_enqueue_scripts', [ $this, 'register' ], 5);
        }
    }

    /**
     * Register our app scripts and styles
     *
     * @return void
     */
    public function register()
    {
        $this->register_scripts($this->get_scripts());
        $this->register_styles($this->get_styles());
    }

    /**
     * Register scripts
     *
     * @param  array $scripts
     *
     * @return void
     */
    private function register_scripts($scripts)
    {
        foreach ($scripts as $handle => $script) {
            $deps      = isset($script['deps']) ? $script['deps'] : false;
            $in_footer = isset($script['in_footer']) ? $script['in_footer'] : false;
            $version   = isset($script['version']) ? $script['version'] : \Baseapp\Main::VERSION;

            wp_register_script($handle, $script['src'], $deps, $version, $in_footer);
        }
    }

    /**
     * Register styles
     *
     * @param  array $styles
     *
     * @return void
     */
    public function register_styles($styles)
    {
        foreach ($styles as $handle => $style) {
            $deps = isset($style['deps']) ? $style['deps'] : false;

            wp_register_style($handle, $style['src'], $deps, \Baseapp\Main::VERSION);
        }
    }

    /**
     * Get all registered scripts
     *
     * @return array
     */
    public function get_scripts()
    {
    	$assets_url = \Baseapp\Main::$BASEURL . '/public';
        $prefix     = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '.min' : '';

        $scripts = [
            'vuejs' => [
                'src'       => 'https://cdn.jsdelivr.net/npm/vue@3.1.4/dist/vue.global.prod.js',
                'version'   => '3.1.4',
                'in_footer' => true
            ],
            \Baseapp\Main::PREFIX . '-manifest' => [
                'src'       => $assets_url . '/js/manifest.js',
                'version'   => filemtime($assets_url . '/js/manifest.js'),
                'in_footer' => true
            ],
            \Baseapp\Main::PREFIX . '-vendor' => [
                'src'       => $assets_url . '/js/vendors.js',
                'deps'      => [ 'jquery', 'vuejs', \Baseapp\Main::PREFIX . '-manifest' ],
                'version'   => filemtime($assets_url . '/js/vendors.js'),
                'in_footer' => true
            ],
            \Baseapp\Main::PREFIX . '-frontend' => [
                'src'       => $assets_url . '/js/frontend.js',
                'deps'      => [ \Baseapp\Main::PREFIX . '-vendor' ],
                'version'   => filemtime($assets_url . '/js/frontend.js'),
                'in_footer' => true
            ],
            \Baseapp\Main::PREFIX . '-admin' => [
                'src'       => $assets_url . '/js/admin.js',
                'deps'      => [ \Baseapp\Main::PREFIX . '-vendor' ],
                'version'   => filemtime($assets_url . '/js/admin.js'),
                'in_footer' => true
            ]
        ];

        return $scripts;
    }

    /**
     * Get registered styles
     *
     * @return array
     */
    public function get_styles()
    {
        $assets_url = \Baseapp\Main::$BASEURL . '/public';

        $styles = [
            \Baseapp\Main::PREFIX . '-frontend' => [
                'src' =>  $assets_url . '/css/frontend.css'
            ],
            \Baseapp\Main::PREFIX . '-admin' => [
                'src' =>  $assets_url . '/css/admin.css'
            ],
        ];

        return $styles;
    }
}

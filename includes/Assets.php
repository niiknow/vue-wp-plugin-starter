<?php
namespace Baseapp;

/**
 * Scripts and Styles Class
 */
class Assets
{
	/**
	 * Initialize Assets class
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
        $prefix   = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '.min' : '';
        $assetUrl = plugins_url( '', \Baseapp\Main::$PLUGINFILE ) . '/public';

        $scripts = [
            'vuejs' => [
                'src'       => 'https://unpkg.com/vue@3.1.4/dist/vue.global.js',
                'version'   => '3.1.4',
                'in_footer' => true
            ],
            \Baseapp\Main::PREFIX . '-vendor' => [
                'src'       => $assetUrl . '/js/vendors.js',
                'version'   => filemtime($assetUrl . '/js/vendors.js'),
                'in_footer' => true
            ],
            \Baseapp\Main::PREFIX . '-frontend' => [
                'src'       => $assetUrl . '/js/frontend.js',
                'deps'      => [ 'jquery', 'vuejs', \Baseapp\Main::PREFIX . '-vendor'],
                'version'   => filemtime($assetUrl . '/js/frontend.js'),
                'in_footer' => true
            ],
            \Baseapp\Main::PREFIX . '-admin' => [
                'src'       => $assetUrl . '/js/admin.js',
                'deps'      => [ 'jquery', 'vuejs', \Baseapp\Main::PREFIX . '-vendor' ],
                'version'   => filemtime($assetUrl . '/js/admin.js'),
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
        $assetUrl = plugins_url( '', \Baseapp\Main::$PLUGINFILE ) . '/public';

        $styles = [
            \Baseapp\Main::PREFIX . '-frontend' => [
                'src' =>  $assetUrl . '/css/frontend.css'
            ],
            \Baseapp\Main::PREFIX . '-admin' => [
                'src' =>  $assetUrl . '/css/admin.css'
            ],
        ];

        return $styles;
    }
}

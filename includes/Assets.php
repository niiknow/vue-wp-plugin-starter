<?php
namespace Baseapp;

/**
 * Scripts and styles helper.
 *
 */
class Assets
{
	/**
	 * The application domain
	 *
	 * @var string
	 */
	private $prefix;

	/**
	 * Initialize this class.
	 *
	 * @param string $prefix
	 */
    function __construct($prefix)
    {
    	$this->prefix = $prefix;

        add_action( is_admin() ? 'admin_enqueue_scripts' : 'wp_enqueue_scripts', [ $this, 'register' ] );
    }

    /**
     * Register our app scripts and styles.
     *
     * @return void
     */
    public function register()
    {
        $this->register_scripts($this->get_scripts());
        $this->register_styles($this->get_styles());
    }

    /**
     * Register scripts.
     *
     * @param  array $scripts
     *
     * @return void
     */
    private function register_scripts( $scripts )
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
        foreach ($styles as $handle => $style)
        {
            $deps = isset( $style['deps'] ) ? $style['deps'] : false;

            wp_register_style( $handle, $style['src'], $deps, \Baseapp\Main::VERSION );
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
    	$plugin_dir = \Baseapp\Main::$PLUGINDIR .  '/public';
        $prefix     = ''; // defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '.min' : '';

        $scripts = [
            'vuejs' => [
                'src'       => 'https://cdn.jsdelivr.net/npm/vue@3.2.11/dist/vue.global.prod.js',
                'version'   => '3.2.11',
                'in_footer' => true
            ],
            'bootstrap' => [
                'src'       => 'https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.min.js',
                'version'   => 'latest',
                'in_footer' => true
            ],
            $this->prefix . '-manifest' => [
                'src'       => $assets_url . '/js/manifest.js',
                'version'   => filemtime($plugin_dir . '/js/manifest.js'),
                'in_footer' => true
            ],
            $this->prefix . '-vendor' => [
                'src'       => $assets_url . '/js/vendor.js',
                'deps'      => [ 'vuejs', $this->prefix . '-manifest' ],
                'version'   => filemtime($plugin_dir . '/js/vendor.js'),
                'in_footer' => true
            ],
            $this->prefix . '-frontend' => [
                'src'       => $assets_url . '/js/frontend.js',
                'deps'      => [ $this->prefix . '-vendor' ],
                'version'   => filemtime($plugin_dir . '/js/frontend.js'),
                'in_footer' => true
            ],
            $this->prefix . '-admin' => [
                'src'       => $assets_url . '/js/admin.js',
                'deps'      => [ 'bootstrap', $this->prefix . '-vendor' ],
                'version'   => filemtime($plugin_dir . '/js/admin.js'),
                'in_footer' => true
            ]
        ];

        return $scripts;
    }

    /**
     * Get registered styles.
     *
     * @return array
     */
    public function get_styles()
    {
        $assets_url = \Baseapp\Main::$BASEURL . '/public';

        $styles = [
            $this->prefix . '-bootstrap' => [
                'src' =>  'https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css'
            ],
            $this->prefix . '-frontend' => [
                'src' =>  $assets_url . '/css/frontend.css'
            ],
            $this->prefix . '-admin' => [
                'src' =>  $assets_url . '/css/admin.css'
            ],
        ];

        return $styles;
    }
}

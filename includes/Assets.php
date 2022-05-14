<?php

namespace PluginSpace;

/**
 * Scripts and styles helper.
 */
class Assets
{
    /**
     * The application domain.
     *
     * @var string
     */
    private $prefix;

    /**
     * Initialize this class.
     *
     * @param string $prefix
     */
    public function __construct($prefix)
    {
        $this->prefix = $prefix;
        add_action(is_admin() ? 'admin_enqueue_scripts' : 'wp_enqueue_scripts', [$this, 'register']);
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
    private function register_scripts($scripts)
    {
        foreach ($scripts as $handle => $script) {
            $deps = isset($script['deps']) ? $script['deps'] : false;
            $in_footer = isset($script['in_footer']) ? $script['in_footer'] : false;

            wp_register_script($handle, $script['src'], $deps, null, $in_footer);
        }
    }

    /**
     * Register styles.
     *
     * @param  array $styles
     *
     * @return void
     */
    public function register_styles($styles)
    {
        foreach ($styles as $handle => $style) {
            $deps = isset($style['deps']) ? $style['deps'] : false;

            wp_register_style($handle, $style['src'], $deps, null);
        }
    }

    /**
     * Get all registered scripts.
     *
     * @return array
     */
    public function get_scripts()
    {
        $assets_url = \PluginSpace\Main::$BASEURL.'/public';
        $plugin_dir = \PluginSpace\Main::$PLUGINDIR.'/public';
        $prefix = ''; // defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '.min' : '';

        $scripts = [
            'vuejs'                      => [
                'src'       => 'https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.global.prod.js',
                'in_footer' => true,
            ],
            'bootstrap'                  => [
                'src'       => 'https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.min.js',
                'in_footer' => true,
            ],
            $this->prefix.'-manifest'  => [
                'src'       => $assets_url.$this->mix('/js/manifest.js'),
                'in_footer' => true,
            ],
            $this->prefix.'-vendor'    => [
                'src'       => $assets_url.$this->mix('/js/vendor.js'),
                'deps'      => ['vuejs', $this->prefix.'-manifest'],
                'in_footer' => true,
            ],
            $this->prefix.'-frontend'  => [
                'src'       => $assets_url.$this->mix('/js/frontend.js'),
                'deps'      => ['bootstrap', $this->prefix.'-vendor'],
                'in_footer' => true,
            ],
            $this->prefix.'-frontview' => [
                'src'       => $assets_url.$this->mix('/js/frontview.js'),
                'deps'      => ['bootstrap', $this->prefix.'-vendor'],
                'in_footer' => true,
            ],
            $this->prefix.'-admin'     => [
                'src'       => $assets_url.$this->mix('/js/admin.js'),
                'deps'      => [$this->prefix.'-vendor'],
                'in_footer' => true,
            ],
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
        $assets_url = \PluginSpace\Main::$BASEURL.'/public';

        $styles = [
            $this->prefix.'-bootstrap' => [
                'src' => 'https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css',
            ],
            $this->prefix.'-frontend'  => [
                'src' => $assets_url.$this->mix('/css/frontend.css'),
            ],
            $this->prefix.'-frontview' => [
                'src' => $assets_url.$this->mix('/css/frontview.css'),
            ],
            $this->prefix.'-admin'     => [
                'src' => $assets_url.$this->mix('/css/admin.css'),
            ],
        ];

        return $styles;
    }

    /**
     * Get the path to a versioned Mix file.
     *
     * @param  string  $path
     * @param  string  $manifestDirectory
     * @return string
     */
    public function mix($path, $manifestDirectory = '')
    {
        static $manifests = [];

        if (empty($manifestDirectory)) {
            $manifestDirectory = \PluginSpace\Main::$PLUGINDIR.'/public';
        }

        $manifestPath = $manifestDirectory.'/mix-manifest.json';

        if (! isset($manifests[$manifestPath])) {
            if (! is_file($manifestPath)) {
                throw new \Exception('The Mix manifest does not exist in: '.$manifestPath);
            }

            $manifests[$manifestPath] = json_decode(file_get_contents($manifestPath), true);
        }

        $manifest = $manifests[$manifestPath];

        if (! isset($manifest[$path])) {
            throw new \Exception("Unable to locate Mix file: {$path}.");
        }

        return $manifest[$path];
    }
}

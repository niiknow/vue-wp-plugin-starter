<?php

namespace PluginSpace;

/**
 * Main class.
 *
 * @class Main The class that holds initialize this plugin
 */
final class Main
{
    /**
     * A unique plugin prefix/token to use throughout your plugin.
     * This is also your application domain.
     *
     * @var string
     */
    public const PREFIX = 'PluginPrefix';

    /**
     * Holds various class instances.
     *
     * @var array
     * @since   1.0.0
     */
    private $container = [];

    /**
     * The single instance of Main.
     *
     * @var     object
     * @since   1.0.0
     */
    private static $_instance = null; //phpcs:ignore

    /**
     * The version number.
     *
     * @var     string
     * @since   1.0.0
     */
    public $VERSION;

    /**
     * The plugin filename.
     *
     * @var string
     */
    public static $PLUGINFILE = '';

    /**
     * The base url, default '.'.
     *
     * @var string
     */
    public static $BASEURL = '.';

    /**
     * The plugin dir, default to empty string.
     * @var string
     */
    public static $PLUGINDIR = '';

    /**
     * Constructor for the Main class.
     *
     * Sets up all the appropriate hooks and actions
     * within our plugin.
     *
     * @param string $filepath the plugin file path
     * @param string $version Plugin version.
     */
    private function __construct($filepath, $version = '1.0.0')
    {
        self::$PLUGINFILE = $filepath;
        self::$PLUGINDIR = dirname($filepath);
        $this->VERSION = $version;
    }

    /**
     * Get a singleton instance of this plugin.
     *
     * Usage: Main::get_instance()
     *
     * @param string $filepath the plugin file path
     * @param string $version Plugin version.
     *
     * @return Main the singleton instance
     */
    public static function get_instance($filepath, $version = '1.0.0')
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new self($filepath, $version);
        }

        return self::$_instance;
    }

    /**
     * Do stuff during plugin uninstall.
     */
    public static function uninstall_plugin()
    {
        flush_rewrite_rules();

        $setting_key = self::PREFIX.'_settings';
        $settings = get_option($setting_key, []);
        (new \PluginSpace\Migrations())->cleanUp(self::PREFIX, $settings);
    }

    /**
     * Activate and initialize the plugin.
     */
    public function run()
    {
        // set base url from plugin file name
        self::$BASEURL = plugins_url('', self::$PLUGINFILE);

        register_activation_hook(self::$PLUGINFILE, [$this, 'activate_plugin']);
        register_deactivation_hook(self::$PLUGINFILE, [$this, 'deactivate_plugin']);
        register_uninstall_hook(self::$PLUGINFILE, [__CLASS__, 'uninstall_plugin']);

        add_action('plugins_loaded', [$this, 'plugins_loaded']);

        // setup cli
        if (defined('WP_CLI') && \WP_CLI) {
            $this->container['cli'] = new \PluginSpace\CliLoader(self::PREFIX);
        }

        // this is to register an action link from the Plugin manager page to our settings page
        $plugin = plugin_basename(self::$PLUGINFILE);
        add_filter("plugin_action_links_$plugin", [$this, 'register_settings_link']);

        // Additional thing you can do: register post type, taxonomy, etc...
        return $this;
    }

    /**
     * Magic getter to bypass referencing plugin.
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __get($prop)
    {
        if (array_key_exists($prop, $this->container)) {
            return $this->container[$prop];
        }

        return $this->{$prop};
    }

    /**
     * Magic isset to bypass referencing plugin.
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __isset($prop)
    {
        return isset($this->{$prop}) || isset($this->container[$prop]);
    }

    /**
     * Register hooks after all plugins are loaded.
     *
     * @return void
     */
    public function plugins_loaded()
    {
        add_action('init', [$this, 'init_hook_handler']);
    }

    /**
     * Plugin activation function.
     */
    public function activate_plugin()
    {
        (new \PluginSpace\Migrations())->run(self::PREFIX, $this->VERSION);

        // set the current version to activate plugin
        update_option(self::PREFIX.'_version', $this->VERSION);
    }

    /**
     * Do stuff during plugin deactivation.
     */
    public function deactivate_plugin()
    {
        flush_rewrite_rules();

        // do stuff such as: shut off cron tasks, etc...

        // remove version number to deactivate plugin
        delete_option(self::PREFIX.'_version');
    }

    /**
     * Register settings link that display on the plugins listing page.
     *
     * @param  array $links
     * @return array
     */
    public function register_settings_link($links)
    {
        $settings_link = '<a href="admin.php?page='.self::PREFIX.'#/settings">';
        $settings_link .= esc_html(__('Settings', self::PREFIX)).'</a>';
        array_unshift($links, $settings_link);

        return $links;
    }

    /**
     * Handler for init_hook.
     *
     * @return void
     */
    public function init_hook_handler()
    {
        // initialize assets
        $this->container['assets'] = new \PluginSpace\Assets(self::PREFIX);

        // initialize the various loader classes
        if ($this->is_request('admin')) {
            $ctx = new \PluginSpace\AdminLoader(self::PREFIX);
            $this->container['admin'] = $ctx;
        }

        if ($this->is_request('frontend')) {
            $this->container['frontend'] = new \PluginSpace\FrontendLoader(self::PREFIX);
        }

        if ($this->is_request('ajax')) {
            // $this->container['ajax'] =  new \PluginSpace\AjaxLoader(self::PREFIX);
        }

        // finally load api routes
        $this->container['api'] = new \PluginSpace\ApiRoutes(self::PREFIX);
    }

    /**
     * Initialize plugin for localization.
     *
     * @uses load_plugin_textdomain()
     */
    public function localization_setup()
    {
        load_plugin_textdomain(
            self::PREFIX,
            false,
            dirname(plugin_basename(self::PLUGINFILE)).'/languages/'
        );
    }

    /**
     * What type of request is this?
     *
     * @param  string $type admin, ajax, cron or frontend.
     *
     * @return bool
     */
    private function is_request($type)
    {
        switch ($type) {
            case 'admin':
                return is_admin();

            case 'ajax':
                return defined('DOING_AJAX');

            case 'rest':
                return defined('REST_REQUEST');

            case 'cron':
                return defined('DOING_CRON');

            case 'frontend':
                return (! is_admin() || defined('DOING_AJAX')) && ! defined('DOING_CRON');
        }
    }

    /**
     * Cloning is forbidden.
     *
     * @since 1.0.0
     */
    public function __clone()
    {
        _doing_it_wrong(__FUNCTION__, esc_html(__('Cloning of Main is forbidden')), esc_attr($this->VERSION));
    } // End __clone ()

    /**
     * Unserializing instances of this class is forbidden.
     *
     * @since 1.0.0
     */
    public function __wakeup()
    {
        _doing_it_wrong(__FUNCTION__, esc_html(__('Unserializing instances of Main is forbidden')), esc_attr($this->VERSION));
    } // End __wakeup ()
}

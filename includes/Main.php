<?php
namespace Baseapp;

/**
 * Main class
 *
 * @class Main The class that holds initialize this plugin
 */
final class Main
{
	/**
	 * Plugin version.
	 *
	 * @var string
	 */
	const VERSION = '0.1.0';

	/**
	 * A unique plugin prefix to use throughout your plugin.
	 * This is also your application domain.
	 *
	 * @var string
	 */
	const PREFIX = 'baseapp';

	/**
	 * Holds various class instances.
	 *
	 * @var array
	 */
	private $container = array();

	/**
	 * The singleton instance.
	 *
	 * @var Main
	 */
	private static $instance;

	/**
	 * The plugin filename.
	 *
	 * @var string
	 */
	public static $PLUGINFILE = '';

	/**
	 * The base url, default '.'
	 *
	 * @var string
	 */
	public static $BASEURL = '.';

	/**
	 * The plugin dir, default to empty string
	 * @var string
	 */
	public static $PLUGINDIR = '';

	/**
	 * Constructor for the Main class
	 *
	 * Sets up all the appropriate hooks and actions
	 * within our plugin.
	 *
	 * @param $filename the plugin file name
	 */
    private function __construct( $filename )
    {
        self::$PLUGINFILE = $filename;
        self::$PLUGINDIR  = dirname( $filename );
    }

	/**
	 * Get a singleton instance of this plugin.
	 *
	 * Usage: Main::get_instance()
	 *
	 * @param $filename the plugin file name
	 *
	 * @return Main the singleton instance
	 */
	public static function get_instance( $filename )
	{
		if (! self::$instance) {
        	self::$instance = new self( $filename );
		}

    	return self::$instance;
	}

	/**
	 * Do stuff during plugin uninstall.
	 *
	 */
	public static function uninstall_plugin()
	{
		flush_rewrite_rules();

		$setting_key = self::PREFIX . '_settings';
		$settings    = get_option($setting_key, []);
		(new \Baseapp\Migrations())->cleanUp( self::PREFIX, $settings);
	}

	/**
	 * Activate and initialize the plugin.
	 *
	 */
	public function run()
	{
		// set base url from plugin file name
        self::$BASEURL = plugins_url( '', self::$PLUGINFILE );

		register_activation_hook( self::$PLUGINFILE, array( $this, 'activate_plugin' ) );
		register_deactivation_hook( self::$PLUGINFILE, array( $this, 'deactivate_plugin' ) );
		register_uninstall_hook( self::$PLUGINFILE, array( __CLASS__, 'uninstall_plugin') );

		add_action( 'plugins_loaded', array( $this, 'plugins_loaded' ) );

		// setup cli
		if (defined( 'WP_CLI' ) && \WP_CLI) {
			$this->container['cli'] = new \Baseapp\CliLoader( self::PREFIX );
		}

        $plugin = plugin_basename(self::$PLUGINFILE);
		add_filter("plugin_action_links_$plugin", array( $this, 'register_settings_link' ));
	}

	/**
	 * Magic getter to bypass referencing plugin.
	 *
	 * @param $prop
	 *
	 * @return mixed
	 */
	public function __get( $prop )
	{
		if (array_key_exists( $prop, $this->container ))
		{
			return $this->container[ $prop ];
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
	public function __isset( $prop )
	{
		return isset( $this->{$prop} ) || isset( $this->container[ $prop ] );
	}

	/**
	 * Register hooks after all plugins are loaded
	 *
	 * @return void
	 */
	public function plugins_loaded()
	{
		add_action( 'init', array( $this, 'init_hook_handler' ) );
	}

	/**
	 * Plugin activation function.
	 *
	 */
	public function activate_plugin()
	{
		(new \Baseapp\Migrations())->run( self::PREFIX, self::VERSION );

		// set the current version to activate plugin
		update_option( self::PREFIX . '_version', self::VERSION );
	}

	/**
	 * Do stuff during plugin deactivation.
	 *
	 */
	public function deactivate_plugin()
	{
		flush_rewrite_rules();

		// do stuff such as: shut off cron tasks, etc...

		// remove version number to deactivate plugin
		delete_option( self::PREFIX . '_version' );
	}

	/**
	 * Register settings link that display on the plugins listing page.
	 *
	 * @param  array $links
	 * @return array
	 */
	public function register_settings_link($links)
	{
		$settings_link = '<a href="admin.php?page=' . $this->prefix . '#/settings">Settings</a>';
    	array_unshift($links, $settings_link);

    	return $links;
	}

	/**
	 * Handler for init_hook
	 *
	 * @return void
	 */
	public function init_hook_handler()
	{
		// initialize assets
		$this->container['assets'] = new \Baseapp\Assets( self::PREFIX );

		// initialize the various loader classes
		if ($this->is_request( 'admin' ))
		{
			$ctx = new \Baseapp\AdminLoader( self::PREFIX );
			$this->container['admin'] = $ctx;
		}

		if ($this->is_request( 'frontend' ))
		{
			$this->container['frontend'] = new \Baseapp\FrontendLoader( self::PREFIX );
		}

		if ($this->is_request( 'ajax' ))
		{
			// $this->container['ajax'] =  new \Baseapp\AjaxLoader( self::PREFIX );
		}

		// finally load api routes
		$this->container['api'] = new \Baseapp\ApiRoutes( self::PREFIX );
	}

	/**
	 * Initialize plugin for localization.
	 *
	 * @uses load_plugin_textdomain()
	 */
	public function localization_setup()
	{
		load_plugin_textdomain(self::PREFIX,
			false, dirname( plugin_basename( self::PLUGINFILE ) ) . '/languages/' );
	}

	/**
	 * What type of request is this?
	 *
	 * @param  string $type admin, ajax, cron or frontend.
	 *
	 * @return bool
	 */
	private function is_request( $type )
	{
		switch ($type) {
			case 'admin' :
				return is_admin();

			case 'ajax' :
				return defined( 'DOING_AJAX' );

			case 'rest' :
				return defined( 'REST_REQUEST' );

			case 'cron' :
				return defined( 'DOING_CRON' );

			case 'frontend' :
				return ( ! is_admin() || defined( 'DOING_AJAX' ) ) && ! defined( 'DOING_CRON' );
		}
	}
}

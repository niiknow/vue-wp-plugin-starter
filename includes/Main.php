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
	 * Plugin version
	 *
	 * @var string
	 */
	const VERSION = '0.1.0';

	/**
	 * A unique plugin prefix to use throughout your plugin
	 *
	 * @var string
	 */
	const PREFIX = 'my_unique_plugin_prefix';

	/**
	 * Holds various class instances
	 *
	 * @var array
	 */
	private $container = array();

	/**
	 * The singleton instance.
	 * @var Main
	 */
	private static $instance;

	/**
	 * The filename
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
	 * Constructor for the Main class
	 *
	 * Sets up all the appropriate hooks and actions
	 * within our plugin.
	 *
	 * @param $filename the plugin file name
	 */
    private function __construct($filename)
    {
        self::$PLUGINFILE = $filename;
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
	public static function get_instance($filename)
	{
		if (! self::$instance) {
        	self::$instance = new self($filename);
		}

    	return self::$instance;
	}

	/**
	 * Activate and initialize the plugin
	 *
	 */
	public function run()
	{
		// set base url from plugin file name
        self::$BASEURL = plugins_url('', self::$PLUGINFILE);

		register_activation_hook( __FILE__, array( $this, 'activate_plugin' ) );
		register_deactivation_hook( __FILE__, array( $this, 'deactivate_plugin' ) );

		add_action( 'plugins_loaded', array( $this, 'plugins_loaded' ) );
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
	 * Placeholder for activation function
	 *
	 * Nothing being called here yet.
	 */
	public function activate_plugin()
	{
		$installed = get_option( self::PREFIX . '_installed' );

		if (! $installed)
		{
			update_option( self::PREFIX . '_installed', time() );

			// TIP: this is where you can add your database init
			// create tables etc...
			// update_option( self::PREFIX . '_dbmigrate', 1 );
		}

		update_option( self::PREFIX . '_version', self::VERSION );

		// NOTE: this is where you can add your database migrate script
		// based on version in the _dbmigrate version
		//
		// $version = get_option( self::PREFIX . '_dbmigrate');
		// for: $version ... current_dbversion, run sql migrate ($version)
		// $update_option( self::PREFIX . '_dbmigrate', current_dbversion);
	}

	/**
	 * Do stuff during plugin deactivation
	 *
	 */
	public function deactivate_plugin()
	{
		flush_rewrite_rules();
	}

	/**
	 * init hook handler
	 *
	 * @return void
	 */
	public function init_hook_handler()
	{
		// initialize assets
		$this->container['assets'] = new \Baseapp\Assets();

		// initialize the various loader classes
		if ($this->is_request( 'admin' ))
		{
			$this->container['admin'] = new \Baseapp\AdminLoader();
		}

		if ($this->is_request( 'frontend' ))
		{
			$this->container['frontend'] = new \Baseapp\FrontendLoader();
		}

		if ($this->is_request( 'ajax' ))
		{
			// $this->container['ajax'] =  new \BaseApp\AjaxLoader();
		}

		// finally load api routes
		$this->container['api'] = new \Baseapp\ApiRoutes();
	}

	/**
	 * Initialize plugin for localization
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

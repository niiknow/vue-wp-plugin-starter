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
	 * Plugin prefix
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
	public static $PLUGINFILE;

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
	 * initialize this plugin
	 *
	 */
	public function init()
	{
		register_activation_hook( __FILE__, array( $this, 'activate' ) );
		register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );

		add_action( 'plugins_loaded', array( $this, 'init_plugin' ) );
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
	 * Load the plugin after all plugin are loaded
	 *
	 * @return void
	 */
	public function init_plugin()
	{
		$this->init_hooks();
	}

	/**
	 * Placeholder for activation function
	 *
	 * Nothing being called here yet.
	 */
	public function activate()
	{
		$installed = get_option( self::PREFIX . '_installed' );

		if (! $installed)
		{
			update_option( self::PREFIX . '_installed', time() );
		}

		update_option( self::PREFIX . '_version', self::VERSION );
	}

	/**
	 * Placeholder for deactivation function
	 *
	 * Nothing being called here yet.
	 */
	public function deactivate()
	{
		flush_rewrite_rules();
	}

	/**
	 * Initialize the hooks
	 *
	 * @return void
	 */
	public function init_hooks()
	{
		add_action( 'init', array( $this, 'init_classes' ) );

		// Localize our plugin
		add_action( 'init', array( $this, 'localization_setup' ) );
	}

	/**
	 * Instantiate the required classes
	 *
	 * @return void
	 */
	public function init_classes()
	{
		if ($this->is_request( 'admin' ))
		{
			$this->container['admin'] = new \Baseapp\Admin();
		}

		if ($this->is_request( 'frontend' ))
		{
			$this->container['frontend'] = new \Baseapp\Frontend();
		}

		if ($this->is_request( 'ajax' ))
		{
			// $this->container['ajax'] =  new \BaseApp\Ajax();
		}

		$this->container['api'] = new \Baseapp\Api();
		$this->container['assets'] = new \Baseapp\Assets();
	}

	/**
	 * Initialize plugin for localization
	 *
	 * @uses load_plugin_textdomain()
	 */
	public function localization_setup()
	{
		load_plugin_textdomain(self::PREFIX . '_textdomain',
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

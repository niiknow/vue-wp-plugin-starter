<?php
namespace Baseapp;

/**
 * Cli commands loader
 */
class CliLoader
{
	/**
	 * Initialize this class
	 */
    public function __construct()
    {
    	// this is where you can load Cli
    	WP_CLI::add_command( \Baseapp\Main::PREFIX, \Baseapp\ExampleCommand::class );
    }
}

<?php
namespace PluginNamespace;

/**
 * Cli commands loader.
 *
 */
class CliLoader
{
    /**
     * Initialize this class
     */
    public function __construct($prefix)
    {
        // this is where you can load Cli
        \WP_CLI::add_command($prefix, \PluginNamespace\ExampleCommand::class);

        // additional command can be registered here
        // \WP_CLI::add_command( $prefix, \PluginNamespace\IndexerCommand::class );
    }
}

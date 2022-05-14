<?php

namespace PluginSpace;

/**
 * Implements example command.
 */
class ExampleCommand
{
    /**
     * Prints a greeting.
     *
     * ## OPTIONS
     *
     * <name>
     * : The name of the person to greet.
     *
     * [--type=<type>]
     * : Whether or not to greet the person with success or error.
     * ---
     * default: success
     * options:
     *   - success
     *   - error
     * ---
     *
     * ## EXAMPLES
     *
     *     wp example hello Newman
     *
     * @when after_wp_load
     */
    public function hello($args, $assoc_args)
    {
        list($name) = $args;

        // Print the message with type
        $type = $assoc_args['type'];
        WP_CLI::$type("Hello, $name!");
    }
}

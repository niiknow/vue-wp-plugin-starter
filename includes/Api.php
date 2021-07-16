<?php
namespace Baseapp;

use WP_REST_Controller;

/**
 * REST_API Handler
 */
class Api extends WP_REST_Controller
{
    /**
     * [__construct description]
     */
    public function __construct()
    {
        add_action('rest_api_init', [ $this, 'register_routes' ]);
    }

    /**
     * Register the API routes
     *
     * @return void
     */
    public function register_routes()
    {
        (new Api\AdminController())->register_routes();
    }
}

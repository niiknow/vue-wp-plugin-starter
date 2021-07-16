<?php
namespace Baseapp;

/**
 * API routes loader
 */
class ApiRoutes
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
     * Keep register_routes in API separate so it's easier to test and
     * we have a single place/method to load all API routes
     *
     * @return void
     */
    public function register_routes()
    {
    	// instantiate and load all api routes
        (new Api\AdminController())->register_routes();
    }
}

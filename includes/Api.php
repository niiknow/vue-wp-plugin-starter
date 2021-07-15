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
        $this->includes();

        add_action('rest_api_init', [ $this, 'register_routes' ]);
    }

    /**
     * Include the controller classes
     *
     * @return void
     */
    private function includes()
    {
        if (! class_exists(__NAMESPACE__ . '\Api\AdminController')) {
            require_once __DIR__ . '/Api/AdminController.php';
        }
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

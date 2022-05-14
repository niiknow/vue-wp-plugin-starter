<?php

namespace PluginSpace;

/**
 * API routes loader.
 */
class ApiRoutes
{
    /**
     * [__construct description].
     */
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    /**
     * Register the API routes.
     *
     * Keep register_routes in API separate so it's easier to test and
     * we have a single place/method to load all API routes
     *
     * @return void
     */
    public function register_routes()
    {
        // instantiate and load all api routes
        (new Api\SettingController())->register_routes();

        /*
    // uncomment this to automatically return new nonce
    // so when you create your own rest controller, you don't
    // have to manually code to return new nonce
    add_filter( 'rest_post_dispatch', function( WP_REST_Response $response) {
    $response->header('X-WP-Nonce', wp_create_nonce( 'wp_rest' ));
    return $response;
    }, PHP_INT_MAX);?>
     */
    }
}

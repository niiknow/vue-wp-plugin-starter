<?php
namespace Baseapp\Api;

/**
 * Backend controller
 */
class SettingController extends \WP_REST_Controller
{
	/**
	 * Initialize this class
	 */
    public function __construct()
    {
        $this->namespace = \Baseapp\Main::PREFIX . '/v1';
        $this->rest_base = 'settings';
    }

    /**
     * Register the routes
     *
     * @return void
     */
    public function register_routes()
    {
    	// Register the /wp-json/myplugin/v1/settings route
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            array(
                array(
                    'methods'             => 'GET',
                    'callback'            => array( $this, 'get_settings' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
                    'args'                => $this->get_collection_params(),
                ),
                array(
                    'methods'             => 'POST',
                    'callback'            => array( $this, 'update_settings' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
                    'args'                => $this->get_collection_params(),
                )

            )
        );
    }

    /**
     * Retrieves settings
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_settings($request)
    {
        $data = get_option( \Baseapp\Main::PREFIX . '_settings', false );

		$response = array(
			'data' => $data
		);

	    return rest_ensure_response($response);
    }

    /**
     * Update settings
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_settings(\WP_REST_Request $request)
    {
    	// attempt to parse the json parameter
    	$response = $request->parse_json_params();

    	if (true === $rsp) {
    		$data = $request->params['JSON'];
    		update_option( \Baseapp\Main::PREFIX . '_settings', $data );

			$response = array(
				'data' => $data
			);

	        return rest_ensure_response($response);
    	}

		return $response;
    }

    /**
     * Checks if a given request has access to read the items.
     *
     * @param  WP_REST_Request $request Full details about the request.
     *
     * @return true|WP_Error True if the request has read access, WP_Error object otherwise.
     */
    public function get_items_permissions_check($request)
    {
        if (current_user_can('editor') || current_user_can('administrator')) {
        	return true;
        }

        return new WP_Error( 'rest_forbidden', __( 'Sorry, you cannot update settings.' ), array( 'status' => 403 ) );
    }

    /**
     * Retrieves the query params for the items collection.
     *
     * @return array Collection parameters.
     */
    public function get_collection_params()
    {
    	// for settings, we don't need any parameters
        return [];
    }
}

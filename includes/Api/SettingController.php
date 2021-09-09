<?php
namespace Baseapp\Api;

/**
 * Backend settings controller
 *
 */
class SettingController extends \WP_REST_Controller
{
	/**
	 * The application domain
	 *
	 * @var string
	 */
	private $prefix;

    /**
     * Initialize this class.
     *
     */
    public function __construct()
    {
        $this->prefix = \Baseapp\Main::PREFIX;
        $this->namespace = $this->prefix . '/v1';
        $this->rest_base = 'settings';
    }

    /**
     * get the endpoint
     *
     * @return string the full endpoint
     */
    public function get_endpoint()
    {
        // example: myplugin/v1/settings
        return  $this->namespace . '/' . $this->rest_base;
    }

    /**
     * Register the routes
     *
     * @return void
     */
    public function register_routes()
    {
    	// Register the /wp-json/ + get_endpoint() route
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
        $data = get_option(  $this->prefix . '_settings', false );

		$response = array(
			'data'  => array('settings' => $data ),
			'nonce' => wp_create_nonce('wp_rest')
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
    		$params       = $request->params['JSON'];
    		$settings     = isset( $params['settings'] ) ? $params['settings'] : array();
    		$setting_key  = $this->prefix . '_settings';
    		$new_settings = $this->sanitized_settings($settings);
    		$old_settings = get_option($setting_key);

    		$data = apply_filters( $this->prefix . '_settings_update', $new_settings, $old_settings );
    		update_option( $setting_key, $data );

			$response = array(
				'data'  => array('settings' => $data ),
				'nonce' => wp_create_nonce('wp_rest')  // another nonce to use later
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
    	// optional: check nonce
    	// https://via.studio/journal/wordpress-rest-api-secure-ajax-calls-custom-endpoints
    	// example: /wp-json/me/v1/endpoint/?_wpnonce=${nonce}
    	// check_ajax_referer('wp_rest', '_wpnonce', true)
    	// 3rd parameter (die=true) to kill rest of execution

        if (! current_user_can('manage_options'))
        {
        	return new WP_Error( 'rest_forbidden', __( 'Sorry, you cannot update settings.' ), array( 'status' => 403 ) );
        }

        return true;
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

    /**
     * Settings structure goes here
     *
     * @return array settings structure definition
     */
    public function get_settings_structure()
    {
    	return include( \Baseapp\Main::$PLUGINDIR . '/config/settings.php' );
    }

    /**
     * Sanitize specific setting value
     * @param  Array $details
     * @param  Array $sanitized_settings
     * @param  string $id
     * @param  object $value
     * @return void
     */
    private function sanitize_value($details, &$sanitized_settings, $id, $value) {
    	$sanitized_value = NULL;

		// Check for custom sanitization function.
		if (isset( $details['sanitize'] ) && is_callable( $details['sanitize'] )) {
			$sanitized_value = call_user_func( $details['sanitize'], $value );
		}

		// Options callback.
		if (isset( $details['optionsCallback'] )) {
			$details['options'] = call_user_func( $details['optionsCallback'], $details );
		}

		// Default sanitization based on type.
		if (is_null( $sanitized_value ) && isset( $details['type'] )) {
			switch ($details['type']) {
				case 'email':
					$sanitized_value = trim( sanitize_email( $value ) );
					break;
				case 'code':
					$sanitized_value = trim( wp_kses_post( $value ) );

					// Fix for CSS code.
					$sanitized_value = str_replace( '&gt;', '>', $sanitized_value );
					break;
				case 'text':
				case 'number':
				case 'color':
					$sanitized_value = trim( sanitize_text_field( $value ) );
					break;
				case 'dropdown':
				case 'dropdownMultiselect':
					$sanitized_value = array();

					if (! is_array( $value )) {
						$value = explode(',', $value);
					}

					foreach ($value as $option) {
						if (array_key_exists( $option, $details['options'] )) {
							$sanitized_value[] = $option;
						}
					}

					break;
				case 'richTextarea':
				case 'textarea':
					$sanitized_value = trim( stripslashes( wp_kses_post( $value ) ) );
					break;
				case 'file':
					$sanitized_value = trim( esc_url( $value ) );
				case 'toggle':
					$sanitized_value = $value ? true : false;
					break;
			}
		}

		$sanitized_value = apply_filters( $this->prefix . '_settings_sanitized', $sanitized_value, $value, $id, $details );

		if (is_null( $sanitized_value )) {
			$sanitized_settings[ $id ] = $details[ $id ][ 'default' ];
		} else {
			$sanitized_settings[ $id ] = $sanitized_value;
		}
    }

	/**
	 * Sanitize the settings.
	 *
	 * @param	array $settings Settings to sanitize.
	 */
	public function sanitize_settings( $settings ) {
		$sanitized_settings = array();
		$settings_details = $this->get_settings_structure();

		foreach ($settings_details as $id => $details) {
			$value = isset($settings[$id]) ? $settings[$id] : $details['default'];

			$this->sanitize_value($details, $sanitized_settings, $id, $value);
		}

		return $sanitized_settings;
	}
}

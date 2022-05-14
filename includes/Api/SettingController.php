<?php

namespace PluginSpace\Api;

/**
 * Backend settings controller.
 */
class SettingController extends \WP_REST_Controller
{
    /**
     * The application domain.
     *
     * @var string
     */
    private $prefix;

    /**
     * Initialize this class.
     */
    public function __construct()
    {
        $this->prefix = \PluginSpace\Main::PREFIX;
        $this->namespace = $this->prefix.'/v1';
        $this->rest_base = 'settings';
    }

    /**
     * Register the routes.
     *
     * @return void
     */
    public function register_routes()
    {
        // Register the /wp-json/ + get_endpoint() route
        register_rest_route(
            $this->namespace,
            '/'.$this->rest_base,
            [
                [
                    'methods'             => 'GET',
                    'callback'            => [$this, 'get_settings'],
                    'permission_callback' => [$this, 'get_items_permissions_check'],
                    'args'                => $this->get_collection_params(),
                ],
                [
                    'methods'             => 'POST',
                    'callback'            => [$this, 'update_settings'],
                    'permission_callback' => [$this, 'get_items_permissions_check'],
                    'args'                => $this->get_collection_params(),
                ],
            ]
        );
    }

    /**
     * get the endpoint.
     *
     * @return string the full endpoint
     */
    public function get_endpoint()
    {
        // example: myplugin/v1/settings
        return $this->namespace.'/'.$this->rest_base;
    }

    /**
     * Retrieves settings data only.
     */
    public function get_settings_raw()
    {
        return get_option($this->prefix.'_settings', $this->get_setting_defaults());
    }

    /**
     * Retrieves settings.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_settings($request)
    {
        $data = $this->get_settings_raw();
        $nonce = wp_create_nonce('wp_rest');

        $response = [
            'data'    => $data,
            'success' => true,
            'nonce'   => $nonce,
        ];

        return rest_ensure_response($response);
    }

    /**
     * Update settings.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_settings(\WP_REST_Request $request)
    {
        // attempt to parse the json parameter
        $params = $request->get_json_params();
        $nonce = wp_create_nonce('wp_rest');

        // update correct response
        $response = [
            'data'    => $params,
            'success' => false,
            'nonce'   => $nonce,
        ];

        if (isset($params)) {
            $settings = $params;
            $setting_key = $this->prefix.'_settings';
            $new_settings = $this->sanitize_settings($settings);
            $old_settings = get_option($setting_key);

            $data = apply_filters($this->prefix.'_settings_update', $new_settings, $old_settings);
            update_option($setting_key, $data);
            $response['data'] = $data;
            $response['success'] = true;
        }

        return rest_ensure_response($response);
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

        if (! current_user_can('manage_options')) {
            return new \WP_Error('rest_forbidden', __('Sorry, you cannot update settings.'), ['status' => 403]);
        }

        // since success, we response with next noonce
        header('X-WP-Nonce: '.wp_create_nonce('wp_rest'));

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
     * Settings structure goes here.
     *
     * @param  bool $runOptionsCallback
     * @return array settings structure definition
     */
    public function get_settings_structure($runOptionsCallback = false)
    {
        $options = include \PluginSpace\Main::$PLUGINDIR.'/config/settings.php';

        if ($runOptionsCallback) {
            $settings_details = $options['options'];

            foreach ($settings_details as $id => $details) {
                //var_dump($details);
                if (isset($details['optionsCallback'])) {
                    $options['options'][$id]['options'] = call_user_func($details['optionsCallback'], $details);
                }
            }
        }

        return $options;
    }

    /**
     * Get setting defaults.
     *
     * @return array setting defaults
     */
    public function get_setting_defaults()
    {
        $options = include \PluginSpace\Main::$PLUGINDIR.'/config/settings.php';
        $result = [];

        $settings_details = $options['options'];
        foreach ($settings_details as $id => $details) {
            $result[$id] = $details['default'];
        }

        return $result;
    }

    /**
     * Sanitize specific setting value.
     * @param  array $details
     * @param  array $sanitized_settings
     * @param  string $id
     * @param  object $value
     * @return void
     */
    private function sanitize_value($details, &$sanitized_settings, $id, $value)
    {
        $sanitized_value = null;

        // Check for custom sanitization function.
        if (isset($details['sanitize']) && is_callable($details['sanitize'])) {
            $sanitized_value = call_user_func($details['sanitize'], $value);
        }

        // Options callback.
        if (isset($details['optionsCallback'])) {
            $details['options'] = call_user_func($details['optionsCallback'], $details);
        }

        // Default sanitization based on type.
        if (is_null($sanitized_value) && isset($details['type'])) {
            switch ($details['type']) {
                case 'email':
                    $sanitized_value = trim(sanitize_email($value));
                    break;
                case 'code':
                    $sanitized_value = trim(wp_kses_post($value));

                    // Fix for CSS code.
                    $sanitized_value = str_replace('&gt;', '>', $sanitized_value);
                    break;
                case 'text':
                case 'number':
                case 'color':
                    $sanitized_value = trim(sanitize_text_field($value));
                    break;
                case 'dropdown':
                case 'dropdownMultiselect':
                    $sanitized_value = [];

                    if (! is_array($value)) {
                        $value = explode(',', $value);
                    }

                    foreach ($value as $option) {
                        if (array_key_exists($option, $details['options'])) {
                            $sanitized_value[] = $option;
                        }
                    }

                    // only one option for single dropdown
                    if ($details['type'] === 'drodown') {
                        $sanitized_value = $sanitized_value[0];
                    }

                    break;
                case 'textarea':
                    $sanitized_value = trim(stripslashes(wp_kses_post($value)));
                    break;
                case 'url':
                    $sanitized_value = trim(esc_url($value));
                case 'toggle':
                    $sanitized_value = $value ? true : false;
                    break;
            }
        }

        $sanitized_value = apply_filters($this->prefix.'_settings_sanitized', $sanitized_value, $value, $id, $details);

        if (is_null($sanitized_value)) {
            $sanitized_settings[$id] = $details[$id]['default'];
        } else {
            $sanitized_settings[$id] = $sanitized_value;
        }
    }

    /**
     * Sanitize the settings.
     *
     * @param    array $settings Settings to sanitize.
     */
    public function sanitize_settings($settings)
    {
        $sanitized_settings = [];
        $settings_details = $this->get_settings_structure()['options'];

        foreach ($settings_details as $id => $details) {
            $value = isset($settings[$id]) ? $settings[$id] : $details['default'];

            $this->sanitize_value($details, $sanitized_settings, $id, $value);
        }

        return $sanitized_settings;
    }
}

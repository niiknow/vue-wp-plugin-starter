<?php
namespace PluginNamespace;

/**
 * Frontend pages loader
 *
 */
class FrontendLoader
{
    /**
     * The application domain
     *
     * @var string
     */
    private $prefix;

    /**
     * The id
     * @var string
     */
    private $id;

    /**
     * Initialize this class.
     *
     * @param string $prefix
     */
    public function __construct($prefix)
    {
        $this->prefix = $prefix;

        // let say your prefix is wp-awesome-plugin, then it will be
        // [wp-awesome-plugin-vue-app postfix='frontend']
        $this->id = str_replace("_", "-", $this->prefix . '-vue-app');
        add_shortcode($this->id, [$this, 'render_frontend']);
    }

    /**
     * Render frontend app.
     *
     * @param  array  $atts
     * @param  string $content
     *
     * @return string
     */
    public function render_frontend($atts, $content = '')
    {
        // use postfix to handle multiple frontend app
        // See Assets.php to add additional frontend js and css
        $a = shortcode_atts(array(
            'postfix' => 'frontend',
            'view'    => 'Home',
        ), $atts);

        $postfix = esc_attr($a['postfix']);
        wp_enqueue_style($this->prefix . '-' . $postfix);
        wp_enqueue_script($this->prefix . '-' . $postfix);

        // 1. frontend app is demo of utilizing full vue-router
        // 2. while frontview app demonstrate passing in view attribute
        //    to select dynamic view
        if ($postfix === 'frontend') {
            // output data for use on client-side
            // https://wordpress.stackexchange.com/questions/344537/authenticating-with-rest-api
            wp_localize_script($this->prefix . '-' . $postfix, 'vue_wp_plugin_config_' . $postfix, [
                // todo: add config output here
            ]);

            $content .= '<div id="vue-frontend-app" ></div>';
        } else if ($postfix === 'frontview') {
            // output data for use on client-side
            // https://wordpress.stackexchange.com/questions/344537/authenticating-with-rest-api
            wp_localize_script($this->prefix . '-' . $postfix, 'vue_wp_plugin_config_' . $postfix, [
                'viewComponent' => esc_attr($a['view']),
            ]);

            $content .= '<div id="vue-frontview-app" ></div>';
        }

        return $content;
    }
}

<?php
namespace Baseapp;

/**
 * Frontend pages loader
 *
 */
class FrontendLoader
{
	/**
	 * Initialize this class
	 */
    public function __construct()
    {
    	// let say your prefix is wp-awesome-plugin, then it will be wp-awesome-plugin-vue-app
        add_shortcode(\Baseapp\Main::PREFIX . '-vue-app', [ $this, 'render_frontend' ]);
    }

    /**
     * Render frontend app
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
    	$a = shortcode_atts( array(
	        'id' => 'vue-frontend-app',
	        'postfix' => 'frontend'
	    ), $atts );

		$postfix = esc_attr($a['postfix']);
        wp_enqueue_style(\Baseapp\Main::PREFIX . '-' . $postfix);
        wp_enqueue_script(\Baseapp\Main::PREFIX . '-' . $postfix);

        $content .= '<div id="' . esc_attr($a['id']) . '" ></div>';

        return $content;
    }
}

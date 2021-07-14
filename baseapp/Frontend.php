<?php
namespace BaseApp;

/**
 * Frontend Pages Handler
 */
class Frontend {

    public function __construct() {
        add_shortcode( 'vue-app', [ $this, 'render_frontend' ] );
    }

    /**
     * Render frontend app
     *
     * @param  array $atts
     * @param  string $content
     *
     * @return string
     */
    public function render_frontend( $atts, $content = '' ) {
        wp_enqueue_style( 'pluginprefix-frontend' );
        wp_enqueue_script( 'pluginprefix-frontend' );

        $content .= '<div id="vue-frontend-app"></div>';

        return $content;
    }
}

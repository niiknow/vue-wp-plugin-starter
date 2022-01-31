<?php

namespace Tests;

use PluginNamespace\Api;

defined('ABSPATH') or die();

class SettingControllerTests extends PluginTestCase
{

    public function test_construct()
    {
        $controller = new \PluginNamespace\Api\SettingController();

        $actual   = $this->accessNonPublicProperty($controller, 'namespace');
        $expected = \PluginNamespace\Main::PREFIX . '/v1';
        $this->assertEquals($expected, $actual);

        $actual   = $this->accessNonPublicProperty($controller, 'rest_base');
        $expected = 'settings';
        $this->assertEquals($expected, $actual);

        echo (json_encode($controller->get_settings_structure(true), true));
    }
}

<?php

namespace Tests;

use Brain\Monkey\Functions;

defined('ABSPATH') or die();

class SettingControllerTests extends PluginTestCase
{
    public function test_construct()
    {
        // We expect get_post_types to be called
        Functions\expect('get_post_types')
            ->once()
            ->with('', 'names')
            ->andReturn(['post', 'page']);

        $controller = new \PluginSpace\Api\SettingController();

        $actual = $this->accessNonPublicProperty($controller, 'namespace');
        $expected = \PluginSpace\Main::PREFIX.'/v1';
        $this->assertEquals($expected, $actual);

        $actual = $this->accessNonPublicProperty($controller, 'rest_base');
        $expected = 'settings';
        $this->assertEquals($expected, $actual);

        echo json_encode($controller->get_settings_structure(true), true);
    }
}

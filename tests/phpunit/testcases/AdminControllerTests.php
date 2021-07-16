<?php

namespace Tests;

use \Brain\Monkey\Functions;
use Baseapp\Api;

defined('ABSPATH') or die();

class AdminControllerTests extends PluginTestCase {

    public function test_construct() {
        $controller = new \Baseapp\Api\AdminController();

		$actual   = $this->accessNonPublicProperty($controller, 'namespace');
		$expected = \Baseapp\Main::PREFIX . '/v1';
        $this->assertEquals($expected, $actual);

		$actual   = $this->accessNonPublicProperty($controller, 'rest_base');
		$expected = 'backend';
        $this->assertEquals($expected, $actual);

    }
}

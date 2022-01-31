<?php

namespace Tests;

use Brain\Monkey;
use PHPUnit\Framework\TestCase;

class PluginTestCase extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Monkey\setUp();
        $instance = \PluginSpace\Main::get_instance(realpath(__DIR__ . '/../../../index.php'), '1.0.0');
    }

    protected function tearDown(): void
    {
        Monkey\tearDown();
        parent::tearDown();
    }

    protected function accessNonPublicProperty($obj, $prop)
    {
        $reflection = new \ReflectionClass($obj);
        $property   = $reflection->getProperty($prop);
        $property->setAccessible(true);
        return $property->getValue($obj);
    }
}

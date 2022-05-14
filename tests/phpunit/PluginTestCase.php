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
        // A few common passthrough
        // 1. WordPress i18n functions
        Monkey\Functions\when('__')
            ->returnArg(1);
        Monkey\Functions\when('_e')
            ->returnArg(1);
        Monkey\Functions\when('_n')
            ->returnArg(1);

        // 2. escaping
        Monkey\Functions\when('esc_html')
            ->returnArg(1);

        $instance = \PluginSpace\Main::get_instance(realpath(__DIR__.'/../../index.php'), '1.0.0');
    }

    protected function tearDown(): void
    {
        Monkey\tearDown();
        parent::tearDown();
    }

    protected function accessNonPublicProperty($obj, $prop)
    {
        $reflection = new \ReflectionClass($obj);
        $property = $reflection->getProperty($prop);
        $property->setAccessible(true);

        return $property->getValue($obj);
    }
}

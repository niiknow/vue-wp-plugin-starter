<?php

namespace PluginSpace;

/**
 * Migrations class.
 *
 * @class Migrations single point of entry for database migration
 */
final class Migrations
{
    /**
     * The database charset.
     *
     * @var string
     */
    private $db_charset = 'utf8';

    /**
     * The database collate.
     *
     * @var string
     */
    private $db_collate = 'utf8_general_ci';

    /**
     * Run the migration.
     *
     * @param  string $prefix         application prefix
     * @param  string $currentVersion the current version
     * @return Migrations
     */
    public function run($prefix, $currentVersion)
    {
        if (! current_user_can('activate_plugins')) {
            return;
        }

        // Explicitly set the character set and collation when creating the tables
        $this->db_charset = (defined('DB_CHARSET' && '' !== DB_CHARSET)) ? DB_CHARSET : 'utf8';
        $this->db_collate = (defined('DB_COLLATE' && '' !== DB_COLLATE)) ? DB_COLLATE : 'utf8_general_ci';

        $lastVersion = get_option($prefix.'_last_migrated_version', '0.0.0');

        if (version_compare($lastVersion, $currentVersion, '>=')) {
            return;
        }

        $this->applyMigration($lastVersion, '0.0.0', 'migration_0_0_0');
        $this->applyMigration($lastVersion, '0.0.1', 'migration_0_0_1');
        // TODO: add more migration methods

        update_option($prefix.'_last_migrated_version', $currentVersion);

        return $this;
    }

    /**
     * Function that help apply application migration.
     *
     * @param  string $lastVersion    the migrated version
     * @param  string $applyVersion   the migration to apply version
     * @param  string $migration_func the migration function
     * @return void
     */
    public function applyMigration($lastVersion, $applyVersion, $migration_func)
    {
        if (version_compare($lastVersion, $applyVersion, '>=')) {
            return;
        }

        call_user_func([$this, $migration_func]);
    }

    /**
     * Database cleanup to run during plugin uninstall.
     *
     * @param  string $prefix
     * @param  array  $settings
     * @return void
     */
    public function cleanUp($prefix, $settings)
    {
        // don't do anything if configured to not cleanup db
        if (! isset($settings['cleanup_db_on_plugin_uninstall']) || ! $settings['cleanup_db_on_plugin_uninstall']) {
            return;
        }

        global $wpdb;

        // remove tables
        // $wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}PluginPrefix_grid");

        // remove options
        delete_option($prefix.'_last_migrated_version');
        delete_option($prefix.'_settings');
    }

    /**
     * DB Migration for v0.0.0.
     *
     * @return void
     */
    public function migration_0_0_0()
    {
        // dummy method to demonstrate migration
    }

    /**
     * DB Migration for v0.0.1.
     *
     * @return void
     */
    public function migration_0_0_1()
    {
        global $wpdb;

        require_once ABSPATH.'wp-admin/includes/upgrade.php';

        /* $sqlQuery = "
    CREATE TABLE {$wpdb->prefix}PluginPrefix_grid (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(190) NOT NULL,
    `config` TEXT NOT NULL,
    `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY `name` (`name`)
    ) CHARACTER SET '{$this->db_charset}' COLLATE '{$this->db_collate}';
    ";

    dbDelta($sqlQuery); */
    }
}

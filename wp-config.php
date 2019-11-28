<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'andytejidos' );

/** MySQL database username */
define( 'DB_USER', 'garrido' );

/** MySQL database password */
define( 'DB_PASSWORD', 'Garrido6818' );

/** MySQL hostname */
define( 'DB_HOST', '192.168.0.63' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'PLCgW&^%rSNW.<tnOXcr.?_wQmDNX:py?vD9= ULKd?CO.QnS+#f.^niF!3<]:lq' );
define( 'SECURE_AUTH_KEY',  ',h*t^3B5f,XA)0n9cePGosM.p7>^YPA!mou}n|6@mX2kO4yaX2RYOTbA~!OhC^Zv' );
define( 'LOGGED_IN_KEY',    's]-*BUUFDFHN,QW<T`xCO/1_47JNVrzEzIy(LNnLL*gp,by3)heHQ|z yzJ 8._a' );
define( 'NONCE_KEY',        ';KJ|M~LS/?hfm%5e;TV?io`? UUX9&nnN]6H.,@!|^hpM+yT|hF>YwY%!baAPuY{' );
define( 'AUTH_SALT',        ',%A^gmwG5P?T#aac0M~$A-HXMz>^A6i<d<!x*FG]^W%/$@YgYUI:^H`/{*pePMF@' );
define( 'SECURE_AUTH_SALT', 'x{-SlK+OCvvkMK|Y1^Z3r?0`-Wd[!+FZb-=O2N93z+,17L9O9*#Nu:r84Ygbho_a' );
define( 'LOGGED_IN_SALT',   '>*)9!/7Qe]`WkJ yp0Y0~)j&#J1Adlf_[5mp$5SasPFmN*S5Kl@y@S ]mY+)?Oj.' );
define( 'NONCE_SALT',       '>%Z4p? nZQb)M2s&v7N^W_Yp{kszE|@.NUh45=F`SAo;^?%nE6ncDuPz?p?UfyQ5' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );

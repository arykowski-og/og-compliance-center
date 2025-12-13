<?php
/**
 * The header template
 *
 * @package OpenGov_Compliance_Center
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <a class="skip-link sr-only" href="#main-content">
        <?php _e( 'Skip to content', 'og-compliance-center' ); ?>
    </a>

    <header id="masthead" class="site-header">
        <div class="header-container">
            
            <!-- Logo -->
            <div class="site-branding">
                <?php if ( has_custom_logo() ) : ?>
                    <?php the_custom_logo(); ?>
                <?php else : ?>
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-logo" rel="home">
                        <?php bloginfo( 'name' ); ?>
                    </a>
                <?php endif; ?>
            </div>
            
            <!-- Navigation -->
            <nav id="site-navigation" class="main-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Primary Menu', 'og-compliance-center' ); ?>">
                <?php
                wp_nav_menu( array(
                    'theme_location' => 'primary',
                    'menu_class'     => 'nav-menu',
                    'container'      => false,
                    'fallback_cb'    => false,
                ) );
                ?>
                
                <!-- CTA Buttons -->
                <div class="header-actions">
                    <a href="#login" class="btn btn-outline btn-sm">
                        <?php _e( 'Login', 'og-compliance-center' ); ?>
                    </a>
                    <a href="#demo" class="btn btn-primary btn-sm">
                        <?php _e( 'Request a Demo', 'og-compliance-center' ); ?>
                    </a>
                </div>
                
                <!-- Mobile Menu Toggle -->
                <button class="mobile-menu-toggle" aria-label="<?php esc_attr_e( 'Toggle mobile menu', 'og-compliance-center' ); ?>">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
            
        </div>
    </header>


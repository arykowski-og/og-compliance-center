<?php
/**
 * Theme Functions
 *
 * @package OpenGov_Compliance_Center
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Theme Setup
 */
function og_compliance_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support( 'automatic-feed-links' );

    // Let WordPress manage the document title
    add_theme_support( 'title-tag' );

    // Enable support for Post Thumbnails
    add_theme_support( 'post-thumbnails' );
    set_post_thumbnail_size( 1200, 630, true );

    // Add custom image sizes
    add_image_size( 'og-featured', 1200, 600, true );
    add_image_size( 'og-thumbnail', 400, 300, true );

    // Register navigation menus
    register_nav_menus( array(
        'primary'          => __( 'Primary Menu', 'og-compliance-center' ),
        'footer-products'  => __( 'Footer Products', 'og-compliance-center' ),
        'footer-resources' => __( 'Footer Resources', 'og-compliance-center' ),
        'footer-company'   => __( 'Footer Company', 'og-compliance-center' ),
    ) );

    // Switch default core markup to output valid HTML5
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ) );

    // Add theme support for selective refresh for widgets
    add_theme_support( 'customize-selective-refresh-widgets' );

    // Add support for custom logo
    add_theme_support( 'custom-logo', array(
        'height'      => 60,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ) );

    // Add support for responsive embeds
    add_theme_support( 'responsive-embeds' );

    // Add support for editor styles
    add_theme_support( 'editor-styles' );

    // Add support for wide alignment
    add_theme_support( 'align-wide' );
}
add_action( 'after_setup_theme', 'og_compliance_setup' );

/**
 * Set content width
 */
function og_compliance_content_width() {
    $GLOBALS['content_width'] = apply_filters( 'og_compliance_content_width', 1200 );
}
add_action( 'after_setup_theme', 'og_compliance_content_width', 0 );

/**
 * Enqueue scripts and styles
 */
function og_compliance_scripts() {
    // Main stylesheet
    wp_enqueue_style( 'og-compliance-style', get_stylesheet_uri(), array(), '1.0.0' );

    // Google Fonts (optional - uncomment if needed)
    // wp_enqueue_style( 'og-compliance-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', array(), null );

    // Main JavaScript
    wp_enqueue_script( 'og-compliance-scripts', get_template_directory_uri() . '/js/main.js', array(), '1.0.0', true );

    // Comment reply script
    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'og_compliance_scripts' );

/**
 * Register widget areas
 */
function og_compliance_widgets_init() {
    register_sidebar( array(
        'name'          => __( 'Sidebar', 'og-compliance-center' ),
        'id'            => 'sidebar-1',
        'description'   => __( 'Add widgets here to appear in your sidebar.', 'og-compliance-center' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );

    register_sidebar( array(
        'name'          => __( 'Footer 1', 'og-compliance-center' ),
        'id'            => 'footer-1',
        'description'   => __( 'Add widgets here to appear in your footer.', 'og-compliance-center' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ) );
}
add_action( 'widgets_init', 'og_compliance_widgets_init' );

/**
 * Custom excerpt length
 */
function og_compliance_excerpt_length( $length ) {
    return 30;
}
add_filter( 'excerpt_length', 'og_compliance_excerpt_length', 999 );

/**
 * Custom excerpt more
 */
function og_compliance_excerpt_more( $more ) {
    return '...';
}
add_filter( 'excerpt_more', 'og_compliance_excerpt_more' );

/**
 * Add custom body classes
 */
function og_compliance_body_classes( $classes ) {
    // Add a class if the site has a custom header image
    if ( get_header_image() ) {
        $classes[] = 'has-header-image';
    }

    // Add a class if the sidebar is active
    if ( is_active_sidebar( 'sidebar-1' ) ) {
        $classes[] = 'has-sidebar';
    }

    return $classes;
}
add_filter( 'body_class', 'og_compliance_body_classes' );

/**
 * Add custom classes to navigation menu items
 */
function og_compliance_nav_menu_css_class( $classes, $item, $args ) {
    if ( 'primary' === $args->theme_location ) {
        $classes[] = 'nav-item';
    }
    return $classes;
}
add_filter( 'nav_menu_css_class', 'og_compliance_nav_menu_css_class', 10, 3 );

/**
 * Customizer additions
 */
function og_compliance_customize_register( $wp_customize ) {
    // Add Hero Section
    $wp_customize->add_section( 'og_hero_section', array(
        'title'    => __( 'Hero Section', 'og-compliance-center' ),
        'priority' => 30,
    ) );

    // Hero Title
    $wp_customize->add_setting( 'og_hero_title', array(
        'default'           => __( 'Software for Public Servants', 'og-compliance-center' ),
        'sanitize_callback' => 'sanitize_text_field',
    ) );

    $wp_customize->add_control( 'og_hero_title', array(
        'label'   => __( 'Hero Title', 'og-compliance-center' ),
        'section' => 'og_hero_section',
        'type'    => 'text',
    ) );

    // Hero Description
    $wp_customize->add_setting( 'og_hero_description', array(
        'default'           => __( 'Public service affects everyone in America, every day. That\'s why we build software to power more effective and accountable government.', 'og-compliance-center' ),
        'sanitize_callback' => 'sanitize_textarea_field',
    ) );

    $wp_customize->add_control( 'og_hero_description', array(
        'label'   => __( 'Hero Description', 'og-compliance-center' ),
        'section' => 'og_hero_section',
        'type'    => 'textarea',
    ) );

    // Primary Button Text
    $wp_customize->add_setting( 'og_hero_button_text', array(
        'default'           => __( 'Request a Demo', 'og-compliance-center' ),
        'sanitize_callback' => 'sanitize_text_field',
    ) );

    $wp_customize->add_control( 'og_hero_button_text', array(
        'label'   => __( 'Primary Button Text', 'og-compliance-center' ),
        'section' => 'og_hero_section',
        'type'    => 'text',
    ) );

    // Primary Button URL
    $wp_customize->add_setting( 'og_hero_button_url', array(
        'default'           => '#demo',
        'sanitize_callback' => 'esc_url_raw',
    ) );

    $wp_customize->add_control( 'og_hero_button_url', array(
        'label'   => __( 'Primary Button URL', 'og-compliance-center' ),
        'section' => 'og_hero_section',
        'type'    => 'url',
    ) );
}
add_action( 'customize_register', 'og_compliance_customize_register' );

/**
 * Template Tags
 */

/**
 * Display hero section
 */
function og_compliance_hero_section() {
    $title = get_theme_mod( 'og_hero_title', __( 'Software for Public Servants', 'og-compliance-center' ) );
    $description = get_theme_mod( 'og_hero_description', __( 'Public service affects everyone in America, every day. That\'s why we build software to power more effective and accountable government.', 'og-compliance-center' ) );
    $button_text = get_theme_mod( 'og_hero_button_text', __( 'Request a Demo', 'og-compliance-center' ) );
    $button_url = get_theme_mod( 'og_hero_button_url', '#demo' );
    
    if ( $title || $description ) :
    ?>
    <section class="hero-section">
        <div class="container">
            <div class="hero-content">
                <?php if ( $title ) : ?>
                    <h1><?php echo esc_html( $title ); ?></h1>
                <?php endif; ?>
                
                <?php if ( $description ) : ?>
                    <p><?php echo esc_html( $description ); ?></p>
                <?php endif; ?>
                
                <div class="hero-actions">
                    <?php if ( $button_text && $button_url ) : ?>
                        <a href="<?php echo esc_url( $button_url ); ?>" class="btn btn-primary btn-lg">
                            <?php echo esc_html( $button_text ); ?>
                        </a>
                    <?php endif; ?>
                    <a href="#learn-more" class="btn btn-secondary btn-lg">
                        <?php _e( 'Learn More', 'og-compliance-center' ); ?>
                    </a>
                </div>
            </div>
        </div>
    </section>
    <?php
    endif;
}

/**
 * Get SVG icon
 */
function og_compliance_get_icon( $icon ) {
    $icons = array(
        'check' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        'arrow-right' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    );
    
    return isset( $icons[ $icon ] ) ? $icons[ $icon ] : '';
}

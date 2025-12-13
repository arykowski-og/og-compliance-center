<?php
/**
 * The footer template
 *
 * @package OpenGov_Compliance_Center
 */
?>

    <footer id="colophon" class="site-footer">
        <div class="container">
            
            <div class="footer-content">
                
                <!-- About Section -->
                <div class="footer-section">
                    <h4><?php bloginfo( 'name' ); ?></h4>
                    <p>
                        <?php
                        $description = get_bloginfo( 'description', 'display' );
                        if ( $description || is_customize_preview() ) {
                            echo $description;
                        } else {
                            _e( 'Software for Public Servants. Building more effective and accountable government.', 'og-compliance-center' );
                        }
                        ?>
                    </p>
                </div>
                
                <!-- Products -->
                <div class="footer-section">
                    <h4><?php _e( 'Products', 'og-compliance-center' ); ?></h4>
                    <?php
                    wp_nav_menu( array(
                        'theme_location' => 'footer-products',
                        'menu_class'     => 'footer-menu',
                        'container'      => false,
                        'depth'          => 1,
                        'fallback_cb'    => false,
                    ) );
                    ?>
                </div>
                
                <!-- Resources -->
                <div class="footer-section">
                    <h4><?php _e( 'Resources', 'og-compliance-center' ); ?></h4>
                    <?php
                    wp_nav_menu( array(
                        'theme_location' => 'footer-resources',
                        'menu_class'     => 'footer-menu',
                        'container'      => false,
                        'depth'          => 1,
                        'fallback_cb'    => false,
                    ) );
                    ?>
                </div>
                
                <!-- Company -->
                <div class="footer-section">
                    <h4><?php _e( 'Company', 'og-compliance-center' ); ?></h4>
                    <?php
                    wp_nav_menu( array(
                        'theme_location' => 'footer-company',
                        'menu_class'     => 'footer-menu',
                        'container'      => false,
                        'depth'          => 1,
                        'fallback_cb'    => false,
                    ) );
                    ?>
                </div>
                
            </div>
            
            <div class="footer-bottom">
                <div class="footer-copyright">
                    <p>
                        &copy; <?php echo date('Y'); ?> <?php bloginfo( 'name' ); ?> | 
                        <a href="<?php echo esc_url( get_privacy_policy_url() ); ?>">
                            <?php _e( 'Privacy Policy', 'og-compliance-center' ); ?>
                        </a>
                    </p>
                </div>
                
                <ul class="footer-social">
                    <li>
                        <a href="#" aria-label="<?php esc_attr_e( 'Twitter', 'og-compliance-center' ); ?>">
                            <span aria-hidden="true">𝕏</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" aria-label="<?php esc_attr_e( 'LinkedIn', 'og-compliance-center' ); ?>">
                            <span aria-hidden="true">in</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" aria-label="<?php esc_attr_e( 'Facebook', 'og-compliance-center' ); ?>">
                            <span aria-hidden="true">f</span>
                        </a>
                    </li>
                </ul>
            </div>
            
        </div>
    </footer>

</div><!-- #page -->

<?php wp_footer(); ?>

<script>
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#0') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});
</script>

</body>
</html>


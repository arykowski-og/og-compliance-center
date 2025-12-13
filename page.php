<?php
/**
 * The template for displaying all pages
 *
 * @package OpenGov_Compliance_Center
 */

get_header();
?>

<main id="main-content" class="site-main">
    
    <?php while ( have_posts() ) : the_post(); ?>
        
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            
            <!-- Page Header -->
            <header class="entry-header section" style="background: var(--og-gray-100);">
                <div class="container text-center">
                    <h1 class="entry-title"><?php the_title(); ?></h1>
                    
                    <?php if ( has_excerpt() ) : ?>
                        <div class="entry-excerpt lead">
                            <?php the_excerpt(); ?>
                        </div>
                    <?php endif; ?>
                </div>
            </header>
            
            <!-- Page Content -->
            <div class="entry-content section">
                <div class="container container-narrow">
                    <?php
                    the_content();
                    
                    wp_link_pages( array(
                        'before' => '<div class="page-links">' . __( 'Pages:', 'og-compliance-center' ),
                        'after'  => '</div>',
                    ) );
                    ?>
                </div>
            </div>
            
        </article>
        
        <?php
        // If comments are open or we have at least one comment, load up the comment template.
        if ( comments_open() || get_comments_number() ) :
            ?>
            <div class="container container-narrow section-sm">
                <?php comments_template(); ?>
            </div>
            <?php
        endif;
        ?>
        
    <?php endwhile; ?>
    
</main>

<?php
get_footer();

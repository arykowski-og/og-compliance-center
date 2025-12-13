<?php
/**
 * The template for displaying all single posts
 *
 * @package OpenGov_Compliance_Center
 */

get_header();
?>

<main id="main-content" class="site-main">
    
    <?php while ( have_posts() ) : the_post(); ?>
        
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            
            <!-- Post Header -->
            <header class="entry-header section" style="background: var(--og-gray-100);">
                <div class="container container-narrow text-center">
                    
                    <?php
                    $categories = get_the_category();
                    if ( ! empty( $categories ) ) :
                        ?>
                        <div class="entry-categories mb-2">
                            <span class="section-label">
                                <?php echo esc_html( $categories[0]->name ); ?>
                            </span>
                        </div>
                    <?php endif; ?>
                    
                    <h1 class="entry-title"><?php the_title(); ?></h1>
                    
                    <div class="entry-meta">
                        <time datetime="<?php echo get_the_date( 'c' ); ?>">
                            <?php echo get_the_date(); ?>
                        </time>
                        <span class="meta-separator">•</span>
                        <span class="byline">
                            <?php _e( 'By', 'og-compliance-center' ); ?>
                            <?php the_author(); ?>
                        </span>
                        <?php if ( function_exists( 'the_views' ) ) : ?>
                            <span class="meta-separator">•</span>
                            <?php the_views(); ?>
                        <?php endif; ?>
                    </div>
                    
                </div>
            </header>
            
            <?php if ( has_post_thumbnail() ) : ?>
                <div class="post-thumbnail section-sm">
                    <div class="container container-narrow">
                        <?php the_post_thumbnail( 'og-featured' ); ?>
                    </div>
                </div>
            <?php endif; ?>
            
            <!-- Post Content -->
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
            
            <!-- Post Footer -->
            <footer class="entry-footer section-sm" style="background: var(--og-gray-100);">
                <div class="container container-narrow">
                    <?php
                    $tags = get_the_tags();
                    if ( $tags ) :
                        ?>
                        <div class="post-tags">
                            <strong><?php _e( 'Tags:', 'og-compliance-center' ); ?></strong>
                            <?php the_tags( '', ', ', '' ); ?>
                        </div>
                    <?php endif; ?>
                </div>
            </footer>
            
        </article>
        
        <!-- Post Navigation -->
        <div class="post-navigation section-sm">
            <div class="container container-narrow">
                <div class="nav-links" style="display: flex; justify-content: space-between; gap: var(--spacing-md);">
                    <div class="nav-previous">
                        <?php previous_post_link( '%link', '← %title' ); ?>
                    </div>
                    <div class="nav-next">
                        <?php next_post_link( '%link', '%title →' ); ?>
                    </div>
                </div>
            </div>
        </div>
        
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

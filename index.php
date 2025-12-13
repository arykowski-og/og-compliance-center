<?php
/**
 * The main template file
 *
 * @package OpenGov_Compliance_Center
 */

get_header();
?>

<main id="main-content" class="site-main">
    
    <?php if ( have_posts() ) : ?>
        
        <div class="container">
            <div class="section">
                
                <?php while ( have_posts() ) : the_post(); ?>
                    
                    <article id="post-<?php the_ID(); ?>" <?php post_class('card mb-4'); ?>>
                        
                        <header class="card-header">
                            <h2 class="card-title">
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_title(); ?>
                                </a>
                            </h2>
                            
                            <div class="entry-meta">
                                <span class="posted-on">
                                    <time datetime="<?php echo get_the_date('c'); ?>">
                                        <?php echo get_the_date(); ?>
                                    </time>
                                </span>
                                <span class="byline">
                                    by <?php the_author(); ?>
                                </span>
                            </div>
                        </header>
                        
                        <?php if ( has_post_thumbnail() ) : ?>
                            <div class="post-thumbnail">
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_post_thumbnail('large'); ?>
                                </a>
                            </div>
                        <?php endif; ?>
                        
                        <div class="card-body">
                            <?php
                            if ( is_single() ) {
                                the_content();
                            } else {
                                the_excerpt();
                            }
                            ?>
                        </div>
                        
                        <?php if ( !is_single() ) : ?>
                            <footer class="card-footer">
                                <a href="<?php the_permalink(); ?>" class="btn btn-secondary btn-sm">
                                    Read More
                                </a>
                            </footer>
                        <?php endif; ?>
                        
                    </article>
                    
                <?php endwhile; ?>
                
                <!-- Pagination -->
                <div class="pagination">
                    <?php
                    the_posts_pagination( array(
                        'mid_size'  => 2,
                        'prev_text' => __( '← Previous', 'og-compliance-center' ),
                        'next_text' => __( 'Next →', 'og-compliance-center' ),
                    ) );
                    ?>
                </div>
                
            </div>
        </div>
        
    <?php else : ?>
        
        <div class="container">
            <div class="section text-center">
                <h1><?php _e( 'Nothing Found', 'og-compliance-center' ); ?></h1>
                <p class="lead">
                    <?php _e( 'It seems we can\'t find what you\'re looking for. Perhaps searching can help.', 'og-compliance-center' ); ?>
                </p>
                <?php get_search_form(); ?>
            </div>
        </div>
        
    <?php endif; ?>
    
</main>

<?php
get_footer();


<?php
/**
 * The front page template
 *
 * @package OpenGov_Compliance_Center
 */

get_header();
?>

<main id="main-content" class="site-main">
    
    <!-- Hero Section -->
    <?php og_compliance_hero_section(); ?>
    
    <!-- Features Section -->
    <section class="section content-section" id="learn-more">
        <div class="container">
            <div class="section-header">
                <span class="section-label"><?php _e( 'Built for Local and State Government', 'og-compliance-center' ); ?></span>
                <h2><?php _e( 'Become more strategic, responsive, resilient, and efficient', 'og-compliance-center' ); ?></h2>
            </div>
            
            <div class="features-grid">
                
                <div class="feature-card">
                    <div class="feature-icon">
                        📋
                    </div>
                    <h3><?php _e( 'Enterprise Asset Management', 'og-compliance-center' ); ?></h3>
                    <p><?php _e( 'Your infrastructure—roads, bridges, water mains, parks, and more—says everything about how your city grows and serves its people.', 'og-compliance-center' ); ?></p>
                    <ul class="feature-list">
                        <li><?php _e( 'Work Order Management', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Asset Lifecycle Tracking', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Infrastructure Planning', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Real-Time GIS Integration', 'og-compliance-center' ); ?></li>
                    </ul>
                    <a href="#" class="btn btn-secondary"><?php _e( 'Learn More', 'og-compliance-center' ); ?></a>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        📝
                    </div>
                    <h3><?php _e( 'Permitting & Licensing', 'og-compliance-center' ); ?></h3>
                    <p><?php _e( 'Permits, licenses, and inspections are where government meets daily life. Cut through the red tape with adaptable AI-enabled software.', 'og-compliance-center' ); ?></p>
                    <ul class="feature-list">
                        <li><?php _e( 'Intuitive Applicant Portal', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Workflow Automation', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Self-Service Tools', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Mobile App for Inspections', 'og-compliance-center' ); ?></li>
                    </ul>
                    <a href="#" class="btn btn-secondary"><?php _e( 'Learn More', 'og-compliance-center' ); ?></a>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        💰
                    </div>
                    <h3><?php _e( 'Budgeting & Performance', 'og-compliance-center' ); ?></h3>
                    <p><?php _e( 'Budgeting isn\'t just numbers—it\'s how governments turn vision into action. Set goals and manage budgets with confidence.', 'og-compliance-center' ); ?></p>
                    <ul class="feature-list">
                        <li><?php _e( 'Performance Management', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Operating Budget', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Capital Planning', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Powerful Analytics', 'og-compliance-center' ); ?></li>
                    </ul>
                    <a href="#" class="btn btn-secondary"><?php _e( 'Learn More', 'og-compliance-center' ); ?></a>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        🛒
                    </div>
                    <h3><?php _e( 'Procurement & Contract Management', 'og-compliance-center' ); ?></h3>
                    <p><?php _e( 'Bring the entire procurement process together with workflow automation and AI built for local and state governments.', 'og-compliance-center' ); ?></p>
                    <ul class="feature-list">
                        <li><?php _e( 'Request Management', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Solicitation Assembly', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Supplier Engagement', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Contract Management', 'og-compliance-center' ); ?></li>
                    </ul>
                    <a href="#" class="btn btn-secondary"><?php _e( 'Learn More', 'og-compliance-center' ); ?></a>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        🏛️
                    </div>
                    <h3><?php _e( 'Tax & Revenue Collection', 'og-compliance-center' ); ?></h3>
                    <p><?php _e( 'Centralize tax billing, filing, and payments in one place to improve collections and reduce administrative headaches.', 'og-compliance-center' ); ?></p>
                    <ul class="feature-list">
                        <li><?php _e( 'Revenue Workflows', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Self-Service Portal', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Dynamic Calculations', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Real-Time Analytics', 'og-compliance-center' ); ?></li>
                    </ul>
                    <a href="#" class="btn btn-secondary"><?php _e( 'Learn More', 'og-compliance-center' ); ?></a>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        💼
                    </div>
                    <h3><?php _e( 'Financial Management', 'og-compliance-center' ); ?></h3>
                    <p><?php _e( 'Modern ERP platform built for local and state governments to operate strategically and manage every dollar with confidence.', 'og-compliance-center' ); ?></p>
                    <ul class="feature-list">
                        <li><?php _e( 'General Ledger', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Accounts Payable', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Digital Workflows', 'og-compliance-center' ); ?></li>
                        <li><?php _e( 'Integrated Spend Controls', 'og-compliance-center' ); ?></li>
                    </ul>
                    <a href="#" class="btn btn-secondary"><?php _e( 'Learn More', 'og-compliance-center' ); ?></a>
                </div>
                
            </div>
        </div>
    </section>
    
    <!-- Benefits Section -->
    <section class="section">
        <div class="container">
            <div class="section-header">
                <span class="section-label"><?php _e( 'Hamstrung by cumbersome processes?', 'og-compliance-center' ); ?></span>
                <h2><?php _e( 'It\'s time to modernize', 'og-compliance-center' ); ?></h2>
                <p class="lead">
                    <?php _e( 'With 4,500+ successful software implementations under our belt, the OpenGov team will ensure you can:', 'og-compliance-center' ); ?>
                </p>
            </div>
            
            <div class="features-grid">
                <div class="card text-center">
                    <div class="card-body">
                        <h3><?php _e( 'Operate Efficiently', 'og-compliance-center' ); ?></h3>
                        <p><?php _e( 'Get more done for your community and department.', 'og-compliance-center' ); ?></p>
                    </div>
                </div>
                
                <div class="card text-center">
                    <div class="card-body">
                        <h3><?php _e( 'Adapt To Change', 'og-compliance-center' ); ?></h3>
                        <p><?php _e( 'Evolve and innovate to meet the changing needs of your constituents.', 'og-compliance-center' ); ?></p>
                    </div>
                </div>
                
                <div class="card text-center">
                    <div class="card-body">
                        <h3><?php _e( 'Strengthen Public Trust', 'og-compliance-center' ); ?></h3>
                        <p><?php _e( 'Build confidence for the good of our communities, country, and society.', 'og-compliance-center' ); ?></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- CTA Section -->
    <section class="section" style="background: var(--og-primary-light);">
        <div class="container text-center">
            <h2><?php _e( 'Start Your Journey to High-Performance Government', 'og-compliance-center' ); ?></h2>
            <p class="lead mb-4">
                <?php _e( 'Discover how OpenGov can transform your organization.', 'og-compliance-center' ); ?>
            </p>
            <a href="#demo" class="btn btn-primary btn-lg">
                <?php _e( 'Request a Demo', 'og-compliance-center' ); ?>
            </a>
        </div>
    </section>
    
</main>

<?php
get_footer();

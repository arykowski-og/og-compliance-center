<?php
/**
 * The front page template - OpenGov Compliance Center
 *
 * @package OpenGov_Compliance_Center
 */

get_header();
?>

<main id="main-content" class="site-main">
    
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <div class="hero-content">
                <h1>OpenGov Compliance Center</h1>
                <p>Your complete guide to local government compliance across all 50 states. Navigate regulatory requirements, understand product capabilities, and operate with confidence.</p>
                
                <div class="hero-actions">
                    <a href="#state-guides" class="btn btn-primary btn-lg">
                        Explore State Guides
                    </a>
                    <a href="#product-centers" class="btn btn-secondary btn-lg">
                        Product Compliance
                    </a>
                </div>
            </div>
        </div>
    </section>
    
    <!-- State Guides Section -->
    <section class="section content-section" id="state-guides">
        <div class="container">
            <div class="section-header">
                <span class="section-label">State-by-State Regulatory Guides</span>
                <h2>Compliance Requirements for All 50 States</h2>
                <p class="lead">
                    Each state has unique requirements for budgeting, procurement, transparency, and financial management. 
                    Explore comprehensive guides tailored to your state's specific regulations.
                </p>
            </div>
            
            <div class="features-grid">
                
                <div class="feature-card">
                    <div class="feature-icon">🗺️</div>
                    <h3>Interactive State Map</h3>
                    <p>Browse all 50 states with our interactive map interface. Click on any state to view its complete compliance requirements.</p>
                    <ul class="feature-list">
                        <li>Visual state selector</li>
                        <li>Quick access to regulations</li>
                        <li>Population and jurisdiction data</li>
                        <li>Regional comparisons</li>
                    </ul>
                    <a href="/states/" class="btn btn-secondary">View State Map</a>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">📋</div>
                    <h3>Budgeting & Planning</h3>
                    <p>State-specific budget calendar rules, public hearing requirements, and GFOA compliance checklists.</p>
                    <ul class="feature-list">
                        <li>Required budget formats</li>
                        <li>Publication requirements</li>
                        <li>CIP transparency mandates</li>
                        <li>Filing deadlines</li>
                    </ul>
                    <a href="/budgeting-requirements/" class="btn btn-secondary">Learn More</a>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">🛒</div>
                    <h3>Procurement & Contracting</h3>
                    <p>Thresholds for bids, required notices, vendor diversity requirements, and ethics rules by state.</p>
                    <ul class="feature-list">
                        <li>Bid thresholds</li>
                        <li>Advertising requirements</li>
                        <li>Contract retention standards</li>
                        <li>Ethics compliance</li>
                    </ul>
                    <a href="/procurement-requirements/" class="btn btn-secondary">Learn More</a>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">💼</div>
                    <h3>Financial Management</h3>
                    <p>State accounting standards, chart of accounts structures, audit requirements, and GASB compliance.</p>
                    <ul class="feature-list">
                        <li>GASB 54 requirements</li>
                        <li>Single Audit thresholds</li>
                        <li>Encumbrance accounting</li>
                        <li>Annual reporting</li>
                    </ul>
                    <a href="/financial-requirements/" class="btn btn-secondary">Learn More</a>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">📊</div>
                    <h3>Reporting & Transparency</h3>
                    <p>Open data mandates, sunshine laws, public notice requirements, and financial statement publication.</p>
                    <ul class="feature-list">
                        <li>Open data requirements</li>
                        <li>Sunshine law compliance</li>
                        <li>Public notice standards</li>
                        <li>Transparency portals</li>
                    </ul>
                    <a href="/transparency-requirements/" class="btn btn-secondary">Learn More</a>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">🏛️</div>
                    <h3>Permitting & Licensing</h3>
                    <p>Land use regulations, inspection requirements, permit posting laws, and fee calculation rules.</p>
                    <ul class="feature-list">
                        <li>Permit requirements</li>
                        <li>Inspection standards</li>
                        <li>Fee structures</li>
                        <li>Appeals processes</li>
                    </ul>
                    <a href="/permitting-requirements/" class="btn btn-secondary">Learn More</a>
                </div>
                
            </div>
        </div>
    </section>
    
    <!-- Product Compliance Centers -->
    <section class="section" id="product-centers">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Product-Aligned Compliance Centers</span>
                <h2>How OpenGov Supports Your Compliance Needs</h2>
                <p class="lead">
                    Understand how OpenGov products align with regulatory requirements across budgeting, 
                    procurement, financial management, and more.
                </p>
            </div>
            
            <div class="features-grid">
                
                <div class="card">
                    <div class="card-header">
                        <div class="feature-icon">💰</div>
                        <h3 class="card-title">Budgeting & Planning</h3>
                    </div>
                    <div class="card-body">
                        <p>Multi-year planning, budget book generation, and performance-based budgeting tools that meet state requirements.</p>
                        <ul class="feature-list">
                            <li>GFOA compliance support</li>
                            <li>Budget vs actual reporting</li>
                            <li>Capital improvement planning</li>
                            <li>What-if scenario modeling</li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <a href="/products/budgeting/" class="btn btn-primary">View Compliance Guide</a>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <div class="feature-icon">🛒</div>
                        <h3 class="card-title">Procurement (PRO)</h3>
                    </div>
                    <div class="card-body">
                        <p>eProcurement, contract management, and vendor portals designed for government compliance.</p>
                        <ul class="feature-list">
                            <li>Bid threshold enforcement</li>
                            <li>RFx management</li>
                            <li>Contract lifecycle tracking</li>
                            <li>Vendor diversity reporting</li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <a href="/products/procurement/" class="btn btn-primary">View Compliance Guide</a>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <div class="feature-icon">💼</div>
                        <h3 class="card-title">Financial Management</h3>
                    </div>
                    <div class="card-body">
                        <p>General ledger, accounts payable, and fund accounting built for GASB compliance.</p>
                        <ul class="feature-list">
                            <li>GASB 54 fund accounting</li>
                            <li>Single Audit support</li>
                            <li>Encumbrance accounting</li>
                            <li>Multi-fund structures</li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <a href="/products/financial/" class="btn btn-primary">View Compliance Guide</a>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <div class="feature-icon">📊</div>
                        <h3 class="card-title">Reporting & Transparency</h3>
                    </div>
                    <div class="card-body">
                        <p>Open data portals, transparency reporting, and public-facing dashboards.</p>
                        <ul class="feature-list">
                            <li>Budget transparency</li>
                            <li>Salary disclosure</li>
                            <li>Contract publication</li>
                            <li>Real-time data access</li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <a href="/products/transparency/" class="btn btn-primary">View Compliance Guide</a>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <div class="feature-icon">🏗️</div>
                        <h3 class="card-title">Community Development</h3>
                    </div>
                    <div class="card-body">
                        <p>Permitting, licensing, and inspection management for regulatory compliance.</p>
                        <ul class="feature-list">
                            <li>Building permit tracking</li>
                            <li>License management</li>
                            <li>Inspection scheduling</li>
                            <li>Code enforcement</li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <a href="/products/community-development/" class="btn btn-primary">View Compliance Guide</a>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <div class="feature-icon">🔧</div>
                        <h3 class="card-title">Asset Management</h3>
                    </div>
                    <div class="card-body">
                        <p>Infrastructure and asset lifecycle management with GASB 34 compliance.</p>
                        <ul class="feature-list">
                            <li>Asset lifecycle reporting</li>
                            <li>Capitalization thresholds</li>
                            <li>GASB 34 compliance</li>
                            <li>Maintenance standards</li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <a href="/products/asset-management/" class="btn btn-primary">View Compliance Guide</a>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
    
    <!-- Resources Section -->
    <section class="section content-section">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Compliance Resources</span>
                <h2>Checklists, Templates & Guides</h2>
            </div>
            
            <div class="features-grid">
                <div class="card text-center">
                    <div class="card-body">
                        <div class="feature-icon" style="margin: 0 auto;">📝</div>
                        <h3>Compliance Checklists</h3>
                        <p>Annual budget compliance, procurement documentation, and audit readiness checklists.</p>
                        <a href="/checklists/" class="btn btn-outline">Download Checklists</a>
                    </div>
                </div>
                
                <div class="card text-center">
                    <div class="card-body">
                        <div class="feature-icon" style="margin: 0 auto;">📰</div>
                        <h3>Regulatory Updates</h3>
                        <p>Stay informed about new statutes, threshold changes, and filing requirements.</p>
                        <a href="/updates/" class="btn btn-outline">View Updates</a>
                    </div>
                </div>
                
                <div class="card text-center">
                    <div class="card-body">
                        <div class="feature-icon" style="margin: 0 auto;">📚</div>
                        <h3>Deep-Dive Analysis</h3>
                        <p>Long-form articles on GASB standards, transparency mandates, and compliance trends.</p>
                        <a href="/insights/" class="btn btn-outline">Read Insights</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- CTA Section -->
    <section class="section" style="background: var(--og-primary-light);">
        <div class="container text-center">
            <h2>Need Help Navigating Compliance Requirements?</h2>
            <p class="lead mb-4">
                Our team of government finance experts can help you understand your state's specific requirements 
                and how OpenGov solutions ensure compliance.
            </p>
            <a href="#contact" class="btn btn-primary btn-lg">
                Contact an Expert
            </a>
        </div>
    </section>
    
</main>

<?php
get_footer();

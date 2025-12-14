<?php
/**
 * Template Name: State Compliance Guide
 * 
 * Individual state compliance guide page with detailed requirements
 *
 * @package OpenGov_Compliance_Center
 */

get_header();

$state_name = 'California';
$state_code = 'CA';
$population = '39 million';

$compliance_requirements = array(
    array(
        'id' => 'gasb-54',
        'title' => 'General Ledger with Fund Accounting (GASB 54)',
        'category' => 'Financial Management',
        'compliance_level' => 'Required',
        'opengov_readiness' => 'Full Support',
        'laws' => array('California Government Code Section 8546.7'),
        'regulations' => array('California State Controller\'s Office requirements'),
        'requirements' => array(
            'GASB 54 fund balance classification required',
            'Chart of accounts prescribed by State Controller',
            'Annual Financial Report to State Controller\'s Office',
            'Modified accrual accounting for governmental funds'
        ),
        'opengov_notes' => 'OpenGov Financials fully supports fund accounting per GASB 54 requirements.',
        'notes' => 'CA requires standardized COA for local governments with State Controller oversight'
    ),
    array(
        'id' => 'single-audit',
        'title' => 'Single Audit Support (A-133/Uniform Guidance)',
        'category' => 'Financial Management',
        'compliance_level' => 'Required',
        'opengov_readiness' => 'Full Support',
        'laws' => array('California Government Code Section 8546.7'),
        'regulations' => array(
            '2 CFR Part 200 (Federal Uniform Guidance)',
            'OMB Compliance Supplement'
        ),
        'requirements' => array(
            'Required for entities expending $750,000+ in federal awards annually',
            'Must comply with federal Single Audit Act requirements',
            'State Controller\'s Office reporting requirements',
            'Schedule of Expenditures of Federal Awards (SEFA) preparation'
        ),
        'opengov_notes' => 'OpenGov Financials supports Single Audit requirements with federal compliance reporting and SEFA generation.',
        'notes' => 'CA has additional state-level single audit requirements beyond federal mandates'
    ),
    array(
        'id' => 'encumbrance',
        'title' => 'Encumbrance Accounting',
        'category' => 'Financial Management',
        'compliance_level' => 'Recommended',
        'opengov_readiness' => 'Full Support',
        'laws' => array(),
        'regulations' => array(),
        'requirements' => array(
            'Encumbrance tracking recommended for budget control',
            'Purchase order commitment tracking',
            'Year-end encumbrance carry-forward',
            'Budget monitoring and variance reporting'
        ),
        'opengov_notes' => 'OpenGov Financials supports encumbrance accounting for budget control.',
        'notes' => 'While not statutorily required in CA, encumbrance accounting is a best practice widely adopted by larger entities'
    )
);
?>

<style>
.state-header {
    background: linear-gradient(135deg, #003D99 0%, #0052CC 100%);
    color: white;
    padding: 3rem 0;
    margin-bottom: 3rem;
}

.state-header h1 {
    color: white;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.state-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    font-size: 2rem;
    font-weight: 700;
    border: 3px solid rgba(255, 255, 255, 0.3);
}

.breadcrumb {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
    opacity: 0.9;
}

.breadcrumb a {
    color: white;
    text-decoration: none;
}

.breadcrumb a:hover {
    text-decoration: underline;
}

.state-meta {
    display: flex;
    gap: 2rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
}

.meta-item {
    display: flex;
    flex-direction: column;
}

.meta-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.8;
    margin-bottom: 0.25rem;
}

.meta-value {
    font-size: 1.125rem;
    font-weight: 600;
}

.content-grid {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
}

.sidebar {
    position: sticky;
    top: 100px;
    height: fit-content;
}

.sidebar-nav {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
}

.sidebar-nav h3 {
    font-size: 1rem;
    margin-bottom: 1rem;
    color: var(--og-gray-700);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.nav-list {
    list-style: none;
    padding: 0;
}

.nav-list li {
    margin-bottom: 0.5rem;
}

.nav-list a {
    display: block;
    padding: 0.5rem 0.75rem;
    color: var(--og-gray-700);
    text-decoration: none;
    border-radius: 6px;
    font-size: 0.875rem;
    transition: all 0.2s ease;
}

.nav-list a:hover, .nav-list a.active {
    background: var(--og-primary-light);
    color: var(--og-primary);
}

.compliance-section {
    margin-bottom: 3rem;
}

.section-title {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--og-dark);
}

.section-intro {
    font-size: 1.125rem;
    line-height: 1.7;
    color: var(--og-gray-700);
    margin-bottom: 2rem;
}

.requirement-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border-left: 4px solid var(--og-primary);
}

.requirement-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.requirement-title {
    font-size: 1.5rem;
    color: var(--og-dark);
    margin-bottom: 0.5rem;
}

.requirement-category {
    font-size: 0.875rem;
    color: var(--og-gray-700);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.requirement-badges {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
}

.badge {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
    white-space: nowrap;
}

.badge-required {
    background: #FFE5E5;
    color: #D32F2F;
}

.badge-recommended {
    background: #FFF4E5;
    color: #FF6B35;
}

.badge-full-support {
    background: #E8F5E9;
    color: #00C853;
}

.badge-partial-support {
    background: #FFF9E5;
    color: #FFB300;
}

.requirement-content {
    display: grid;
    gap: 1.5rem;
}

.content-block {
    padding: 1.25rem;
    background: var(--og-gray-100);
    border-radius: 8px;
}

.content-block h4 {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--og-gray-700);
    margin-bottom: 0.75rem;
}

.content-block ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.content-block li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
    color: var(--og-gray-900);
    line-height: 1.6;
}

.content-block li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--og-primary);
    font-weight: bold;
}

.laws-list li::before {
    content: '§';
}

.opengov-support {
    background: linear-gradient(135deg, #E6F0FF 0%, #E8F5E9 100%);
    padding: 1.5rem;
    border-radius: 8px;
    border: 2px solid var(--og-primary-light);
}

.opengov-support h4 {
    color: var(--og-primary);
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.opengov-support p {
    margin: 0;
    color: var(--og-gray-900);
    line-height: 1.6;
}

.note-box {
    background: #FFF9E5;
    border-left: 4px solid #FFB300;
    padding: 1rem 1.25rem;
    border-radius: 0 8px 8px 0;
    margin-top: 1rem;
}

.note-box strong {
    color: var(--og-dark);
}

.cta-section {
    background: var(--og-primary-light);
    padding: 3rem;
    border-radius: 12px;
    text-align: center;
    margin-top: 3rem;
}

.quick-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.stat-box {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    text-align: center;
}

.stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--og-primary);
    margin-bottom: 0.5rem;
}

.stat-label {
    font-size: 0.875rem;
    color: var(--og-gray-700);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

@media (max-width: 992px) {
    .content-grid {
        grid-template-columns: 1fr;
    }
    
    .sidebar {
        position: static;
    }
}
</style>

<main id="main-content" class="site-main">
    
    <!-- State Header -->
    <section class="state-header">
        <div class="container">
            <div class="breadcrumb">
                <a href="<?php echo home_url('/'); ?>">Home</a> / 
                <a href="<?php echo home_url('/states/'); ?>">State Guides</a> / 
                <span><?php echo $state_name; ?></span>
            </div>
            
            <h1>
                <span class="state-badge"><?php echo $state_code; ?></span>
                <?php echo $state_name; ?> Compliance Guide
            </h1>
            
            <div class="state-meta">
                <div class="meta-item">
                    <div class="meta-label">Population</div>
                    <div class="meta-value"><?php echo $population; ?></div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Last Updated</div>
                    <div class="meta-value">December 2025</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Requirements</div>
                    <div class="meta-value"><?php echo count($compliance_requirements); ?> Active</div>
                </div>
            </div>
        </div>
    </section>
    
    <div class="container">
        
        <!-- Quick Stats -->
        <div class="quick-stats">
            <div class="stat-box">
                <div class="stat-number">3</div>
                <div class="stat-label">Required Compliance Areas</div>
            </div>
            <div class="stat-box">
                <div class="stat-number">100%</div>
                <div class="stat-label">OpenGov Support</div>
            </div>
            <div class="stat-box">
                <div class="stat-number">5+</div>
                <div class="stat-label">State Regulations</div>
            </div>
            <div class="stat-box">
                <div class="stat-number">$750K</div>
                <div class="stat-label">Single Audit Threshold</div>
            </div>
        </div>
        
        <div class="content-grid">
            
            <!-- Sidebar Navigation -->
            <aside class="sidebar">
                <nav class="sidebar-nav">
                    <h3>On This Page</h3>
                    <ul class="nav-list">
                        <li><a href="#overview" class="active">Overview</a></li>
                        <li><a href="#financial-mgmt">Financial Management</a></li>
                        <li><a href="#gasb-54">GASB 54 Fund Accounting</a></li>
                        <li><a href="#single-audit">Single Audit Support</a></li>
                        <li><a href="#encumbrance">Encumbrance Accounting</a></li>
                        <li><a href="#resources">Resources</a></li>
                    </ul>
                </nav>
            </aside>
            
            <!-- Main Content -->
            <div class="main-content">
                
                <!-- Overview Section -->
                <section id="overview" class="compliance-section">
                    <h2 class="section-title">Overview</h2>
                    <p class="section-intro">
                        California has comprehensive local government compliance requirements overseen by the State Controller's Office. 
                        Local governments must adhere to specific accounting standards, reporting requirements, and audit procedures to 
                        maintain transparency and fiscal accountability.
                    </p>
                    <p class="section-intro">
                        This guide covers the key compliance areas for California municipalities, counties, and special districts, 
                        including financial management standards, procurement requirements, and transparency mandates. Each section 
                        includes specific regulations, requirements, and information about OpenGov's support capabilities.
                    </p>
                </section>
                
                <!-- Financial Management Section -->
                <section id="financial-mgmt" class="compliance-section">
                    <h2 class="section-title">Financial Management Requirements</h2>
                    <p class="section-intro">
                        California requires local governments to maintain robust financial management systems that comply with 
                        Governmental Accounting Standards Board (GASB) pronouncements and state-specific regulations. The State 
                        Controller's Office provides oversight and establishes uniform accounting standards.
                    </p>
                    
                    <?php foreach ($compliance_requirements as $req): ?>
                    <div id="<?php echo $req['id']; ?>" class="requirement-card">
                        <div class="requirement-header">
                            <div>
                                <h3 class="requirement-title"><?php echo $req['title']; ?></h3>
                                <div class="requirement-category">
                                    📋 <?php echo $req['category']; ?>
                                </div>
                            </div>
                            <div class="requirement-badges">
                                <span class="badge <?php echo $req['compliance_level'] === 'Required' ? 'badge-required' : 'badge-recommended'; ?>">
                                    <?php echo $req['compliance_level']; ?>
                                </span>
                                <span class="badge <?php echo $req['opengov_readiness'] === 'Full Support' ? 'badge-full-support' : 'badge-partial-support'; ?>">
                                    <?php echo $req['opengov_readiness']; ?>
                                </span>
                            </div>
                        </div>
                        
                        <div class="requirement-content">
                            
                            <?php if (!empty($req['laws'])): ?>
                            <div class="content-block">
                                <h4>📜 Applicable Laws</h4>
                                <ul class="laws-list">
                                    <?php foreach ($req['laws'] as $law): ?>
                                    <li><?php echo $law; ?></li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                            <?php endif; ?>
                            
                            <?php if (!empty($req['regulations'])): ?>
                            <div class="content-block">
                                <h4>📋 Regulations</h4>
                                <ul>
                                    <?php foreach ($req['regulations'] as $regulation): ?>
                                    <li><?php echo $regulation; ?></li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                            <?php endif; ?>
                            
                            <div class="content-block">
                                <h4>✓ Requirements</h4>
                                <ul>
                                    <?php foreach ($req['requirements'] as $requirement): ?>
                                    <li><?php echo $requirement; ?></li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                            
                            <div class="opengov-support">
                                <h4>🚀 OpenGov Support</h4>
                                <p><?php echo $req['opengov_notes']; ?></p>
                            </div>
                            
                            <?php if (!empty($req['notes'])): ?>
                            <div class="note-box">
                                <strong>Note:</strong> <?php echo $req['notes']; ?>
                            </div>
                            <?php endif; ?>
                            
                        </div>
                    </div>
                    <?php endforeach; ?>
                    
                </section>
                
                <!-- Resources Section -->
                <section id="resources" class="compliance-section">
                    <h2 class="section-title">Additional Resources</h2>
                    <div class="features-grid">
                        <div class="card">
                            <div class="card-body">
                                <h3>State Controller's Office</h3>
                                <p>Official guidance and resources from the California State Controller's Office.</p>
                                <a href="https://www.sco.ca.gov/" target="_blank" class="btn btn-outline">Visit Website →</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h3>GASB Standards</h3>
                                <p>Complete documentation of GASB 54 and other relevant accounting standards.</p>
                                <a href="#" class="btn btn-outline">View Standards →</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h3>Compliance Checklist</h3>
                                <p>Download our comprehensive California compliance checklist for your organization.</p>
                                <a href="#" class="btn btn-outline">Download PDF →</a>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- CTA -->
                <div class="cta-section">
                    <h2>Ready to Ensure Compliance?</h2>
                    <p class="lead">
                        Discover how OpenGov solutions help California governments meet all state requirements 
                        while streamlining operations and improving transparency.
                    </p>
                    <a href="#demo" class="btn btn-primary btn-lg">Request a Demo</a>
                    <a href="/contact/" class="btn btn-outline btn-lg">Contact an Expert</a>
                </div>
                
            </div>
            
        </div>
        
    </div>
    
</main>

<?php
get_footer();
?>

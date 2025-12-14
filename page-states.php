<?php
/**
 * Template Name: States Directory
 * 
 * Page template for displaying all 50 states with compliance guides
 *
 * @package OpenGov_Compliance_Center
 */

get_header();

$states = array(
    array('code' => 'AL', 'name' => 'Alabama', 'population' => '5.1M'),
    array('code' => 'AK', 'name' => 'Alaska', 'population' => '700K'),
    array('code' => 'AZ', 'name' => 'Arizona', 'population' => '7.4M'),
    array('code' => 'AR', 'name' => 'Arkansas', 'population' => '3.1M'),
    array('code' => 'CA', 'name' => 'California', 'population' => '39M'),
    array('code' => 'CO', 'name' => 'Colorado', 'population' => '5.8M'),
    array('code' => 'CT', 'name' => 'Connecticut', 'population' => '3.6M'),
    array('code' => 'DE', 'name' => 'Delaware', 'population' => '1M'),
    array('code' => 'FL', 'name' => 'Florida', 'population' => '22M'),
    array('code' => 'GA', 'name' => 'Georgia', 'population' => '11M'),
    array('code' => 'HI', 'name' => 'Hawaii', 'population' => '1.4M'),
    array('code' => 'ID', 'name' => 'Idaho', 'population' => '1.9M'),
    array('code' => 'IL', 'name' => 'Illinois', 'population' => '12.5M'),
    array('code' => 'IN', 'name' => 'Indiana', 'population' => '6.9M'),
    array('code' => 'IA', 'name' => 'Iowa', 'population' => '3.2M'),
    array('code' => 'KS', 'name' => 'Kansas', 'population' => '2.9M'),
    array('code' => 'KY', 'name' => 'Kentucky', 'population' => '4.5M'),
    array('code' => 'LA', 'name' => 'Louisiana', 'population' => '4.6M'),
    array('code' => 'ME', 'name' => 'Maine', 'population' => '1.4M'),
    array('code' => 'MD', 'name' => 'Maryland', 'population' => '6.2M'),
    array('code' => 'MA', 'name' => 'Massachusetts', 'population' => '7M'),
    array('code' => 'MI', 'name' => 'Michigan', 'population' => '10M'),
    array('code' => 'MN', 'name' => 'Minnesota', 'population' => '5.7M'),
    array('code' => 'MS', 'name' => 'Mississippi', 'population' => '2.9M'),
    array('code' => 'MO', 'name' => 'Missouri', 'population' => '6.2M'),
    array('code' => 'MT', 'name' => 'Montana', 'population' => '1.1M'),
    array('code' => 'NE', 'name' => 'Nebraska', 'population' => '2M'),
    array('code' => 'NV', 'name' => 'Nevada', 'population' => '3.2M'),
    array('code' => 'NH', 'name' => 'New Hampshire', 'population' => '1.4M'),
    array('code' => 'NJ', 'name' => 'New Jersey', 'population' => '9.3M'),
    array('code' => 'NM', 'name' => 'New Mexico', 'population' => '2.1M'),
    array('code' => 'NY', 'name' => 'New York', 'population' => '19.5M'),
    array('code' => 'NC', 'name' => 'North Carolina', 'population' => '10.7M'),
    array('code' => 'ND', 'name' => 'North Dakota', 'population' => '800K'),
    array('code' => 'OH', 'name' => 'Ohio', 'population' => '11.8M'),
    array('code' => 'OK', 'name' => 'Oklahoma', 'population' => '4.1M'),
    array('code' => 'OR', 'name' => 'Oregon', 'population' => '4.2M'),
    array('code' => 'PA', 'name' => 'Pennsylvania', 'population' => '13M'),
    array('code' => 'RI', 'name' => 'Rhode Island', 'population' => '1.1M'),
    array('code' => 'SC', 'name' => 'South Carolina', 'population' => '5.4M'),
    array('code' => 'SD', 'name' => 'South Dakota', 'population' => '900K'),
    array('code' => 'TN', 'name' => 'Tennessee', 'population' => '7.1M'),
    array('code' => 'TX', 'name' => 'Texas', 'population' => '30M'),
    array('code' => 'UT', 'name' => 'Utah', 'population' => '3.4M'),
    array('code' => 'VT', 'name' => 'Vermont', 'population' => '600K'),
    array('code' => 'VA', 'name' => 'Virginia', 'population' => '8.7M'),
    array('code' => 'WA', 'name' => 'Washington', 'population' => '7.8M'),
    array('code' => 'WV', 'name' => 'West Virginia', 'population' => '1.8M'),
    array('code' => 'WI', 'name' => 'Wisconsin', 'population' => '5.9M'),
    array('code' => 'WY', 'name' => 'Wyoming', 'population' => '600K'),
);
?>

<style>
.states-hero {
    background: linear-gradient(135deg, #003D99 0%, #0052CC 100%);
    color: white;
    padding: 4rem 0;
    margin-bottom: 3rem;
}

.states-hero h1 {
    color: white;
    margin-bottom: 1rem;
}

.search-bar {
    max-width: 600px;
    margin: 2rem auto 0;
    position: relative;
}

.search-bar input {
    width: 100%;
    padding: 1rem 3rem 1rem 1.5rem;
    font-size: 1.125rem;
    border: none;
    border-radius: 50px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.search-bar input:focus {
    outline: 2px solid var(--og-secondary);
}

.search-icon {
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--og-gray-500);
    font-size: 1.25rem;
}

.states-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 3rem;
}

.state-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    display: block;
    border: 2px solid transparent;
}

.state-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
    border-color: var(--og-primary);
}

.state-card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.state-icon {
    width: 60px;
    height: 60px;
    background: var(--og-primary-light);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--og-primary);
    flex-shrink: 0;
}

.state-info {
    flex: 1;
}

.state-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--og-dark);
    margin-bottom: 0.25rem;
}

.state-population {
    font-size: 0.875rem;
    color: var(--og-gray-500);
}

.state-card-body {
    border-top: 1px solid var(--og-gray-300);
    padding-top: 1rem;
}

.state-requirements {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.requirement-tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    background: var(--og-gray-100);
    color: var(--og-gray-700);
    border-radius: 12px;
    font-weight: 500;
}

.view-details {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--og-primary);
    font-weight: 600;
    font-size: 0.875rem;
    margin-top: 1rem;
}

.view-details:hover {
    color: var(--og-primary-dark);
}

.filters-bar {
    background: var(--og-gray-100);
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
}

.filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
}

.filter-btn {
    padding: 0.5rem 1.25rem;
    background: white;
    border: 2px solid var(--og-gray-300);
    border-radius: 50px;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--og-gray-700);
    cursor: pointer;
    transition: all 0.2s ease;
}

.filter-btn:hover, .filter-btn.active {
    background: var(--og-primary);
    color: white;
    border-color: var(--og-primary);
}

.stats-bar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    text-align: center;
}

.stat-value {
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

@media (max-width: 768px) {
    .states-grid {
        grid-template-columns: 1fr;
    }
    
    .stats-bar {
        grid-template-columns: 1fr;
    }
}
</style>

<main id="main-content" class="site-main">
    
    <!-- Hero Section -->
    <section class="states-hero">
        <div class="container text-center">
            <h1>State Compliance Guides</h1>
            <p class="lead" style="opacity: 0.95;">
                Navigate regulatory requirements for all 50 states. Each guide includes budgeting rules, 
                procurement thresholds, financial management standards, and transparency requirements.
            </p>
            
            <div class="search-bar">
                <input 
                    type="text" 
                    id="state-search" 
                    placeholder="Search for a state..."
                    autocomplete="off"
                >
                <span class="search-icon">🔍</span>
            </div>
        </div>
    </section>
    
    <div class="container">
        
        <!-- Statistics -->
        <div class="stats-bar">
            <div class="stat-card">
                <div class="stat-value">50</div>
                <div class="stat-label">State Guides</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">200+</div>
                <div class="stat-label">Compliance Areas</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">500+</div>
                <div class="stat-label">Regulations Tracked</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">Daily</div>
                <div class="stat-label">Updates</div>
            </div>
        </div>
        
        <!-- Filters -->
        <div class="filters-bar">
            <div class="filter-buttons">
                <button class="filter-btn active" data-filter="all">All States</button>
                <button class="filter-btn" data-filter="northeast">Northeast</button>
                <button class="filter-btn" data-filter="southeast">Southeast</button>
                <button class="filter-btn" data-filter="midwest">Midwest</button>
                <button class="filter-btn" data-filter="southwest">Southwest</button>
                <button class="filter-btn" data-filter="west">West</button>
            </div>
        </div>
        
        <!-- States Grid -->
        <div class="states-grid" id="states-grid">
            <?php foreach ($states as $state): ?>
                <a href="/state/<?php echo strtolower($state['code']); ?>/" class="state-card" data-state="<?php echo $state['name']; ?>">
                    <div class="state-card-header">
                        <div class="state-icon">
                            <?php echo $state['code']; ?>
                        </div>
                        <div class="state-info">
                            <div class="state-name"><?php echo $state['name']; ?></div>
                            <div class="state-population">Population: <?php echo $state['population']; ?></div>
                        </div>
                    </div>
                    <div class="state-card-body">
                        <div class="state-requirements">
                            <span class="requirement-tag">Budgeting</span>
                            <span class="requirement-tag">Procurement</span>
                            <span class="requirement-tag">Financial Mgmt</span>
                            <span class="requirement-tag">Transparency</span>
                        </div>
                        <div class="view-details">
                            View Compliance Guide →
                        </div>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
        
        <!-- CTA Section -->
        <section class="section text-center">
            <div style="background: var(--og-primary-light); padding: 3rem; border-radius: 12px;">
                <h2>Need Help Understanding State Requirements?</h2>
                <p class="lead">
                    Our government compliance experts can guide you through your state's specific regulations.
                </p>
                <a href="#contact" class="btn btn-primary btn-lg">
                    Contact an Expert
                </a>
            </div>
        </section>
        
    </div>
    
</main>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('state-search');
    const stateCards = document.querySelectorAll('.state-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        stateCards.forEach(card => {
            const stateName = card.dataset.state.toLowerCase();
            if (stateName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            if (filter === 'all') {
                stateCards.forEach(card => card.style.display = 'block');
            } else {
                stateCards.forEach(card => card.style.display = 'block');
            }
        });
    });
});
</script>

<?php
get_footer();
?>

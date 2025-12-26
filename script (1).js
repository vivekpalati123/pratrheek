document.addEventListener('DOMContentLoaded', () => {
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logout-btn');
    const contentDisplay = document.getElementById('content-display');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentUser = {};

    // --- Content Data Structure (Centralized Data Source) ---
    const contentData = {
        roles: {
            Admin: {
                icon: '⚙️', title: 'Administrator: Platform Oversight',
                intro: 'As the **Admin**, your duty is the **integrity and security** of the entire platform. You are the ultimate gatekeeper of constitutional accuracy and user data.',
                responsibilities: ['Vetting and approving all new content.', 'Managing user roles and permissions.', 'Monitoring system performance and security.', 'Conducting periodic data accuracy audits.'],
                features: [{ title: 'User Management', desc: 'Control user accounts and assign roles.' }, { title: 'Content Vetting Queue', desc: 'Review and approve all submitted educational materials.' }]
            },
            Educator: {
                icon: '📚', title: 'Educator: Content & Engagement',
                intro: 'As an **Educator**, you create engaging, simplified learning modules to make the Constitution **accessible to everyone**.',
                responsibilities: [ 'Designing interactive quizzes and assessments.', 'Developing multimedia lessons on governance.', 'Conducting live virtual sessions for clarification.', 'Moderating educational discussions.'],
                features: [{ title: 'Lesson Builder', desc: 'Tool for structuring articles, videos, and quizzes into courses.' }, { title: 'Session Scheduler', desc: 'Organize and promote live teaching sessions.' }]
            },
            Citizen: {
                icon: '🧑‍🤝‍🧑', title: 'Citizen: Explore & Participate',
                intro: 'As a **Citizen**, your role is to explore the Constitution, **understand your rights and duties**, and participate in informed civic discussions.',
                responsibilities: ['Utilizing the Rights Explorer tool (Part III).', 'Engaging in forums to discuss responsibilities and duties.', 'Taking quizzes to test constitutional knowledge.', 'Submitting feedback on content clarity.'],
                features: [{ title: 'Rights Explorer', desc: 'Interactive guide to Fundamental Rights and Directive Principles.' }, { title: 'Civic Discussion Forum', desc: 'Area to connect with others and debate constitutional topics.' }]
            },
            LegalExpert: {
                icon: '⚖️', title: 'Legal Expert: Authority & Updates',
                intro: 'As a **Legal Expert**, you provide **authoritative guidance**, ensure content is legally accurate, and track constitutional amendments.',
                responsibilities: ['Reviewing all articles for legal precision.', 'Maintaining a database of amendments and judgments.', 'Providing advanced legal insights and answering complex queries.', 'Drafting explanatory notes for challenging articles.'],
                features: [{ title: 'Amendment Tracker', desc: 'Detailed log of all Constitutional Amendment Acts.' }, { title: 'Legal Q&A Portal', desc: 'Dedicated section for handling expert-level constitutional questions.' }]
            }
        },
        // --- General Sections ---
        resources: [
            { id: 1, title: 'Full Text of the Constitution', type: 'PDF', link: '#' },
            { id: 2, title: 'Landmark Judgments (Kesavananda Bharati)', type: 'Case Study', link: '#' },
            { id: 3, title: 'List of Fundamental Duties (Article 51-A)', type: 'Checklist', link: '#' }
        ],
        discussions: [
            { id: 101, title: 'Debate: Should Voting be a Fundamental Duty?', author: 'Citizen', replies: 15 },
            { id: 102, title: 'Query: Interpretation of Article 21', author: 'Legal Expert', replies: 5 },
            { id: 103, title: 'Feedback: Clarity on Preamble', author: 'Educator', replies: 8 }
        ]
    };

    // --- Dynamic Content Generation Functions ---

    /** Renders the Home/Role-specific dashboard content. */
    function renderHomeContent(roleKey) {
        const data = contentData.roles[roleKey];
        if (!data) return;

        let html = `
            <h2>${data.icon} ${data.title}</h2>
            <p class="role-intro">${data.intro}</p>
            
            <div class="role-card-grid">
                <div class="role-detail-card" style="border-left-color:rgb(124, 0, 0);">
                    <h3>Core Responsibilities</h3>
                    <ul>
        `;
        data.responsibilities.forEach(r => { html += `<li>${r}</li>`; });
        html += `
                    </ul>
                </div>
                
                <div class="role-detail-card" style="border-left-color: var(--secondary-color);">
                    <h3>Key Platform Features</h3>
                    <ul>
        `;
        data.features.forEach(f => { html += `<li><strong>${f.title}:</strong> ${f.desc}</li>`; });
        html += `
                    </ul>
                </div>
            </div>
        `;
        contentDisplay.innerHTML = html;
        contentDisplay.classList.add('content-display');
    }

    /** Renders the Resources section content. */
    function renderResourcesContent() {
        let html = '<h2>📝 Resources & Documents</h2><p>Access the core documents, landmark case studies, and essential learning materials.</p><div class="resource-list">';
        
        contentData.resources.forEach(item => {
            html += `
                <div class="resource-item card-shadow">
                    <h4>${item.title}</h4>
                    <p>Type: <strong>${item.type}</strong></p>
                    <a href="${item.link}" target="_blank">View Document (Simulated Link) →</a>
                </div>
            `;
        });
        
        html += '</div>';
        contentDisplay.innerHTML = html;
        contentDisplay.classList.add('content-display');
    }

    /** Renders the Discussions section content. */
    function renderDiscussionsContent() {
        let html = '<h2>💬 Discussions Forum</h2><p>Engage in civic dialogue, ask questions, and share insights with the community.</p>';

        contentData.discussions.forEach(topic => {
            html += `
                <div class="discussion-topic card-shadow">
                    <h4>${topic.title}</h4>
                    <p>Posted by: ${topic.author} | Replies: ${topic.replies}</p>
                </div>
            `;
        });
        
        contentDisplay.innerHTML = html;
        contentDisplay.classList.add('content-display');
    }

    /** Renders content for role-specific management links (Admin, Educator, Expert). */
    function renderRoleManagementContent(section) {
        let role;
        if (section === 'admin') role = contentData.roles.Admin;
        if (section === 'educator') role = contentData.roles.Educator;
        if (section === 'expert') role = contentData.roles.LegalExpert;

        contentDisplay.innerHTML = `
            <h2>${role.icon} ${role.features[0].title}</h2>
            <p class="role-intro">Welcome to your dedicated management area. This is where you perform critical tasks such as:</p>
            <div class="role-detail-card card-shadow" style="border-left-color: var(--accent-color);">
                <h3>Core Task: ${role.features[0].title}</h3>
                <p>${role.features[0].desc}</p>
                <button class="cta-button" style="width: auto; padding: 10px 20px; background-color: var(--primary-color);">Go to ${role.features[0].title} Interface</button>
            </div>
            <div class="role-detail-card card-shadow" style="border-left-color: #17a2b8; margin-top: 20px;">
                <h3>Core Task: ${role.features[1].title}</h3>
                <p>${role.features[1].desc}</p>
                <button class="cta-button" style="width: auto; padding: 10px 20px; background-color: var(--primary-color);">Go to ${role.features[1].title} Interface</button>
            </div>
        `;
        contentDisplay.classList.add('content-display');
    }


    // --- Event Handlers ---

    // 1. Handle Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const usernameInput = document.getElementById('username').value.trim();
        const roleInput = document.getElementById('role').value;
        const roleData = contentData.roles[roleInput];

        if (usernameInput && roleInput) {
            currentUser = { name: usernameInput, role: roleInput };

            // Update Dashboard UI
            document.getElementById('username-display').textContent = currentUser.name;
            document.getElementById('user-role-display').textContent = currentUser.role;
            document.getElementById('user-role-icon').textContent = roleData.icon;

            // Show/Hide Role-specific navigation links using the data-section attributes
            document.querySelectorAll('.role-admin, .role-expert, .role-educator').forEach(link => {
                link.style.display = 'none';
            });
            const specificLink = document.querySelector(`.role-${roleInput.toLowerCase()}`);
            if (specificLink) specificLink.style.display = 'block';

            // Switch view
            loginView.classList.remove('active-view');
            dashboardView.classList.add('active-view');
            
            // Render default Home content
            renderHomeContent(currentUser.role);
            // Ensure Home link is active
            document.querySelector('[data-section="home"]').classList.add('active');
        }
    });

    // 2. Handle Logout
    logoutBtn.addEventListener('click', () => {
        currentUser = {}; 
        loginForm.reset(); 
        
        // Switch view back to Login with animation class
        loginView.classList.add('active-view');
        dashboardView.classList.remove('active-view');
        loginView.querySelector('.login-container').classList.add('animated-entry');
        setTimeout(() => {
             loginView.querySelector('.login-container').classList.remove('animated-entry');
        }, 800);
    });

    // 3. Handle Navigation Clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active link class
            navLinks.forEach(nav => nav.classList.remove('active'));
            e.currentTarget.classList.add('active');

            const section = e.currentTarget.getAttribute('data-section');

            // Handle content display based on section
            // Remove animation class before updating to re-trigger on update
            contentDisplay.classList.remove('content-display'); 

            setTimeout(() => {
                if (section === 'home') {
                    renderHomeContent(currentUser.role);
                } else if (section === 'resources') {
                    renderResourcesContent();
                } else if (section === 'discussions') {
                    renderDiscussionsContent();
                } else if (section === 'admin' || section === 'educator' || section === 'expert') {
                    renderRoleManagementContent(section);
                }
            }, 50); // Small delay to allow CSS transition on the previous state
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    initCommonUI();
    initPageTransitions(); // <-- THÊM DÒNG NÀY VÀO ĐÂY

    // Nhận diện trang (Giữ nguyên đoạn code cũ của bạn)
    if (document.getElementById('stages-grid')) {
        renderHomepageStages();
    } else if (document.getElementById('mindmap-container')) {
        const currentPath = window.location.pathname;
        const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
        const match = filename.match(/\d+/);
        if (match) {
            renderStagePage(match[0]);
        }
    }
});

// --- UI CHUNG ---
// --- KHỞI TẠO CÁC CHỨC NĂNG GIAO DIỆN CHUNG ---
function initCommonUI() {
    // 1. Logic bật/tắt thanh Menu (Sidebar)
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        // Dùng thuộc tính onclick để đảm bảo không bị lặp sự kiện
        menuToggle.onclick = function(e) {
            e.stopPropagation(); // Ngăn sự kiện click bị ảnh hưởng bởi các khối khác
            sidebar.classList.toggle('active');
        };
        
        // 2. Logic nâng cao: Bấm ra ngoài khoảng trống thì tự động đóng Menu
        document.addEventListener('click', function(e) {
            // Nếu menu đang mở, và vị trí click không nằm trong menu, cũng không phải là nút toggle
            if (sidebar.classList.contains('active')) {
                if (!sidebar.contains(e.target) && e.target !== menuToggle) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }

    const darkModeBtn = document.getElementById('btn-darkmode');
    if (darkModeBtn) {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            darkModeBtn.innerText = '☀️ Light Mode';
        }
        darkModeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            darkModeBtn.innerText = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        });
    }

    const bttBtn = document.getElementById('btn-btt');
    if (bttBtn) {
        window.addEventListener('scroll', () => bttBtn.style.display = window.scrollY > 300 ? 'block' : 'none');
        bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navItems.forEach(item => {
        if (item.getAttribute('href').includes(currentPage)) item.classList.add('active');
    });
}

// --- LOGIC TRANG DANH SÁCH (DẠNG LƯỚI - GRID) ---
function renderHomepageStages() {
    const gridContainer = document.getElementById('stages-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = ''; // Làm sạch lưới trước khi chèn dữ liệu

    Object.keys(journeyData).forEach(key => {
        const data = journeyData[key];
        
        // Tạo cấu trúc thẻ sự kiện liên kết trực tiếp đến thư mục pages/
        const cardHtml = `
            <div class="gallery-card" onclick="window.location.href='pages/chang-${key}.html'">
                <div class="g-card-header">
                    <div class="g-card-num">${key}</div>
                    <div class="g-card-year">${data.year} - ${data.country}</div>
                </div>
                <div class="g-card-desc">${data.question}</div>
            </div>
        `;
        gridContainer.insertAdjacentHTML('beforeend', cardHtml);
    });
}

// --- LOGIC TRANG CHI TIẾT CHẶNG (MINDMAP TƯ DUY) ---
function renderStagePage(id) {
    const data = journeyData[id];
    if (!data) return;

    document.getElementById('stage-title').innerText = data.title;

    const mindmap = document.getElementById('mindmap-container');
    if (!mindmap) return;
    mindmap.innerHTML = '';

    const centerNode = document.createElement('div');
    centerNode.className = 'mm-node center';
    
    // 1. Chèn Nút Gợi Ý CHUNG lên TRÊN ô Câu hỏi
    centerNode.innerHTML = `
        <button id="global-suggest-btn" class="btn-suggest-ans" style="margin-bottom: 20px;">💡 Gợi Ý Đáp Án</button>
        <p style="font-size: 1.1rem; font-weight: bold; color: var(--primary-gold);">CÂU HỎI ÔN TẬP:</p>
        <p style="margin-top: 10px;">${data.question}</p>
    `;
    mindmap.appendChild(centerNode);

    // 2. Tạo 3 nhánh đáp án, nhưng mặc định THÊM class 'hidden-branch' để ẩn đi
    const positions = ['tl', 'tr', 'bottom-center'];
    const branchNodes = [];
    data.answers.forEach((ans, idx) => {
        const node = document.createElement('div');
        node.className = `mm-node branch hidden-branch ${positions[idx]}`;
        node.id = `node-${idx}`;
        
        // Đáp án được ghi đầy đủ sẵn bên trong, không có nút nhỏ nữa
        node.innerHTML = `
            <strong>${ans.title}</strong>
            <div class="mm-desc">${ans.desc}</div>
        `;
        
        mindmap.appendChild(node);
        branchNodes.push(node);
    });

    // 3. Lắng nghe sự kiện BẬT / TẮT toàn bộ đáp án
    const suggestBtn = document.getElementById('global-suggest-btn');
    suggestBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = suggestBtn.classList.contains('is-open');
        
        if (!isOpen) {
            // TRẠNG THÁI MỞ: Hiện nhánh, đổi nút, vẽ dây nối
            suggestBtn.innerHTML = '✖ Đóng Đáp Án';
            suggestBtn.classList.add('is-open');
            branchNodes.forEach(n => {
                n.classList.remove('hidden-branch');
                n.classList.add('show-branch');
            });
            // Chờ 150ms cho CSS chạy rồi mới vẽ đường nối SVG
            setTimeout(drawSVGConnections, 150);
        } else {
            // TRẠNG THÁI ĐÓNG: Ẩn nhánh, xóa dây, đổi chữ nút
            suggestBtn.innerHTML = '💡 Gợi Ý Đáp Án';
            suggestBtn.classList.remove('is-open');
            branchNodes.forEach(n => {
                n.classList.add('hidden-branch');
                n.classList.remove('show-branch');
            });
            const oldSvg = mindmap.querySelector('.mm-svg');
            if (oldSvg) oldSvg.remove();
        }
    });

    if (window.innerWidth > 1200) {
        window.addEventListener('resize', drawSVGConnections);
    }

    // Các nút điều hướng dưới cùng...
    const prevId = parseInt(id) - 1;
    const nextId = parseInt(id) + 1;
    const prevBtn = document.getElementById('nav-prev');
    const nextBtn = document.getElementById('nav-next');

    if (prevId >= 1) { 
        if(prevBtn) { prevBtn.href = `chang-${prevId}.html`; prevBtn.innerText = `⬅ Chặng ${prevId}`; prevBtn.style.display = 'block'; } 
    } else { 
        if(prevBtn) prevBtn.style.display = 'none'; 
    }
    
    if (nextId <= 9) { 
        if(nextBtn) { nextBtn.href = `chang-${nextId}.html`; nextBtn.innerText = `Chặng ${nextId} ➡`; nextBtn.style.display = 'block'; } 
    } else { 
        if(nextBtn) nextBtn.style.display = 'none'; 
    }
}

// CẬP NHẬT HÀM VẼ DÂY NỐI TƯƠNG THÍCH
function drawSVGConnections() {
    const container = document.getElementById('mindmap-container');
    if (!container) return;
    
    const oldSvg = container.querySelector('.mm-svg');
    if (oldSvg) oldSvg.remove();

    // KIỂM TRA MỚI: Nếu nút đáp án chưa mở thì TUYỆT ĐỐI không vẽ dây nối
    const suggestBtn = document.getElementById('global-suggest-btn');
    if (!suggestBtn || !suggestBtn.classList.contains('is-open')) return;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "mm-svg fade-in-svg");

    const center = container.querySelector('.center');
    const branches = container.querySelectorAll('.branch');
    if(!center || branches.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const centerRect = center.getBoundingClientRect();
    const cx = centerRect.left - containerRect.left + centerRect.width / 2;
    const cy = centerRect.top - containerRect.top + centerRect.height / 2;

    branches.forEach(branch => {
        const rect = branch.getBoundingClientRect();
        const bx = rect.left - containerRect.left + rect.width / 2;
        const by = rect.top - containerRect.top + rect.height / 2;

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", cx);
        line.setAttribute("y1", cy);
        line.setAttribute("x2", bx);
        line.setAttribute("y2", by);
        svg.appendChild(line);
    });

    container.insertBefore(svg, container.firstChild);
}
// --- HIỆU ỨNG CHUYỂN TRANG MƯỢT MÀ TOÀN HỆ THỐNG ---
function initPageTransitions() {
    // 1. Xử lý cho tất cả các thẻ liên kết <a>
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetUrl = this.getAttribute('href');
            
            // Bỏ qua các liên kết rỗng hoặc chuyển hướng trong trang
            if (!targetUrl || targetUrl.startsWith('#') || targetUrl.startsWith('javascript:')) {
                return;
            }

            // --- LOGIC MỚI: KIỂM TRA CHUYỂN QUA LẠI GIỮA CÁC CHẶNG ---
            // Lấy tên file hiện tại và file đích
            const currentPath = window.location.pathname;
            const isCurrentPageStage = currentPath.includes('chang-');
            const isTargetPageStage = targetUrl.includes('chang-');

            // Nếu ĐANG ở trang chặng VÀ BẤM SANG trang chặng khác (ví dụ qua lại Chặng 1, 2)
            // => Bỏ qua hiệu ứng, để trình duyệt nhảy trang ngay lập tức
            if (isCurrentPageStage && isTargetPageStage) {
                return; 
            }
            // ---------------------------------------------------------
            
            e.preventDefault(); // Chặn chuyển trang ngay
            
            document.body.classList.add('transitioning-out'); // Chạy hiệu ứng mờ dần
            
            // Đợi 500ms cho hiệu ứng chạy xong rồi mới chuyển trang
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 100);
        });
    });

    // 2. Xử lý cho thẻ Sự Kiện ở Trang Hành Trình (Vẫn giữ nguyên hiệu ứng mượt)
    const galleryCards = document.querySelectorAll('.gallery-card');
    galleryCards.forEach(card => {
        if (card.hasAttribute('onclick')) {
            const onclickAttr = card.getAttribute('onclick');
            const match = onclickAttr.match(/'([^']+)'/);
            
            if (match && match[1]) {
                const targetUrl = match[1];
                card.removeAttribute('onclick'); 
                
                card.addEventListener('click', function() {
                    document.body.classList.add('transitioning-out');
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 100);
                });
            }
        }
    });
}
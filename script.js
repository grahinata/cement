// --- 基本設定 ---
const itemsPerPage = 9; 
let currentPage = 1;

// --- 1. ページを表示する関数 ---
function displayPage(page) {
    const cards = document.querySelectorAll('.product-card');
    if (cards.length === 0) return;

    const totalPages = Math.ceil(cards.length / itemsPerPage);
    
    // 全カードの表示・非表示を切り替え
    cards.forEach((card, index) => {
        card.style.display = 'none';
        if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
            card.style.display = 'block';
        }
    });

    // 下のボタン表示を更新
    updatePaginationButtons(totalPages, page);
}

// --- 2. ボタンを生成する関数 [source: 8] ---
function updatePaginationButtons(totalPages, activePage) {
    const container = document.getElementById('pagination');
    if (!container) return;
    container.innerHTML = '';

    const createBtn = (label, targetPage, isNav = false) => {
        const btn = document.createElement('button');
        btn.innerHTML = label;
        btn.className = isNav ? 'page-btn nav-btn' : 'page-btn';
        // ボタン生成時に今いるページなら 'active' を追加
        if (targetPage === activePage && !isNav) {
            btn.classList.add('active');
        }
        if (targetPage === activePage && !isNav) btn.classList.add('active');
        
        btn.onclick = () => {
            currentPage = targetPage;
            displayPage(targetPage);
            goToTop();
        };
        return btn;
    };

    // --- 「最初へ」「前へ」の表示条件 ---
    // 1ページ目ではない時だけ、これらのボタンを表示する
    if (activePage > 1) {
        container.appendChild(createBtn('&laquo; 最初', 1, true));
        container.appendChild(createBtn('&lsaquo; 前', activePage - 1, true));
    }

    // --- 数字ボタンの省略ロジック ---
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= activePage - 1 && i <= activePage + 1)) {
            container.appendChild(createBtn(i, i, false));
        } else if (i === activePage - 2 || i === activePage + 2) {
            const dotBtn = document.createElement('button');
            dotBtn.innerHTML = '...';
            dotBtn.className = 'page-btn dot-btn'; 
            dotBtn.title = 'ページを指定して移動';
            
            dotBtn.onclick = () => {
                const target = prompt(`1から${totalPages}までのページ番号を入力してください:`);
                const pageNum = parseInt(target);
                if (pageNum >= 1 && pageNum <= totalPages) {
                    currentPage = pageNum;
                    displayPage(pageNum);
                    goToTop();
                } else if (target) {
                    alert("有効な数字を入力してください");
                }
            };
            container.appendChild(dotBtn);
        }
    }

    // --- 「次へ」「最後へ」の表示条件 ---
    // 最後のページではない時だけ、これらのボタンを表示する
    if (activePage < totalPages) {
        container.appendChild(createBtn('次 &rsaquo;', activePage + 1, true));
        container.appendChild(createBtn('最後 &raquo;', totalPages, true));
    }
}

// --- 3. その他の便利機能 [source: 8] ---
function goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 拡大表示：引数にimg要素を直接受け取る
function openModal(imgElement) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    
    // data-full属性があれば高画質JPG、なければWebPを表示
    const fullSizeSrc = imgElement.getAttribute('data-full') || imgElement.src;

    if (modal && modalImg) {
        modal.style.display = "flex";
        modalImg.src = fullSizeSrc;
    }
}

// --- 4. 実行の合図 ---
document.addEventListener('DOMContentLoaded', () => {
    // 最初のページを表示
    displayPage(1); 
    
    // 全ての作品画像に一括でイベントを登録
    document.querySelectorAll('.product-image').forEach(img => {
        img.style.cursor = 'pointer';
        // 要素そのものを渡すように修正
        img.addEventListener('click', () => openModal(img));
    });
});

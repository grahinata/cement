function openTab(evt, tabName) {
    // すべてのコンテンツを非表示にする
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }

    // すべてのタブボタンのactiveクラスを解除
    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    // 指定されたタブを表示し、ボタンをアクティブにする
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");

    // 切り替え時にスムーズに上部へスクロール
    window.scrollTo({ top: 150, behavior: 'smooth' });
}

function openModal(src) {
    console.log("関数開始: src =", src);
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");

    if (!modal || !modalImg) {
        alert("エラー：HTMLの中に 'imageModal' が見つかりません");
        return;
    }

    // 表示を切り替える
    modal.style.display = "flex";
    modalImg.src = src;
}

// 全ての .product-image に対して、クリックしたら拡大する機能を自動付与
document.querySelectorAll('.product-image').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openModal(img.src));
});

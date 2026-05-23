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

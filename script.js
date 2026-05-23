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
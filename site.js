/* ================= 全站設定：兩個頁面共用，改這裡就好 =================
   lineUrl       LINE 官方帳號的加好友連結。留空時，按鈕會改導到 Google 諮詢表單。
   lineBySource  想分平台追蹤時，在 LINE 後台為每個平台各建一條加好友連結填進來，
                 貼文裡的網址後面加 ?src=ig、?src=threads、?src=ad、?src=google。
====================================================================== */
var SITE = {
  lineUrl: "https://lin.ee/Qiiskae",
  // 2026-11-27 在 LINE 後台「加入好友管道」建立，名稱依序是 Instagram、Threads、廣告、Google
  lineBySource: {
    ig: "https://lin.ee/NZdbbbR",
    threads: "https://lin.ee/qmzWGq6",
    ad: "https://lin.ee/YUFuwI3",
    google: "https://lin.ee/SMlXR2P"
  },
  formUrl: "https://forms.gle/gmwgLnp8kNRBtmsq5"
};

(function () {
  var src = new URLSearchParams(location.search).get("src") || "";
  var line = SITE.lineBySource[src] || SITE.lineUrl;

  // 所有諮詢按鈕
  document.querySelectorAll("[data-cta]").forEach(function (a) { a.href = line || SITE.formUrl; });
  if (!line) {
    document.querySelectorAll("[data-cta-text]").forEach(function (s) { s.textContent = "填免費諮詢單"; });
    document.querySelectorAll("[data-step1]").forEach(function (s) { s.textContent = "填諮詢單，再傳三張素顏照"; });
  }

  // 站內連結帶著來源參數走，換頁後仍能分辨平台
  if (src) {
    document.querySelectorAll("a[data-keep-src]").forEach(function (a) {
      var parts = a.getAttribute("href").split("#");
      a.setAttribute("href", parts[0] + "?src=" + encodeURIComponent(src) + (parts[1] ? "#" + parts[1] : ""));
    });
  }

  // 頁首：捲動後加底色
  var head = document.getElementById("head");
  if (head) {
    var onScroll = function () { head.classList.toggle("is-solid", window.scrollY > 24); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // 底部固定列：主視覺按鈕和結尾區塊都不在畫面上時才出現
  var dock = document.getElementById("dock");
  if (dock) {
    var guards = document.querySelectorAll("[data-dock-hide]");
    if (!("IntersectionObserver" in window) || !guards.length) { dock.classList.add("show"); return; }
    var visible = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target); });
      dock.classList.toggle("show", visible.size === 0);
    });
    guards.forEach(function (g) { io.observe(g); });
  }
})();

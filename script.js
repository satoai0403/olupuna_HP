const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const productGrid = document.querySelector("[data-product-grid]");
const contactForm = document.querySelector("[data-contact-form]");
const contactEmail = "satoai0403@gmail.com";

const products = [
  {
    short: "PET",
    title: "ドライブボックス",
    text: "愛犬と安全にドライブできる助手席用シート。丸洗い可能でお手入れ簡単。",
    status: "販売中",
    href: "drive-box.html",
    muted: false
  },
  {
    short: "BABY",
    title: "一升パン背負い袋",
    text: "クリア素材で一升パンが映える背負い袋。1歳のお誕生日祝いに。",
    status: "販売中",
    href: "baby-bag.html",
    muted: false
  },
  {
    short: "LIFE",
    title: "暮らしの道具",
    text: "抹茶碗をはじめ、毎日の時間を心地よくする道具を少しずつ追加予定です。",
    status: "準備中",
    href: "#contact",
    muted: true
  }
];

function renderProducts() {
  if (!productGrid) return;

  productGrid.innerHTML = products.map((item) => `
    <article class="product-card${item.muted ? " is-muted" : ""}">
      <div>
        <div class="product-icon" aria-hidden="true">${item.short}</div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
      <a href="${item.href}" aria-label="${item.title}の詳細を見る">${item.status}</a>
    </article>
  `).join("");
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeMenu() {
  if (!menuButton || !nav) return;

  menuButton.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
}

renderProducts();
updateHeader();

window.addEventListener("scroll", updateHeader, { passive: true });

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      closeMenu();
    }
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const subject = `【olupuna 本店】${formData.get("type")}のお問い合わせ`;
    const body = [
      "olupuna 本店へのお問い合わせ",
      "",
      `お問い合わせ種別: ${formData.get("type")}`,
      `お名前: ${formData.get("name")}`,
      `メールアドレス: ${formData.get("email")}`,
      "",
      "お問い合わせ内容:",
      formData.get("message")
    ].join("\n");

    const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}

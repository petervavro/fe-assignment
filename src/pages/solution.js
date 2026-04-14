import { html, nothing } from "lit-html";
import { loadData } from "../dataLoader.js";
import cartUrl from "../assets/images/cart-white.svg";
import arrowRightUrl from "../assets/images/icon-arrow_right-white_v2.svg";
import heartUrl from "../assets/images/icon-heart-black.svg";
import scaleUrl from "../assets/images/icon-scale-black.svg";
import closeUrl from "../assets/images/icon-close-black.svg";

/**
 * Solution Page
 */

// Star icon
const starIcon = html`<svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
>
    <path
        d="M6.50052 10.4607L2.47747 13L3.54012 8.19325L0 4.94325L4.66558 4.537L6.50052 0L8.33442 4.537L13 4.94325L9.45988 8.19325L10.5225 13L6.50052 10.4607Z"
        fill="currentColor"
    />
</svg>`;

// Phone mask
const PHONE_PREFIX = "+421 ";

const buildPhoneValue = (digits) => {
    const d = digits.slice(0, 9).padEnd(9, "_");
    return PHONE_PREFIX + `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 9)}`;
};

const getPhoneDigits = (value) =>
    value
        .slice(PHONE_PREFIX.length)
        .replace(/[^0-9]/g, "")
        .slice(0, 9);

const phoneCursorPos = (digitCount) => {
    if (digitCount <= 3) return PHONE_PREFIX.length + digitCount;
    if (digitCount <= 6) return PHONE_PREFIX.length + digitCount + 1;
    return PHONE_PREFIX.length + digitCount + 2;
};

const handlePhoneInput = (e) => {
    const input = e.currentTarget;
    const digits = getPhoneDigits(input.value);
    input.value = buildPhoneValue(digits);
    const pos = phoneCursorPos(digits.length);
    input.setSelectionRange(pos, pos);
};

const handlePhoneKeydown = (e) => {
    const input = e.currentTarget;
    if (
        (e.key === "Backspace" || e.key === "Delete") &&
        input.selectionStart <= PHONE_PREFIX.length &&
        input.selectionEnd <= PHONE_PREFIX.length
    ) {
        e.preventDefault();
    }
};

const handlePhoneFocus = (e) => {
    const input = e.currentTarget;
    if (!input.value.startsWith(PHONE_PREFIX)) {
        input.value = buildPhoneValue("");
    }
    const digits = getPhoneDigits(input.value);
    const pos = phoneCursorPos(digits.length);
    setTimeout(() => input.setSelectionRange(pos, pos), 0);
};

// Modal template
const modalTemplate = () => html`
    <div class="c-modal-overlay">
        <div class="c-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button class="c-modal__close" aria-label="Zavrieť">
                <img src="${closeUrl}" alt="" aria-hidden="true" />
            </button>
            <div class="c-modal__header">
                <h2 class="c-modal__title" id="modal-title">
                    Tajná ponuka produktov<br />Dewalt len pre vás
                </h2>
                <span class="c-modal__required">* povinné polia</span>
            </div>
            <form class="c-modal__form" novalidate>
                <div class="c-modal__field">
                    <label class="c-modal__label" for="modal-email"
                        >E-mail <span class="c-modal__required-mark">*</span></label
                    >
                    <input
                        class="c-modal__input"
                        id="modal-email"
                        name="email"
                        type="email"
                        autocomplete="email"
                    />
                </div>
                <div class="c-modal__row">
                    <div class="c-modal__field">
                        <label class="c-modal__label" for="modal-name"
                            >Meno a priezvisko <span class="c-modal__required-mark">*</span></label
                        >
                        <input
                            class="c-modal__input"
                            id="modal-name"
                            name="name"
                            type="text"
                            autocomplete="name"
                        />
                    </div>
                    <div class="c-modal__field">
                        <label class="c-modal__label" for="modal-phone"
                            >Telefónne číslo (mobil)
                            <span class="c-modal__required-mark">*</span></label
                        >
                        <input
                            class="c-modal__input"
                            id="modal-phone"
                            name="phone"
                            type="tel"
                            autocomplete="tel"
                            .value=${buildPhoneValue("")}
                            @input=${handlePhoneInput}
                            @keydown=${handlePhoneKeydown}
                            @focus=${handlePhoneFocus}
                        />
                    </div>
                </div>
                <div class="c-modal__field">
                    <label class="c-modal__label" for="modal-source"
                        >Odkiaľ ste sa o tejto ponuke dozvedeli?
                        <span class="c-modal__required-mark">*</span></label
                    >
                    <div class="c-modal__select-wrap">
                        <select class="c-modal__select" id="modal-source" name="source">
                            <option value="">Vyberte možnosť</option>
                            <option value="web">Priamo z vášho webu</option>
                            <option value="social">Sociálne siete</option>
                            <option value="friend">Od priateľa / kolegu</option>
                            <option value="other">Iné</option>
                        </select>
                    </div>
                </div>
                <div class="c-modal__footer">
                    <button class="c-modal__submit" type="submit">
                        Získať tajnú ponuku
                        <img src="${arrowRightUrl}" alt="" aria-hidden="true" />
                    </button>
                    <p class="c-modal__legal">
                        Odoslaním formuláru súhlasíte<br />so
                        <a class="c-modal__legal-link" href="#">spracovaním osobných údajov</a>
                    </p>
                </div>
            </form>
        </div>
    </div>
`;

// CTA button click handler
const handleCtaClick = () => {
    console.log("CTA button clicked");
    // TODO: open modal
};

// Banner button click handler
const handleBannerClick = () => {
    console.log("Banner button clicked");
    // TODO: Navigate to products or filter
};

// Qty handlers
const getQtyInput = (e) =>
    e.currentTarget
        .closest(".c-solution-product-card__qty")
        .querySelector(".c-solution-product-card__qty-input");

const handleQtyDecrement = (e) => getQtyInput(e).stepDown();
const handleQtyIncrement = (e) => {
    const input = getQtyInput(e);
    input.stepUp();
    const qty = parseInt(input.value, 10);
    if (qty > 10) {
        showNotification(
            `Máte vybraných ${qty} kusov, maximálne povolené množstvo na jednu objednávku je 10 kusov.`,
            "warning"
        );
    }
};

// Notification
const showNotification = (message, type = "success") => {
    let container = document.querySelector(".c-notifications");
    if (!container) {
        container = document.createElement("div");
        container.className = "c-notifications";
        container.setAttribute("aria-live", "polite");
        container.setAttribute("aria-atomic", "false");
        document.body.appendChild(container);
    }

    const notification = document.createElement("div");
    notification.className = `c-notification c-notification--${type}`;
    notification.setAttribute("role", type === "warning" ? "alert" : "status");
    notification.textContent = message;
    container.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("is-hiding");
        notification.addEventListener("animationend", () => notification.remove(), { once: true });
    }, 4000);
};

// Add to cart handler
const handleAddToCart = (e) => {
    const card = e.currentTarget.closest(".c-solution-product-card");
    const input = card.querySelector(".c-solution-product-card__qty-input");
    const qty = parseInt(input.value, 10);

    if (qty > 10) {
        showNotification("Maximálne množstvo na jednu objednávku je 10 kusov.", "warning");
        return;
    }

    const plural = qty === 1 ? "kus" : qty < 5 ? "kusy" : "kusov";
    showNotification(`${qty} ${plural} bolo pridaných do košíka.`, "success");
    input.value = 1;
};

// Product card badge
const productBadge = (badge) => html`
    <span class="c-solution-product-card__badge c-solution-product-card__badge--${badge.type}"
        >${badge.label}</span
    >
`;

// Product card action button
const handleCompare = () => {};
const handleWishlist = () => {};

const productActionBtn = (iconUrl, label, handler) => html`
    <button class="c-solution-product-card__action-btn" aria-label="${label}" @click=${handler}>
        <img src="${iconUrl}" alt="" aria-hidden="true" />
    </button>
`;

// Product card stars
const productStars = (rating, max = 5) => {
    const stars = [];
    for (let i = 1; i <= max; i++) {
        stars.push(
            html`<span class="c-solution-product-card__star ${i <= rating ? "is-filled" : ""}"
                >${starIcon}</span
            >`
        );
    }
    return stars;
};

// Product card
const productCard = (product) => {
    const rating = product.rating ?? 0;
    const currency = product.currency ?? "";
    return html`
        <article class="c-solution-product-card">
            <div class="c-solution-product-card__header">
                ${product.badges?.length
                    ? html`<div class="c-solution-product-card__badges">
                          ${product.badges.map(productBadge)}
                      </div>`
                    : nothing}

                <div class="c-solution-product-card__actions">
                    ${productActionBtn(scaleUrl, "Porovnať produkt", handleCompare)}
                    ${productActionBtn(heartUrl, "Pridať do zoznamu prianí", handleWishlist)}
                </div>
            </div>
            <div class="c-solution-product-card__image-wrap">
                <img
                    class="c-solution-product-card__image"
                    src="${product.imageUrl}"
                    alt="${product.name}"
                    loading="lazy"
                    width="300"
                    height="196"
                />
            </div>

            <div class="c-solution-product-card__body">
                <div class="c-solution-product-card__top">
                    <div class="c-solution-product-card__rating">
                        <div
                            class="c-solution-product-card__stars"
                            aria-label="Hodnotenie: ${rating} z 5 hviezdičiek"
                        >
                            ${productStars(rating)}
                        </div>
                        ${product.reviewCount != null
                            ? html`<span class="c-solution-product-card__review-count"
                                  >(${product.reviewCount})</span
                              >`
                            : nothing}
                    </div>
                    <h3 class="c-solution-product-card__name">${product.name ?? ""}</h3>
                    ${product.sku
                        ? html`<span class="c-solution-product-card__sku" title="${product.sku}"
                              >${product.sku}</span
                          >`
                        : nothing}
                </div>

                <div class="c-solution-product-card__pricing">
                    <div class="c-solution-product-card__prices">
                        ${product.originalPrice != null && currency
                            ? html`<span class="c-solution-product-card__original-price"
                                  >${product.originalPrice} ${currency}</span
                              >`
                            : nothing}
                        ${product.salePrice != null && currency
                            ? html`<span class="c-solution-product-card__sale-price"
                                  >${product.salePrice} ${currency}</span
                              >`
                            : nothing}
                        ${product.priceWithoutVAT != null && currency
                            ? html`<span class="c-solution-product-card__price-vat"
                                  >${product.priceWithoutVAT} ${currency} bez DPH</span
                              >`
                            : nothing}
                    </div>
                </div>

                ${product.stock
                    ? html`<span class="c-solution-product-card__stock">${product.stock}</span>`
                    : nothing}
            </div>

            <div class="c-solution-product-card__cart">
                <div class="c-solution-product-card__qty">
                    <button
                        class="c-solution-product-card__qty-btn c-solution-product-card__qty-btn--minus"
                        aria-label="Znížiť množstvo"
                        @click=${handleQtyDecrement}
                    >
                        −
                    </button>
                    <input
                        class="c-solution-product-card__qty-input"
                        type="number"
                        min="1"
                        max="99"
                        value="1"
                        aria-label="Množstvo"
                    />
                    <button
                        class="c-solution-product-card__qty-btn c-solution-product-card__qty-btn--plus"
                        aria-label="Zvýšiť množstvo"
                        @click=${handleQtyIncrement}
                    >
                        +
                    </button>
                </div>

                <button class="c-solution-product-card__add-to-cart" @click=${handleAddToCart}>
                    <img src="${cartUrl}" width="24" height="23" alt="" aria-hidden="true" />Do
                    košíka
                </button>
            </div>
        </article>
    `;
};

// Solution main banner
const solutionBanner = (banner) => html`
    <div class="c-solution-banner">
        <div class="c-solution-banner__image"></div>
        <div class="c-solution-banner__overlay"></div>
        <div class="c-solution-banner__content">
            <h1 class="c-solution-banner__content__title">${banner.title}</h1>
            <div class="c-solution-banner__content__description">${banner.description}</div>
            <button class="c-solution-banner__content__button" @click=${() => handleBannerClick()}>
                <span class="sb-text">${banner.ctaText}</span>
                <svg
                    class="sb-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.16663 10H15.8333M15.8333 10L9.99996 4.16669M15.8333 10L9.99996 15.8334"
                        stroke="currentColor"
                        stroke-width="1.67"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>
    </div>
`;

// Solution CTA section
const solutionCta = (ctaBanner) => html`
    <div class="c-solution-cta">
        <div
            class="c-solution-cta__image"
            style="${ctaBanner.imageUrl ? `background-image: url('${ctaBanner.imageUrl}')` : ""}"
        ></div>

        <div class="c-solution-cta__overlay"></div>

        <div class="c-solution-cta__content">
            <h2 class="c-solution-cta__content__title">${ctaBanner.title}</h2>

            <div class="c-solution-cta__content__description">${ctaBanner.description}</div>

            <button class="c-solution-cta__content__button" @click=${() => handleCtaClick()}>
                <span class="sc-text">${ctaBanner.ctaText}</span>

                <svg
                    class="sc-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.16663 10H15.8333M15.8333 10L9.99996 4.16669M15.8333 10L9.99996 15.8334"
                        stroke="currentColor"
                        stroke-width="1.67"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>
    </div>
`;

// Category card
const categoryCard = (category) => html`
    <article class="c-solution-category-card">
        <img
            class="c-solution-category-card__image"
            src="${category.imageUrl}"
            alt="${category.name}"
            loading="lazy"
        />
        <div class="c-solution-category-card__overlay"></div>
        <div class="c-solution-category-card__content">
            <h3 class="c-solution-category-card__name">
                <a class="c-solution-category-card__link" href="${category.link}"
                    >${category.name}</a
                >
                ${category.productCount != null
                    ? html`<span class="c-solution-category-card__count"
                          >${category.productCount}</span
                      >`
                    : nothing}
            </h3>
            ${category.subcategories?.length
                ? html`<ul class="c-solution-category-card__subcategories">
                      ${category.subcategories.map(
                          (sub) => html`
                              <li class="c-solution-category-card__subcategory">
                                  <a href="${sub.link}">${sub.name}</a>
                              </li>
                          `
                      )}
                  </ul>`
                : nothing}
            <a class="c-solution-category-card__cta" href="${category.link}">
                ${category.ctaText}
                <img src="${arrowRightUrl}" alt="" aria-hidden="true" />
            </a>
        </div>
    </article>
`;

// Categories section
const solutionCategories = (categories) => html`
    <div class="c-solution-categories">
        <h2 class="c-solution-categories__title">Top kategórie produktov</h2>
        <div class="c-solution-categories__grid">${categories.map(categoryCard)}</div>
    </div>
`;

// Main page template
export const renderSolutionPage = (data) => {
    if (!data) {
        return html`<div class="l-solution">Loading...</div>`;
    }

    console.log("data.banner:\n", data.banner);
    console.log("data.ctaBanner:\n", data.ctaBanner);
    console.log("data.products:\n", data.products);
    console.log("data.categories:\n", data.categories);

    return html`
        <div class="l-solution">
            <div class="l-solution__banner">
                <div class="l-container">
                    ${data.banner ? solutionBanner(data.banner) : nothing}
                </div>
            </div>

            <div class="l-solution__content">
                <div class="l-container is-shorter">
                    <div class="c-solution-content">
                        <div class="c-solution-content__cta">
                            ${data.ctaBanner ? solutionCta(data.ctaBanner) : nothing}
                        </div>

                        <div class="c-solution-content__products">
                            ${data.products?.length ? data.products.map(productCard) : nothing}
                        </div>
                    </div>
                </div>
            </div>

            <div class="l-solution__categories">
                <div class="l-container is-shorter">
                    ${data.categories?.length ? solutionCategories(data.categories) : nothing}
                </div>
            </div>

            ${modalTemplate()}
        </div>
    `;
};

/**
 * Load data and render the solution page
 */
export const loadAndRenderSolutionPage = async () => {
    try {
        const data = await loadData();
        return renderSolutionPage(data);
    } catch (error) {
        return html`<div class="l-solution">Error loading data: ${error.message}</div>`;
    }
};

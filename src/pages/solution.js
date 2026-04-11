import { html } from "lit-html";
import { loadData } from "../dataLoader.js";

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

// CTA button click handler
const handleCtaClick = () => {
    console.log("CTA button clicked");
    // TODO: Implement email form/modal
};

// Banner button click handler
const handleBannerClick = () => {
    console.log("Banner button clicked");
    // TODO: Navigate to products or filter
};

// Product card badge
const productBadge = (badge) => html`
    <span class="c-solution-product-card__badge c-solution-product-card__badge--${badge.type}">${badge.label}</span>
`;

// Product card
const productCard = (product) => html`
    <article class="c-solution-product-card">
        ${product.badges?.length ? html`<div class="c-solution-product-card__badges">${product.badges.map(productBadge)}</div>` : html``}

        <div class="c-solution-product-card__image-wrap">
            <img
                class="c-solution-product-card__image"
                src="https://placehold.co/300x196/f0f0f0/333?text=Dewalt+Pro+700"
                alt="Dewalt Pro 700 Max"
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
                        aria-label="Hodnotenie: 4 z 5 hviezdičiek"
                    >
                        <span class="c-solution-product-card__star is-filled">${starIcon}</span>
                        <span class="c-solution-product-card__star is-filled">${starIcon}</span>
                        <span class="c-solution-product-card__star is-filled">${starIcon}</span>
                        <span class="c-solution-product-card__star is-filled">${starIcon}</span>
                        <span class="c-solution-product-card__star">${starIcon}</span>
                    </div>
                    <span class="c-solution-product-card__review-count">(18)</span>
                </div>
                <h3 class="c-solution-product-card__name">Dewalt Pro 700 Max</h3>
                <span class="c-solution-product-card__sku">DHP453RFE</span>
            </div>

            <div class="c-solution-product-card__bottom">
                <div class="c-solution-product-card__pricing">
                    <div class="c-solution-product-card__prices">
                        <span class="c-solution-product-card__original-price">278 €</span>
                        <span class="c-solution-product-card__sale-price">268,10 €</span>
                        <span class="c-solution-product-card__price-vat">255,70 € bez DPH</span>
                    </div>
                </div>

                <span class="c-solution-product-card__stock">Na sklade viac ako 5ks</span>

                <div class="c-solution-product-card__cart">
                    <div class="c-solution-product-card__qty">
                        <button
                            class="c-solution-product-card__qty-btn"
                            aria-label="Znížiť množstvo"
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
                            class="c-solution-product-card__qty-btn"
                            aria-label="Zvýšiť množstvo"
                        >
                            +
                        </button>
                    </div>

                    <button class="c-solution-product-card__add-to-cart">Do košíka</button>
                </div>
            </div>
        </div>
    </article>
`;

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
        <div class="c-solution-cta__image"></div>

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
                <div class="l-container">${data.banner ? solutionBanner(data.banner) : html``}</div>
            </div>

            <div class="l-solution__content">
                <div class="l-container is-shorter">
                    <div class="c-solution-content">
                        <div class="c-solution-content__cta">
                            ${data.ctaBanner ? solutionCta(data.ctaBanner) : html``}
                        </div>

                        <div class="c-solution-content__products">
                            ${data.products?.length ? productCard(data.products[0]) : html``}
                        </div>
                    </div>
                </div>
            </div>

            <div class="l-solution__categories">
                <div class="l-container">
                    <div class="c-solution-categories"></div>
                </div>
            </div>
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

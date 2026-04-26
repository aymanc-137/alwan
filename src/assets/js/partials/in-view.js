/**
 * Adds `.is-visible` to elements with the `.in-view` class when they enter
 * the viewport, triggering the matching CSS animation. Strips all in-view
 * classes after the animation ends so hover states / other transforms work.
 */

const OBSERVED = new WeakSet();
const PRODUCT_CARD_SELECTOR = 'custom-salla-product-card, salla-product-card';
const PRODUCT_LIST_SELECTOR = 'salla-products-list, salla-products-slider';

let observer = null;

const cleanup = (el) => {
    el.classList.remove('in-view', 'is-visible');
    el.className = el.className
        .split(/\s+/)
        .filter((c) => !c.startsWith('in-view--'))
        .join(' ');
};

const getObserver = () => {
    if (observer || !('IntersectionObserver' in window)) return observer;
    observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                el.classList.add('is-visible');
                el.addEventListener('animationend', () => cleanup(el), { once: true });
                obs.unobserve(el);
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    return observer;
};

const observe = (el) => {
    if (OBSERVED.has(el)) return;
    OBSERVED.add(el);
    const obs = getObserver();
    if (obs) obs.observe(el);
    else el.classList.add('is-visible');
};

const tagProductCard = (card, index) => {
    if (card.classList.contains('in-view') || OBSERVED.has(card)) return;
    card.classList.add('in-view', 'in-view--bounce-up');
    card.style.setProperty('--in-view-delay', `${index * 100}ms`);
    observe(card);
};

const watchProductList = (list) => {
    let counter = 0;
    const tagExisting = () => {
        list.querySelectorAll(PRODUCT_CARD_SELECTOR).forEach((card) => {
            tagProductCard(card, counter++);
        });
    };
    tagExisting();

    const mo = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
            m.addedNodes.forEach((node) => {
                if (node.nodeType !== 1) return;
                if (node.matches?.(PRODUCT_CARD_SELECTOR)) {
                    tagProductCard(node, counter++);
                } else {
                    node.querySelectorAll?.(PRODUCT_CARD_SELECTOR).forEach((card) => {
                        tagProductCard(card, counter++);
                    });
                }
            });
        });
    });
    mo.observe(list, { childList: true, subtree: true });
};

export default function initInViewAnimations(root = document) {
    root.querySelectorAll('.in-view:not(.is-visible)').forEach(observe);
    root.querySelectorAll(PRODUCT_LIST_SELECTOR).forEach(watchProductList);
}

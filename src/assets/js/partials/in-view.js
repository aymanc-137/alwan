/**
 * Observes elements with the `.in-view` class and adds `.is-visible`
 * when they enter the viewport, triggering the matching CSS animation.
 *
 * Re-runnable: calling init again only attaches new (un-observed) elements.
 */

const OBSERVED = new WeakSet();

export default function initInViewAnimations(root = document) {
    const els = root.querySelectorAll('.in-view:not(.is-visible)');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
        els.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    els.forEach((el) => {
        if (OBSERVED.has(el)) return;
        OBSERVED.add(el);
        observer.observe(el);
    });
}

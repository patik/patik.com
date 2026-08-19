/**
 * Injected into every page before app scripts run. Draws a synthetic pointer
 * (Playwright's real cursor is never captured in video), click ripples, section
 * captions, and full-screen title cards.
 */
export const overlayInitScript = `
(() => {
    const CURSOR_SVG = \`<svg width="26" height="30" viewBox="0 0 26 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 2.2 L3 22.6 L8.3 17.6 L11.7 25.6 L15.6 24 L12.2 16.2 L19.4 15.9 Z"
              fill="#101418" stroke="#ffffff" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>\`;

    function install() {
        if (!document.body) {
            requestAnimationFrame(install);
            return;
        }
        if (document.getElementById('demo-overlay-root')) return;

        const style = document.createElement('style');
        style.textContent = \`
            #demo-overlay-root, #demo-overlay-root * { pointer-events: none !important; }
            #demo-overlay-root {
                position: fixed; inset: 0; z-index: 2147483647;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, system-ui, sans-serif;
            }
            #demo-cursor {
                position: absolute; top: 0; left: 0; width: 26px; height: 30px;
                transform: translate3d(-100px, -100px, 0);
                filter: drop-shadow(0 3px 6px rgba(0,0,0,.34));
                will-change: transform;
            }
            #demo-ripple {
                position: absolute; top: 0; left: 0; width: 14px; height: 14px;
                margin: -7px 0 0 -7px; border-radius: 50%;
                background: rgba(16,138,102,.42); border: 2px solid rgba(16,138,102,.95);
                opacity: 0; transform: translate3d(-100px,-100px,0) scale(1);
            }
            @keyframes demo-ripple-pop {
                0%   { opacity: .95; }
                100% { opacity: 0; }
            }
            #demo-caption {
                position: absolute; left: 56px; bottom: 56px; max-width: 720px;
                padding: 16px 26px; border-radius: 16px;
                background: rgba(8, 30, 24, .90);
                box-shadow: 0 18px 50px rgba(0,0,0,.30);
                color: #fff; opacity: 0; transform: translateY(14px);
                transition: opacity .4s ease, transform .4s ease;
            }
            #demo-caption.visible { opacity: 1; transform: translateY(0); }
            #demo-caption .demo-caption-title {
                font-size: 30px; font-weight: 600; letter-spacing: -.015em; line-height: 1.2;
                white-space: nowrap;
            }
            #demo-caption .demo-caption-sub {
                margin-top: 7px; font-size: 17.5px; line-height: 1.42;
                color: rgba(255,255,255,.76); font-weight: 400;
            }
            #demo-caption .demo-caption-sub:empty { display: none; }
            #demo-titlecard {
                position: absolute; inset: 0; display: flex; flex-direction: column;
                align-items: center; justify-content: center; gap: 18px;
                background: #05201a; color: #fff;
                opacity: 0; transition: opacity .6s ease;
            }
            #demo-titlecard.visible { opacity: 1; }
            #demo-titlecard .demo-title-main {
                font-size: 76px; font-weight: 700; letter-spacing: -.035em;
            }
            #demo-titlecard .demo-title-sub {
                font-size: 24px; font-weight: 400; color: rgba(255,255,255,.70);
                letter-spacing: -.005em; text-align: center; max-width: 780px; line-height: 1.45;
            }
            #demo-titlecard .demo-title-rule {
                width: 62px; height: 3px; border-radius: 2px; background: #35c397; margin: 4px 0 2px;
            }
            /* The harness runs offline (real sync would hit rows that only exist
               locally), so the app's own offline banner is expected — hide it here
               since it's a recording artifact, not something a real user would see. */
            [data-testid="sync-status-bar"] { display: none !important; }
        \`;
        document.head.appendChild(style);

        const root = document.createElement('div');
        root.id = 'demo-overlay-root';
        root.innerHTML =
            '<div id="demo-ripple"></div>' +
            '<div id="demo-cursor">' + CURSOR_SVG + '</div>' +
            '<div id="demo-caption"><div class="demo-caption-title"></div><div class="demo-caption-sub"></div></div>' +
            '<div id="demo-titlecard"><div class="demo-title-main"></div><div class="demo-title-rule"></div><div class="demo-title-sub"></div></div>';
        document.body.appendChild(root);

        const cursor = root.querySelector('#demo-cursor');
        const ripple = root.querySelector('#demo-ripple');
        const caption = root.querySelector('#demo-caption');
        const titleCard = root.querySelector('#demo-titlecard');

        let lastX = -100;
        let lastY = -100;

        document.addEventListener(
            'mousemove',
            (event) => {
                lastX = event.clientX;
                lastY = event.clientY;
                cursor.style.transform = 'translate3d(' + lastX + 'px,' + lastY + 'px,0)';
            },
            true,
        );

        document.addEventListener(
            'mousedown',
            () => {
                ripple.style.animation = 'none';
                ripple.style.transform = 'translate3d(' + lastX + 'px,' + lastY + 'px,0) scale(1)';
                void ripple.offsetWidth;
                ripple.style.transition = 'transform .45s cubic-bezier(.2,.7,.3,1)';
                ripple.style.animation = 'demo-ripple-pop .45s ease-out forwards';
                ripple.style.transform = 'translate3d(' + lastX + 'px,' + lastY + 'px,0) scale(3.4)';
            },
            true,
        );

        window.__demo = {
            caption(title, sub) {
                caption.querySelector('.demo-caption-title').textContent = title;
                caption.querySelector('.demo-caption-sub').textContent = sub || '';
                caption.classList.add('visible');
            },
            hideCaption() {
                caption.classList.remove('visible');
            },
            titleCard(main, sub) {
                titleCard.querySelector('.demo-title-main').textContent = main;
                titleCard.querySelector('.demo-title-sub').textContent = sub || '';
                titleCard.classList.add('visible');
            },
            hideTitleCard() {
                titleCard.classList.remove('visible');
            },
            cursorAt() {
                return { x: lastX, y: lastY };
            },
        };
    }

    install();
    document.addEventListener('DOMContentLoaded', install);
})();
`

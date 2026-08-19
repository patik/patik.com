/**
 * Injected into every mobile page before app scripts run. Draws a translucent
 * touch indicator (never a mouse cursor — this is a phone), a tap pulse, a
 * top-anchored caption, and a full-bleed title/end card.
 */
export const overlayMobileInitScript = `
(() => {
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
            /* Translucent circle standing in for a fingertip — visible continuously
               while it moves, not just flashed on tap. Real cursor arrows read as
               obviously wrong on a phone recording. */
            #demo-finger {
                position: absolute; top: 0; left: 0; width: 46px; height: 46px;
                margin: -23px 0 0 -23px; border-radius: 50%;
                background: rgba(53, 195, 151, .24);
                border: 2px solid rgba(30, 150, 110, .85);
                box-shadow: 0 2px 10px rgba(0,0,0,.18);
                transform: translate3d(-200px, -200px, 0) scale(1);
                opacity: 0;
                transition: opacity .2s ease;
                will-change: transform;
            }
            #demo-finger.visible { opacity: 1; }
            #demo-finger.tapping { background: rgba(53, 195, 151, .38); }
            #demo-ripple {
                position: absolute; top: 0; left: 0; width: 46px; height: 46px;
                margin: -23px 0 0 -23px; border-radius: 50%;
                border: 2px solid rgba(30, 150, 110, .9);
                opacity: 0; transform: translate3d(-200px,-200px,0) scale(1);
            }
            @keyframes demo-ripple-pop {
                0%   { opacity: .9; }
                100% { opacity: 0; }
            }
            #demo-caption {
                position: absolute; left: 16px; right: 16px; top: 100px;
                padding: 11px 16px; border-radius: 13px;
                background: rgba(8, 30, 24, .92);
                box-shadow: 0 10px 28px rgba(0,0,0,.28);
                color: #fff; opacity: 0; transform: translateY(-10px);
                transition: opacity .35s ease, transform .35s ease;
                text-align: center;
            }
            #demo-caption.visible { opacity: 1; transform: translateY(0); }
            #demo-caption .demo-caption-title {
                font-size: 17px; font-weight: 600; letter-spacing: -.01em; line-height: 1.3;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
            #demo-titlecard {
                position: absolute; inset: 0; display: flex; flex-direction: column;
                align-items: center; justify-content: center; gap: 20px;
                background: #05201a; color: #fff; padding: 0 24px;
                opacity: 0; transition: opacity .6s ease;
            }
            #demo-titlecard.visible { opacity: 1; }
            #demo-titlecard .demo-title-main {
                font-size: 68px; font-weight: 700; letter-spacing: -.03em; line-height: 1.05;
            }
            #demo-titlecard .demo-title-sub {
                font-size: 26px; font-weight: 400; color: rgba(255,255,255,.72);
                letter-spacing: -.005em; text-align: center; max-width: 330px; line-height: 1.45;
            }
            #demo-titlecard .demo-title-rule {
                width: 64px; height: 4px; border-radius: 2px; background: #35c397; margin: 2px 0;
            }
            /* Harness runs offline (real sync would hit rows that only exist locally),
               so the app's own offline banner is expected — hide it as a recording
               artifact, not something a real user would see. */
            [data-testid="sync-status-bar"] { display: none !important; }
        \`;
        document.head.appendChild(style);

        const root = document.createElement('div');
        root.id = 'demo-overlay-root';
        root.innerHTML =
            '<div id="demo-ripple"></div>' +
            '<div id="demo-finger"></div>' +
            '<div id="demo-caption"><div class="demo-caption-title"></div></div>' +
            '<div id="demo-titlecard"><div class="demo-title-main"></div><div class="demo-title-rule"></div><div class="demo-title-sub"></div></div>';
        document.body.appendChild(root);

        const finger = root.querySelector('#demo-finger');
        const ripple = root.querySelector('#demo-ripple');
        const caption = root.querySelector('#demo-caption');
        const titleCard = root.querySelector('#demo-titlecard');

        let lastX = -200;
        let lastY = -200;

        function moveTo(x, y) {
            lastX = x;
            lastY = y;
            finger.classList.add('visible');
            finger.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
        }

        function pulseAt(x, y) {
            finger.classList.add('tapping');
            setTimeout(() => finger.classList.remove('tapping'), 220);

            ripple.style.animation = 'none';
            ripple.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) scale(1)';
            void ripple.offsetWidth;
            ripple.style.transition = 'transform .5s cubic-bezier(.2,.7,.3,1)';
            ripple.style.animation = 'demo-ripple-pop .5s ease-out forwards';
            ripple.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) scale(2.6)';
        }

        // mousemove drives the glide animation the recorder script fires; touchstart
        // covers the real page.touchscreen.tap() calls used for actual interaction.
        document.addEventListener('mousemove', (event) => moveTo(event.clientX, event.clientY), true);
        document.addEventListener('mousedown', (event) => pulseAt(event.clientX, event.clientY), true);
        document.addEventListener(
            'touchstart',
            (event) => {
                const touch = event.touches[0];
                if (!touch) return;
                moveTo(touch.clientX, touch.clientY);
                pulseAt(touch.clientX, touch.clientY);
            },
            true,
        );

        window.__demo = {
            caption(title) {
                caption.querySelector('.demo-caption-title').textContent = title;
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
        };
    }

    install();
    document.addEventListener('DOMContentLoaded', install);
})();
`

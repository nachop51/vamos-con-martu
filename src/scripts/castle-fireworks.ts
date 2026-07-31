/**
 * Rockets that launch from a castle silhouette and burst into fireworks.
 * Shared by the hero castle and the footer skyline. The .rocket, .trail-dot
 * and .burst elements are created from JS, so their styles live in global.css.
 */

const COLORS = ['#EAD94C', '#FF37A6', '#A9D6E5', '#FF7FC5'];
const ARMS = 12;

interface Options {
	/** fire a volley shortly after load (the hero does; the footer waits for clicks) */
	autoVolley?: boolean;
	/** burst size: base + random spread — smaller for short strips like the footer */
	scale?: [base: number, spread: number];
}

export function wireCastleFireworks(
	layer: HTMLElement | null,
	trigger: HTMLElement | null,
	{ autoVolley = false, scale = [0.7, 0.6] }: Options = {},
) {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (!layer || reduced) {
		trigger?.setAttribute('hidden', '');
		return;
	}
	const [scaleBase, scaleSpread] = scale;

	const burst = (x: number, y: number, color: string) => {
		const b = document.createElement('span');
		b.className = 'burst';
		b.style.cssText = `left:${x}px;top:${y}px;--fw-color:${color};--fw-scale:${scaleBase + Math.random() * scaleSpread}`;
		for (let i = 0; i < ARMS; i++) {
			const arm = document.createElement('i');
			arm.style.transform = `rotate(${(360 / ARMS) * i}deg)`;
			b.appendChild(arm);
		}
		b.addEventListener('animationend', () => b.remove());
		layer.appendChild(b);
	};

	const rocket = () => {
		const w = layer.clientWidth;
		const h = layer.clientHeight;
		// launch from the castle and drift wide so bursts spread across the sky
		const startX = w * (0.4 + Math.random() * 0.2);
		const startY = h - h * (0.16 + Math.random() * 0.06);
		const rise = h * (0.3 + Math.random() * 0.38);
		const driftX = (Math.random() - 0.5) * w * 0.55;
		const color = COLORS[(Math.random() * COLORS.length) | 0];

		// curved flight: the rocket follows this path and the trail redraws it
		const bow = (Math.random() - 0.5) * 140;
		const pathD = `M0 0 Q ${driftX * 0.5 + bow} ${-rise * 0.55} ${driftX} ${-rise}`;

		const r = document.createElement('span');
		r.className = 'rocket';
		r.style.cssText = `left:${startX}px;top:${startY}px;--fw-color:${color};offset-path:path("${pathD}");offset-rotate:auto 90deg`;

		// breadcrumb dust: dots dropped at the rocket's live position, so the
		// trail draws itself along the curve and each dot fades on its own
		const layerBox = layer.getBoundingClientRect();
		const dust = setInterval(() => {
			const box = r.getBoundingClientRect();
			if (!box.width && !box.height) return;
			const d = document.createElement('span');
			d.className = 'trail-dot';
			d.style.cssText = `left:${box.x + box.width / 2 - layerBox.x}px;top:${box.y + box.height / 2 - layerBox.y}px;--fw-color:${color}`;
			d.addEventListener('animationend', () => d.remove());
			layer.appendChild(d);
		}, 40);

		r.addEventListener('animationend', () => {
			clearInterval(dust);
			r.remove();
			burst(startX + driftX, startY - rise, color);
		});
		layer.appendChild(r);
	};

	// 6-10 rockets: some pop almost together, others follow after a beat
	const volley = () => {
		const n = 6 + ((Math.random() * 5) | 0);
		let t = 0;
		for (let i = 0; i < n; i++) {
			setTimeout(rocket, t);
			t += Math.random() < 0.45 ? Math.random() * 120 : 220 + Math.random() * 340;
		}
	};

	if (autoVolley) setTimeout(volley, 900);
	trigger?.addEventListener('click', volley);
}

/**
 * Site-wide constants. Fill in the real values before launch —
 * everything marked TODO is a placeholder.
 */
export const SITE = {
	brand: 'Martu en Disney',
	title: 'Martu en Disney: Viajes grupales acompañados a Disney Orlando',
	description:
		'Viajá a Disney Orlando acompañado por Martu: salidas grupales reducidas, organización sin estrés y acompañamiento de principio a fin. Pedí tu consulta sin compromiso.',
	/** TODO: real domain when purchased */
	url: 'https://martu-en-disney.nachop.workers.dev',
	instagram: 'https://www.instagram.com/pazmartu.m',
	instagramHandle: '@pazmartu.m',
	/** TODO: real WhatsApp number, international format without "+" */
	whatsapp: '59899000000',
	/** TODO: real email */
	email: 'hola@martuendisney.com',
	/** Booking partner — kept internal for now, not shown on the site. */
	partner: 'Jetmar',
} as const;

/** Prefilled WhatsApp messages per CTA. */
export const WA_MESSAGES = {
	general: 'Hola Martu! Quiero saber más sobre los viajes a Disney ✨',
	personalizado: 'Hola Martu! Me interesa el viaje personalizado a Disney. ¿Me contás cómo funciona?',
	grupal: 'Hola Martu! Quiero saber más sobre las salidas grupales a Disney.',
} as const;

export function waLink(message: string = WA_MESSAGES.general): string {
	return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

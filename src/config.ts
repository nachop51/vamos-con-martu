/**
 * Site-wide constants. Fill in the real values before launch —
 * everything marked TODO is a placeholder.
 */
export const SITE = {
	brand: 'Viajá con Martu',
	title: 'Viajá con Martu: Viajes grupales acompañados a Disney Orlando',
	description:
		'Viajá a Disney Orlando acompañado por Martu: salidas grupales reducidas, organización sin estrés y acompañamiento de principio a fin. Pedí tu consulta sin compromiso.',
	url: 'https://viajaconmartu.com',
	instagram: 'https://www.instagram.com/pazmartu.m',
	instagramHandle: '@pazmartu.m',
	/** International format without "+" (+598 98 683 181) */
	whatsapp: '59898683181',
	/** TODO: real email */
	email: 'hola@viajaconmartu.com',
	/** Booking partner — handles flights, hotels and tickets. */
	partner: 'Jetmar',
	/** Next group departure, shown in the services section. */
	nextDeparture: 'Mayo 2027',
} as const;

/** Prefilled WhatsApp messages per CTA. */
export const WA_MESSAGES = {
	general: 'Hola Martu! Quiero saber más sobre los viajes a Disney ✨',
	personalizado:
		'Hola Martu! Ya tengo mi viaje a Disney y me interesa armar un itinerario personalizado. ¿Me contás cómo funciona?',
	grupal: 'Hola Martu! Quiero sumarme a la salida grupal de mayo 2027 ✨',
	siguientes: 'Hola Martu! Quiero consultar por las siguientes salidas grupales a Disney.',
} as const;

export function waLink(message: string = WA_MESSAGES.general): string {
	return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

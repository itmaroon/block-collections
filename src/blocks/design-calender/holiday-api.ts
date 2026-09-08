/* global itmar_option, itmar_calendar_option */
/* eslint-disable camelcase -- WordPress localizes this established global and REST field name. */

export interface HolidayEvent {
	date: string;
	name: string;
}

interface RestErrorBody {
	message?: string;
}

const readResponse = async ( response: Response ): Promise< unknown > => {
	try {
		return await response.json();
	} catch {
		return null;
	}
};

const getErrorMessage = ( data: unknown, fallback: string ): string => {
	if ( data && typeof data === 'object' && 'message' in data ) {
		const message = ( data as RestErrorBody ).message;
		if ( typeof message === 'string' && message !== '' ) {
			return message;
		}
	}
	return fallback;
};

export const fetchJapaneseHolidays = async (
	month: string
): Promise< HolidayEvent[] > => {
	const endpoint = itmar_calendar_option.holidaysUrl;
	if ( typeof endpoint !== 'string' || endpoint === '' ) {
		throw new Error( 'The holiday API endpoint is not configured.' );
	}

	const url = new URL( endpoint, window.location.origin );
	url.searchParams.set( 'month', month.replace( /\//g, '-' ) );
	const response = await fetch( url.toString(), {
		credentials: 'same-origin',
	} );
	const data = await readResponse( response );

	if ( ! response.ok ) {
		throw new Error(
			getErrorMessage(
				data,
				'Holiday information could not be retrieved.'
			)
		);
	}
	if ( ! Array.isArray( data ) ) {
		throw new Error( 'The holiday API returned an invalid response.' );
	}

	return data.filter( ( item ): item is HolidayEvent =>
		Boolean(
			item &&
				typeof item === 'object' &&
				typeof ( item as HolidayEvent ).date === 'string' &&
				typeof ( item as HolidayEvent ).name === 'string'
		)
	);
};

export const saveCalendarApiKey = async ( apiKey: string ): Promise< void > => {
	const endpoint = itmar_calendar_option.saveKeyUrl;
	if ( typeof endpoint !== 'string' || endpoint === '' ) {
		throw new Error( 'The API key storage endpoint is not configured.' );
	}

	const response = await fetch( endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-WP-Nonce': itmar_option.nonce,
		},
		credentials: 'same-origin',
		body: JSON.stringify( { calendar_api_key: apiKey } ),
	} );
	const data = await readResponse( response );
	if ( ! response.ok ) {
		throw new Error(
			getErrorMessage( data, 'The API key could not be saved.' )
		);
	}
};

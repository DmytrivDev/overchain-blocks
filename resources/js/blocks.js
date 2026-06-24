// Accordion
document.querySelectorAll( '[data-accordion-item]' ).forEach( ( item ) => {
	const trigger = item.querySelector( '[data-accordion-trigger]' );
	if ( ! trigger ) return;

	trigger.addEventListener( 'click', () => {
		const isOpen = item.classList.contains( 'is-open' );

		// Закрити всі items в межах одного списку
		const list = item.closest( '.overchain-accordion__list' );
		if ( list ) {
			list.querySelectorAll( '[data-accordion-item]' ).forEach( ( i ) => {
				i.classList.remove( 'is-open' );
			} );
		}

		// Якщо був закритий — відкрити. Якщо був відкритий — залишити закритим
		if ( ! isOpen ) {
			item.classList.add( 'is-open' );
		}
	} );
} );
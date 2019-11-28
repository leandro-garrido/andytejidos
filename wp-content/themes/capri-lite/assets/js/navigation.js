/* global capriScreenReaderText */
/**
 * Theme functions file.
 *
 * Contains handlers for navigation and widget area.
 *
 * @author Themeisle
 * @version 1.1.3
 * @package capri-pro
 */

( function( $ ) {
	var body, masthead, menuToggle, siteNavigation, socialNavigation, siteHeaderMenu, resizeTimer;

	function initMainNavigation( container ) {

		// Add dropdown toggle that displays child menu items.
		var dropdownToggle = $(
			'<button />', {
				'class': 'dropdown-toggle',
				'aria-expanded': false
			}
		).append(
			$(
				'<span />', {
					'class': 'screen-reader-text',
					text: capriScreenReaderText.expand
					}
			)
		);

		container.find( '.menu-item-has-children > a' ).after( dropdownToggle );

		// Toggle buttons and submenu items with active children menu items.
		container.find( '.current-menu-ancestor > button' ).addClass( 'toggled-on' );
		container.find( '.current-menu-ancestor > .sub-menu' ).addClass( 'toggled-on' );

		// Add menu items with submenus to aria-haspopup="true".
		container.find( '.menu-item-has-children' ).attr( 'aria-haspopup', 'true' );

		container.find( '.dropdown-toggle' ).click(
			function( e ) {
					var _this        = $( this ),
					screenReaderSpan = _this.find( '.screen-reader-text' );

					e.preventDefault();
					_this.toggleClass( 'toggled-on' );
					_this.next( '.children, .sub-menu' ).toggleClass( 'toggled-on' );

					// jscs:disable
					_this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
					// jscs:enable
					screenReaderSpan.text( screenReaderSpan.text() === capriScreenReaderText.expand ? capriScreenReaderText.collapse : capriScreenReaderText.expand );
			}
		);
	}
	initMainNavigation( $( '.main-navigation' ) );

	masthead         = $( '#masthead' );
	menuToggle       = masthead.find( '#menu-toggle' );
	siteHeaderMenu   = masthead.find( '#site-header-menu' );
	siteNavigation   = masthead.find( '#site-navigation' );
	socialNavigation = masthead.find( '#social-navigation' );

	// Enable menuToggle.
	( function() {

		// Return early if menuToggle is missing.
		if ( ! menuToggle.length ) {
			return;
		}

		// Add an initial values for the attribute.
		menuToggle.add( siteNavigation ).add( socialNavigation ).attr( 'aria-expanded', 'false' );

		menuToggle.on(
			'click.capri', function() {

				$( this ).add( siteHeaderMenu ).toggleClass( 'toggled-on' );

				// jscs:disable
				$( this ).add( siteNavigation ).add( socialNavigation ).attr( 'aria-expanded', $( this ).add( siteNavigation ).add( socialNavigation ).attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
				// jscs:enable
			}
		);
	} )();

	// Fix sub-menus for touch devices and better focus for hidden submenu items for accessibility.
	( function() {
		if ( ! siteNavigation.length || ! siteNavigation.children().length ) {
			return;
		}

		// Toggle `focus` class to allow submenu access on tablets.
		function toggleFocusClassTouchScreen() {
			if ( window.innerWidth >= 910 ) {
				$( document.body ).on(
					'touchstart.capri', function( e ) {
						if ( ! $( e.target ).closest( '.main-navigation li' ).length ) {
							$( '.main-navigation li' ).removeClass( 'focus' );
						}
					}
				);
				siteNavigation.find( '.menu-item-has-children > a' ).on(
					'touchstart.capri', function( e ) {
						var el = $( this ).parent( 'li' );

						if ( ! el.hasClass( 'focus' ) ) {
							e.preventDefault();
							el.toggleClass( 'focus' );
							el.siblings( '.focus' ).removeClass( 'focus' );
						}
					}
				);
			} else {
				siteNavigation.find( '.menu-item-has-children > a' ).unbind( 'touchstart.capri' );
			}
		}

		if ( 'ontouchstart' in window ) {
			$( window ).on( 'resize.capri', toggleFocusClassTouchScreen );
			toggleFocusClassTouchScreen();
		}

		siteNavigation.find( 'a' ).on(
			'focus.capri blur.capri', function() {
				$( this ).parents( '.menu-item' ).toggleClass( 'focus' );
			}
		);
	} )();

	// Add the default ARIA attributes for the menu toggle and the navigations.
	function onResizeARIA() {
		if ( window.innerWidth < 910 ) {
			if ( menuToggle.hasClass( 'toggled-on' ) ) {
				menuToggle.attr( 'aria-expanded', 'true' );
			} else {
				menuToggle.attr( 'aria-expanded', 'false' );
			}

			if ( siteHeaderMenu.hasClass( 'toggled-on' ) ) {
				siteNavigation.attr( 'aria-expanded', 'true' );
				socialNavigation.attr( 'aria-expanded', 'true' );
			} else {
				siteNavigation.attr( 'aria-expanded', 'false' );
				socialNavigation.attr( 'aria-expanded', 'false' );
			}

			menuToggle.attr( 'aria-controls', 'site-navigation social-navigation' );
		} else {
			menuToggle.removeAttr( 'aria-expanded' );
			siteNavigation.removeAttr( 'aria-expanded' );
			socialNavigation.removeAttr( 'aria-expanded' );
			menuToggle.removeAttr( 'aria-controls' );
		}
	}

	// Add 'below-entry-meta' class to elements.
	function belowEntryMetaClass( param ) {
		if ( body.hasClass( 'page' ) || body.hasClass( 'search' ) || body.hasClass( 'single-attachment' ) || body.hasClass( 'error404' ) ) {
			return;
		}

		$( '.entry-content' ).find( param ).each(
			function() {

					var element, elementPos, elementPosTop, entryFooter, entryFooterPos, entryFooterPosBottom, caption, newImg;

					element = $( this );

				if ( typeof element !== 'undefined' ) {
					elementPos = element.offset();
				}

				if ( typeof elementPos !== 'undefined' ) {
					elementPosTop = elementPos.top;
				}

				if ( typeof element !== 'undefined' ) {
					entryFooter = element.closest( 'article' ).find( '.entry-footer' );
				}

				if ( typeof entryFooter !== 'undefined' ) {
					entryFooterPos = entryFooter.offset();
				}

				if ( typeof entryFooterPos !== 'undefined' && typeof entryFooter !== 'undefined' ) {
					entryFooterPosBottom = entryFooterPos.top + ( entryFooter.height() + 28 );
				}

				if ( typeof element !== 'undefined' ) {
					caption = element.closest( 'figure' );
				}

					// Add 'below-entry-meta' to elements below the entry meta.
				if ( elementPosTop > entryFooterPosBottom ) {

					// Check if full-size images and captions are larger than or equal to 840px.
					if ( 'img.size-full' === param ) {

						// Create an image to find native image width of resized images (i.e. max-width: 100%).
						newImg     = new Image();
						newImg.src = element.attr( 'src' );

						$( newImg ).on(
							'load.capri', function() {
								if ( newImg.width >= 840  ) {
									element.addClass( 'below-entry-meta' );

									if ( caption.hasClass( 'wp-caption' ) ) {
										caption.addClass( 'below-entry-meta' );
										caption.removeAttr( 'style' );
									}
								}
							}
						);
					} else {
						element.addClass( 'below-entry-meta' );
					}
				} else {
					element.removeClass( 'below-entry-meta' );
					caption.removeClass( 'below-entry-meta' );
				}
			}
		);
	}

	$( document ).ready(
		function() {
				body = $( document.body );

				$( window )
				.on( 'load.capri', onResizeARIA )
				.on(
					'resize.capri', function() {
						clearTimeout( resizeTimer );
						resizeTimer = setTimeout(
							function() {
								belowEntryMetaClass( 'img.size-full' );
								belowEntryMetaClass( 'blockquote.alignleft, blockquote.alignright' );
							}, 300
						);
						onResizeARIA();
					}
				);

				belowEntryMetaClass( 'img.size-full' );
				belowEntryMetaClass( 'blockquote.alignleft, blockquote.alignright' );

				$( '.woo-cat-menu-toggle' ).click(
					function () {
						$( this ).parent().find( '.woo-category-dropdown' ).toggleClass( 'toggled-on' );
					}
				);
		}
	);
} )( jQuery );

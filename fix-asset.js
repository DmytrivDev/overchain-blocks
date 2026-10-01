const fs     = require( 'fs' );
const path   = require( 'path' );
const crypto = require( 'crypto' );

const deps = [ 'react-jsx-runtime', 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-i18n' ];

/**
 * The version must change whenever the bundle changes, otherwise WordPress keeps
 * enqueuing the script at the same URL and browsers serve a stale editor bundle
 * forever — rebuilds appear to do nothing. Hash the built file, the way
 * DependencyExtractionWebpackPlugin normally would.
 */
function assetContents( jsPath ) {
	const hash = crypto
		.createHash( 'md5' )
		.update( fs.readFileSync( jsPath ) )
		.digest( 'hex' )
		.slice( 0, 20 );

	return `<?php return array('dependencies' => array('${ deps.join( "', '" ) }'), 'version' => '${ hash }');\n`;
}

const buildDir = path.join( __dirname, 'build' );

function processDir( dir ) {
	fs.readdirSync( dir ).forEach( ( name ) => {
		const full = path.join( dir, name );
		if ( fs.statSync( full ).isDirectory() ) {
			const jsPath = path.join( full, 'index.js' );
			if ( fs.existsSync( jsPath ) ) {
				const assetPath = path.join( full, 'index.asset.php' );
				fs.writeFileSync( assetPath, assetContents( jsPath ), 'utf8' );
				console.log( `fix-asset.js: wrote ${ assetPath }` );
			}
			processDir( full );
		}
	} );
}

processDir( buildDir );

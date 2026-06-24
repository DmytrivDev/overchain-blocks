const fs   = require( 'fs' );
const path = require( 'path' );

const deps = [ 'react-jsx-runtime', 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-i18n' ];
const content = `<?php return array('dependencies' => array('${ deps.join( "', '" ) }'), 'version' => '1.0.0');\n`;

const buildDir = path.join( __dirname, 'build' );

function processDir( dir ) {
	fs.readdirSync( dir ).forEach( ( name ) => {
		const full = path.join( dir, name );
		if ( fs.statSync( full ).isDirectory() ) {
			if ( fs.existsSync( path.join( full, 'index.js' ) ) ) {
				const assetPath = path.join( full, 'index.asset.php' );
				fs.writeFileSync( assetPath, content, 'utf8' );
				console.log( `fix-asset.js: wrote ${ assetPath }` );
			}
			processDir( full );
		}
	} );
}

processDir( buildDir );
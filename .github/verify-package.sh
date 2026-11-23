#!/usr/bin/env bash
# Check an assembled plugin folder before it is zipped for a release.
# Usage: bash .github/verify-package.sh <plugin folder>
#
# Fails (exit 1) when anything the plugin needs at runtime is missing, so a broken
# package never reaches the sites: a missing src/ once made every block render nothing.

cd "$1" || { echo "::error::no such folder: $1"; exit 1; }
fail=0

for f in overchain-blocks.php ob-updater.php src/View.php src/Plugin.php \
         vendor/autoload.php vendor/eftec/bladeone/lib/BladeOne.php \
         build/blocks.css build/editor.css; do
	[ -f "$f" ] || { echo "::error::missing $f"; fail=1; }
done

# Every block: its built editor script and asset file, and the Blade view its render.php names.
while IFS= read -r block_json; do
	dir=$(dirname "$block_json")
	name=${dir#blocks/}

	if [ ! -f "build/$name/index.js" ] || [ ! -f "build/$name/index.asset.php" ]; then
		echo "::error::no build for block $name"
		fail=1
	fi

	view=$(grep -o "'blocks\.[a-z0-9-]*'" "$dir/render.php" 2>/dev/null | head -1 | tr -d "'")
	view=${view#blocks.}
	if [ -n "$view" ] && [ ! -f "resources/views/blocks/$view.blade.php" ]; then
		echo "::error::block $name renders blocks.$view, which is missing"
		fail=1
	fi
done < <(find blocks -name block.json)

# The classes the render chain needs must load through Composer's autoloader.
check="${TMPDIR:-/tmp}/ob-autoload-check.php"
cat > "$check" <<'PHP'
<?php
require getcwd() . '/vendor/autoload.php';
$missing = array();
foreach ( array( 'OverchainBlocks\View', 'eftec\bladeone\BladeOne' ) as $class ) {
	if ( ! class_exists( $class ) ) {
		$missing[] = $class;
	}
}
if ( $missing ) {
	echo '::error::does not autoload: ' . implode( ', ', $missing ) . "\n";
	exit( 1 );
}
PHP
php "$check" || fail=1

[ "$fail" -eq 0 ] && echo "Package OK: $(find blocks -name block.json | wc -l) blocks."
exit "$fail"

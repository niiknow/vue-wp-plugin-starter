#!/bin/bash
# Usage: ./vue-wp-plugin-starter/init-plugin.sh

# Check for valid plugin name.
function valid_name () {
  valid="^[A-Z][A-Za-z0-9]*( [A-Z][A-Za-z0-9]*)*$"

  if [[ ! "$1" =~ $valid ]]; then
    return 1
  fi

  return 0
}

echo
echo "Hello, "$USER"."
echo
echo "This script will automatically generate a new plugin based on the scaffolding."
echo

echo -n "To begin, input your plugin name and press [ENTER]: "
read name

# Validate plugin name.
if ! valid_name "$name"; then
  echo "Malformed name '$name'. Please use title-case words separated by spaces. No hyphens. For example, 'Hello World'."
  echo
  echo -n "Enter a valid plugin name and press [ENTER]: "
  read name

  if ! valid_name "$name"; then
    echo
    echo "The name you entered is invalid, rage quitting."
    exit 1
  fi
fi

# slug is use for wordpress file naming
slug="$( echo "$name" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' )"

# prefix is use as wordpress plugin prefix
prefix="$( echo "$name" | tr '[:upper:]' '[:lower:]' | sed 's/ /_/g' )"

# our application namespace
namespace="$(echo "$name" | sed 's/ //')"

# the actual plugin file naming
pluginfile="$slug"
templatefile="vue-wp-plugin-starter.php"

echo -n "Do you want to prepend 'wp-' to your plugin file name? [Y/N]: "
read prepend

if [[ "$prepend" != Y ]] && [[ "$prepend" != y ]]; then
  echo
  echo -n "Do you want to append '-wp' to your plugin file name? [Y/N]: "
    read append

  if [[ "$append" == Y ]] || [[ "$append" == y ]]; then
    pluginfile="${slug}-wp"
  fi
else
  pluginfile="wp-${slug}"
fi

echo 'Initializing $pluginfile.php'
rm "$pluginfile.php"
cp "$templatefile" "$pluginfile.php"
sed -e "s/PluginName/$name/g" "$pluginfile.php" > "$pluginfile.php"-e
rm "$pluginfile.php"
mv "$pluginfile.php"-e "$pluginfile.php"

echo 'Initializing package.json'
sed -e "s/PluginFileName/$pluginfile/g" package.json > package.json-e
rm package.json
mv package.json-e package.json

echo 'Initializing composer.json'
sed -e "s/PluginNamespace/$namespace/g" composer.json > composer.json-e
rm composer.json
mv composer.json-e composer.json

echo 'Initializing *.php namespace'
while read -d '' filename; do
  sed -e "s/PluginNamespace/$namespace/g" "${filename}" > "${filename}"-e
  sed -e "s/PluginPrefix/$prefix/g" "${filename}"-e > "${filename}"
  sed -e "s/PluginName/$name/g" "${filename}" > "${filename}"-e
  rm ${filename}
  mv "${filename}"-e ${filename}
  # rm "${filename}"-e
done < <(find . -type d \( -path ./node_modules -o -path ./vendor -o -path ./.git \) -prune -o -name '*.php' -print0)

# lastly, remove template file
rm "$templatefile" composer.lock package-lock.json

echo 'Initializing readme.txt'
sed -e "s/PluginName/$name/g" readme.txt > readme.txt-e
rm readme.txt
mv readme.txt-e readme.txt

echo ""
echo "..."
echo "Plugin init completed, run 'composer install' and 'npm install' appropriately."
echo "Also, don't forget to update readme.txt with your own plugin details..."


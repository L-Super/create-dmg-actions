# Create DMG actions

[![GitHub Super-Linter](https://github.com/actions/typescript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)

A script designed to automate the creation of standard .dmg installation files
for macOS systems.

## Overview

The .dmg file is a widely used disk image format in macOS systems, commonly used
for distributing applications and data. With Create DMG Action, you can easily
package your application into .dmg format, ensuring that users can conveniently
install and use your application.

## Inputs

- `dmg_name`(**Required**): Set the name of the output DMG file.

- `src_dir`(**Required**): Path of the Application Bundle.

## Example usage

```yml
uses: L-Super/create-dmg-actions@v1.0.3
with:
  dmg_name: 'installer'
  src_dir: 'demo.app'
```

```yml
- name: Create dmg
  uses: L-Super/create-dmg-actions@v1
  with:
    dmg_name: 'demo'
    src_dir: '${{ github.workspace }}/build/demo.app'

- name: Upload macOS DMG as Artifact
  uses: actions/upload-artifact@v4
  with:
    name: macOS-DMG
    path: ${{ github.workspace }}/demo*.dmg
    retention-days: 7
```

## License

This project is licensed under the [MIT License.](LICENSE)

## Contributions

If you have any suggestions or wish to contribute code, please submit a Pull
Request or create an Issue.

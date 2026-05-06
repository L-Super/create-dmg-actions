# Create DMG Actions

[![CI](https://github.com/L-Super/create-dmg-actions/actions/workflows/ci.yml/badge.svg)](https://github.com/L-Super/create-dmg-actions/actions/workflows/ci.yml)
[![Check dist/](https://github.com/L-Super/create-dmg-actions/actions/workflows/check-dist.yml/badge.svg)](https://github.com/L-Super/create-dmg-actions/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/L-Super/create-dmg-actions/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/L-Super/create-dmg-actions/actions/workflows/codeql-analysis.yml)

A GitHub Action to automate the creation of standard .dmg installation files for
macOS systems.

## Overview

The .dmg file is a widely used disk image format in macOS systems, commonly used
for distributing applications and data. With Create DMG Action, you can easily
package your application into .dmg format, ensuring that users can conveniently
install and use your application.

## Inputs

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `dmg_name` | Yes | — | Set the name of the output DMG file. |
| `src_dir` | Yes | — | Path of the Application Bundle. |
| `background` | No | built-in SVG | Path to a custom background image (SVG/PNG). |
| `window_size` | No | `660x400` | DMG window size as `WxH`. |
| `icon_size` | No | `100` | Icon size in pixels. |
| `icon_position` | No | `160 185` | App icon position as `X Y`. |
| `app_drop_link` | No | `500 185` | Applications shortcut position as `X Y`. |

## Outputs

| Name | Description |
| --- | --- |
| `dmg_path` | The file name of the generated DMG (e.g. `MyApp.dmg`). |

## Example Usage

### Basic

```yml
- name: Create DMG
  uses: L-Super/create-dmg-actions@v1
  with:
    dmg_name: 'installer'
    src_dir: 'demo.app'
```

### Full workflow with artifact upload

```yml
- name: Create DMG
  id: create-dmg
  uses: L-Super/create-dmg-actions@v1
  with:
    dmg_name: 'demo'
    src_dir: '${{ github.workspace }}/build/demo.app'

- name: Upload macOS DMG as Artifact
  uses: actions/upload-artifact@v4
  with:
    name: macOS-DMG
    path: ${{ github.workspace }}/${{ steps.create-dmg.outputs.dmg_path }}
    retention-days: 7
```

### Custom appearance

```yml
- name: Create DMG
  uses: L-Super/create-dmg-actions@v1
  with:
    dmg_name: 'MyApp'
    src_dir: 'build/MyApp.app'
    background: 'assets/dmg-background.png'
    window_size: '800x500'
    icon_size: '128'
    icon_position: '200 250'
    app_drop_link: '600 250'
```

## License

This project is licensed under the [MIT License.](LICENSE)

## Contributions

If you have any suggestions or wish to contribute code, please submit a Pull
Request or create an Issue.

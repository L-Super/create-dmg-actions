# Create DMG actions

[![GitHub Super-Linter](https://github.com/actions/typescript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)

Build fancy DMGs on your Github Actions workflows with just one simple action.

## Inputs

+ `dmg_name`(**Required**): set DMG file name. 

+ `src_dir`(**Required**): source dir path.


## Example usage

```
uses: L-Super/create-dmg-actions@v1.0.0
with:
  dmg_name: 'installer'
  src_dir: 'demo.app'
```

   


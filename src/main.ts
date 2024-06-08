import * as core from '@actions/core'
import { exec } from '@actions/exec'
import * as fs from 'fs'
import * as path from 'path'

function writeSVGToFile(svg: string, filePath: string): void {
  fs.writeFile(filePath, svg, 'utf-8', err => {
    if (err) {
      core.setFailed(err.message)
      return
    }

    core.debug('SVG data has been written to the file successfully.')
  })
}

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const src_dir: string = core.getInput('src_dir')
    const dmg_name: string = core.getInput('dmg_name')
    // Expect to get xxx.app
    const base_name: string = path.basename(src_dir)
    core.debug(`src_dir = ${src_dir} `)
    core.debug(`dmg_name = ${dmg_name} `)
    core.debug(`base_name = ${base_name}`)

    core.info(`Installing create-dmg`)
    await exec(`brew install create-dmg`)
    core.info(`create-dmg installed`)

    const svg_data = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="660" height="400" viewBox="0 0 660 400" fill="none">
    <path     fill="#F1F1F5"  d="M0 400L660 400L660 0L0 0L0 400Z">
    </path>
    <path   fill-rule="evenodd"  fill="#4E5969"  d="M343.933 177.984L321.661 159.275C320.439 158.249 318.656 158.249 317.434 159.275L317.066 159.584C315.503 160.897 315.503 163.303 317.066 164.616L332.981 177.984C334.544 179.297 334.544 181.703 332.981 183.016L317.067 196.384C315.503 197.697 315.503 200.103 317.067 201.416L317.434 201.725C318.656 202.751 320.439 202.751 321.661 201.725L343.933 183.016C345.497 181.703 345.497 179.297 343.933 177.984Z">
    </path>
    </svg>
    `

    writeSVGToFile(svg_data, 'bg.svg')

    // Log the current timestamp, wait, then log the new timestamp
    core.debug(new Date().toTimeString())
    await exec(
      `create-dmg --volname "${dmg_name}" --background "bg.svg" --window-pos 200 120 --window-size 660 400 --icon-size 100 --icon ${base_name} 160 185 --hide-extension "${base_name}" --app-drop-link 500 185 ${dmg_name}.dmg ${src_dir}`
    )
    core.info(`Create dmg finished`)

    // Set outputs for other workflow steps to use
    core.setOutput('dmg_name', `${dmg_name}.dmg`)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}

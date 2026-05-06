import * as core from '@actions/core'
import { exec } from '@actions/exec'
import * as fs from 'fs'
import * as path from 'path'

const DEFAULT_BG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="660" height="400" viewBox="0 0 660 400" fill="none">
<path fill="#F1F1F5" d="M0 400L660 400L660 0L0 0L0 400Z"></path>
<path fill-rule="evenodd" fill="#4E5969" d="M343.933 177.984L321.661 159.275C320.439 158.249 318.656 158.249 317.434 159.275L317.066 159.584C315.503 160.897 315.503 163.303 317.066 164.616L332.981 177.984C334.544 179.297 334.544 181.703 332.981 183.016L317.067 196.384C315.503 197.697 315.503 200.103 317.067 201.416L317.434 201.725C318.656 202.751 320.439 202.751 321.661 201.725L343.933 183.016C345.497 181.703 345.497 179.297 343.933 177.984Z"></path>
</svg>`

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // Required inputs
    const srcDir: string = core.getInput('src_dir', { required: true })
    const dmgName: string = core.getInput('dmg_name', { required: true })

    // Optional inputs
    const background: string = core.getInput('background')
    const windowSize: string = core.getInput('window_size') || '660x400'
    const iconSize: string = core.getInput('icon_size') || '100'
    const iconPosition: string = core.getInput('icon_position') || '160 185'
    const appDropLink: string = core.getInput('app_drop_link') || '500 185'

    // Expect to get xxx.app
    const baseName: string = path.basename(srcDir)

    core.debug(`src_dir = ${srcDir}`)
    core.debug(`dmg_name = ${dmgName}`)
    core.debug(`base_name = ${baseName}`)
    core.debug(`window_size = ${windowSize}`)
    core.debug(`icon_size = ${iconSize}`)
    core.debug(`icon_position = ${iconPosition}`)
    core.debug(`app_drop_link = ${appDropLink}`)

    // Install create-dmg
    core.info('Installing create-dmg...')
    await exec('brew install create-dmg')
    core.info('create-dmg installed')

    // Determine background image path
    let bgPath: string
    if (background) {
      bgPath = background
      core.info(`Using custom background: ${bgPath}`)
    } else {
      bgPath = 'bg.svg'
      fs.writeFileSync(bgPath, DEFAULT_BG_SVG, 'utf-8')
      core.info('Using default built-in background')
    }

    // Parse window size
    const [windowWidth, windowHeight] = windowSize.split('x')
    // Parse positions
    const [iconX, iconY] = iconPosition.split(' ')
    const [dropX, dropY] = appDropLink.split(' ')

    // Build create-dmg command
    const args: string[] = [
      '--volname',
      dmgName,
      '--background',
      bgPath,
      '--window-pos',
      '200',
      '120',
      '--window-size',
      windowWidth,
      windowHeight,
      '--icon-size',
      iconSize,
      '--icon',
      baseName,
      iconX,
      iconY,
      '--app-drop-link',
      dropX,
      dropY,
      '--no-internet-enable',
      `${dmgName}.dmg`,
      srcDir
    ]

    core.debug(`create-dmg args: ${args.join(' ')}`)
    await exec('create-dmg', args)
    core.info('Create dmg finished')

    // Set outputs for other workflow steps to use
    core.setOutput('dmg_path', `${dmgName}.dmg`)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}

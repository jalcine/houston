/**
 * houston/test/utility/fs.ts
 * Utilties for testing on the filesystem
 *
 * @exports {Function} tmp - Creates a temp directory for tests
 */

import * as fs from 'fs-extra'
import * as os from 'os'
import * as path from 'path'
import * as uuid from 'uuid/v4'

/**
 * tmp
 * Creates a temp directory for tests
 *
 * @async
 * @param {string} [dir] - Directory to create
 * @return {string}
 */
export async function tmp (dir = ''): Promise<string> {
  const directory = path.resolve(os.tmpdir(), 'houston-test', dir, uuid())

  await fs.ensureDir(directory)

  return directory
}

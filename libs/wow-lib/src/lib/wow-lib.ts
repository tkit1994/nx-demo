import * as fs from 'fs-extra';
import * as path from 'path';
export function wowLib(): string {
  return 'wow-lib';
}

function create_symblic_link(source: string, target: string): boolean {
  if (!fs.existsSync(target)) {
    fs.createSymlinkSync(source, target, 'dir');
    return true;
  }
  if (fs.lstatSync(target).isDirectory) {
    fs.moveSync(target, `${target}_bankup`, {overwrite:true});
    fs.createSymlinkSync(source, target, 'dir');
    return true;
  }
  if (fs.lstatSync(target).isSymbolicLink) {
    fs.unlinkSync(target);
    fs.createSymlinkSync(source, target, 'dir');
    return true;
  }
  return false;
}
function get_wow_dir(wowPath: string): string {
  return path.parse(wowPath).dir;
}
function normalGame(wowPath: string): boolean {
  const wowDir = get_wow_dir(wowPath);
  const addonPathSource = path.join(wowDir, 'interface', 'addonsNormal');
  const addonPathTarget = path.join(wowDir, 'interface', 'addons');
  const wtfPathSource = path.join(wowDir, 'WTFNormal');
  const wtfPathTarget = path.join(wowDir, 'WTF');
  const result1 = create_symblic_link(wtfPathSource, wtfPathTarget);
  const result2 = create_symblic_link(addonPathSource, addonPathTarget);
  return result1 && result2;
}
function battleGround(wowPath: string): boolean {
  const wowDir = get_wow_dir(wowPath);
  const addonPathSource = path.join(wowDir, 'interface', 'addonsBG');
  const addonPathTarget = path.join(wowDir, 'interface', 'addons');
  const wtfPathSource = path.join(wowDir, 'WTFBG');
  const wtfPathTarget = path.join(wowDir, 'WTF');
  const result1 = create_symblic_link(wtfPathSource, wtfPathTarget);
  const result2 = create_symblic_link(addonPathSource, addonPathTarget);
  return result1 && result2;
}
function battlePet(wowPath: string): boolean {
  const wowDir = get_wow_dir(wowPath);
  const addonPathSource = path.join(wowDir, 'interface', 'addonsBP');
  const addonPathTarget = path.join(wowDir, 'interface', 'addons');
  const wtfPathSource = path.join(wowDir, 'WTFBP');
  const wtfPathTarget = path.join(wowDir, 'WTF');
  const result1 = create_symblic_link(wtfPathSource, wtfPathTarget);
  const result2 = create_symblic_link(addonPathSource, addonPathTarget);
  return result1 && result2;
}
function initialize(wowPath: string) {
  const wowDir = get_wow_dir(wowPath);
  const addonPathNormal = path.join(wowDir, 'interface', 'addonsNormal');
  const wtfPathNormal = path.join(wowDir, 'WTFNormal');
  const addonPathBG = path.join(wowDir, 'interface', 'addonsBG');
  const wtfPathBG = path.join(wowDir, 'WTFBG');
  const addonPathBP = path.join(wowDir, 'interface', 'addonsBP');
  const wtfPathBP = path.join(wowDir, 'WTFBP');
  if (!fs.existsSync(addonPathNormal)) {
    fs.mkdirSync(addonPathNormal);
  }
  if (!fs.existsSync(addonPathBG)) {
    fs.mkdirSync(addonPathBG);
  }
  if (!fs.existsSync(addonPathBP)) {
    fs.mkdirSync(addonPathBP);
  }
  if (!fs.existsSync(wtfPathNormal)) {
    fs.mkdirSync(wtfPathNormal);
  }
  if (!fs.existsSync(wtfPathBG)) {
    fs.mkdirSync(wtfPathBG);
  }
  if (!fs.existsSync(wtfPathBP)) {
    fs.mkdirSync(wtfPathBP);
  }
}

const wow_lib = {
  battleGround,
  normalGame,
  battlePet,
  initialize,
};
export default wow_lib;

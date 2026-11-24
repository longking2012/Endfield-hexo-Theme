#!/usr/bin/env node
/**
 * Endfield 主题 - 安装向导
 * 部署时运行: npm run setup
 * 交互式填写站点配置, 自动写入主题 _config.yml
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CFG = path.join(__dirname, '..', '_config.yml');

// 终端颜色
const C = {
  yellow: s => `\x1b[33m${s}\x1b[0m`,
  green: s => `\x1b[32m${s}\x1b[0m`,
  gray: s => `\x1b[90m${s}\x1b[0m`,
  bold: s => `\x1b[1m${s}\x1b[0m`,
  clear: '\x1b[2J\x1b[0f',
};

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(label, def) {
  return new Promise(resolve => {
    const hint = def ? C.gray(` (${def})`) : C.gray(' (可选, 回车跳过)');
    rl.question(C.yellow(`  ${label}`) + hint + ': ', ans => {
      resolve(ans.trim() || def || '');
    });
  });
}

// 用新值替换 _config.yml 中某个字段
function replaceField(text, field, value) {
  const re = new RegExp(`(\\b${field}:\\s*)(.*)`);
  if (re.test(text)) {
    return text.replace(re, `$1${value}`);
  }
  return text;
}

// 替换嵌套字段 (如 footer.icp / verification.baidu)
function replaceNested(text, parent, field, value) {
  const re = new RegExp(`(\\b${parent}:[\\s\\S]*?\\b${field}:\\s*)(.*)`);
  if (re.test(text)) {
    return text.replace(re, `$1${value}`);
  }
  return text;
}

async function main() {
  console.clear();
  console.log(C.bold('\n  ============================='));
  console.log('    Endfield 主题 · 安装向导');
  console.log('  =============================\n');
  console.log(C.gray('  按回车使用默认值, 填写内容将自动写入主题配置\n'));

  if (!fs.existsSync(CFG)) {
    console.error(C.yellow('  未找到 _config.yml, 请在主题目录运行'));
    process.exit(1);
  }
  let cfg = fs.readFileSync(CFG, 'utf8');

  // 1. 站点标题 (写入 hexo 根 _config.yml 的提示)
  const title = await ask('站点标题', 'My Blog');

  // 2. 强调色
  const accent = await ask('强调色 (如 #fffa00)', '#fffa00');

  // 3. ICP 备案
  const icp = await ask('ICP 备案号', '');

  // 4. 公安备案 ID
  const gonganId = await ask('公安备案 ID', '');

  // 5. SEO 验证
  const baidu = await ask('百度站点验证 code', '');
  const bing = await ask('Bing 站点验证 code', '');

  console.log(C.gray('\n  正在写入配置...'));

  // 写入主题 _config.yml
  cfg = replaceField(cfg, 'accent_color', `'${accent}'`);
  cfg = replaceNested(cfg, 'footer', 'icp', `'${icp}'`);
  cfg = replaceNested(cfg, 'footer', 'gongan_id', `'${gonganId}'`);
  cfg = replaceNested(cfg, 'verification', 'baidu', `'${baidu}'`);
  cfg = replaceNested(cfg, 'verification', 'bing', `'${bing}'`);
  fs.writeFileSync(CFG, cfg, 'utf8');

  // 写入 hexo 根 _config.yml 的 title (如果存在)
  const rootCfgPath = path.join(process.cwd(), '_config.yml');
  if (fs.existsSync(rootCfgPath)) {
    let root = fs.readFileSync(rootCfgPath, 'utf8');
    root = replaceField(root, 'title', `'${title}'`);
    fs.writeFileSync(rootCfgPath, root, 'utf8');
  }

  console.log(C.green('\n  ✓ 配置已写入!\n'));
  console.log(C.gray('  接下来执行:'));
  console.log('    ' + C.bold('hexo clean && hexo generate'));
  console.log('    ' + C.bold('hexo server') + C.gray('   # 本地预览\n'));
  console.log(C.yellow('  音乐: 把你的音乐文件放到 source/music/, 并在 source/js/main.js 的 PLAYLIST 中添加曲目。\n'));
  rl.close();
}

main();

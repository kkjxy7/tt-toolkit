// ===========================================
// 【账号底表】如需新增市场或修改ID，请在这里改
// ===========================================
const ACCOUNTS = [
  // ---- RTA 账号 ----
  { type: 'RTA', market: 'BR', name: 'Shopee BR - RTA', advId: '7369540846363983888' },
  { type: 'RTA', market: 'ID', name: 'Shopee ID - RTA', advId: '7340547463515783169' },
  { type: 'RTA', market: 'PH', name: 'Shopee PH - RTA', advId: '7368799508249395217' },
  { type: 'RTA', market: 'TH', name: 'Shopee TH - RTA', advId: '7369535533703282689' },
  { type: 'RTA', market: 'VN', name: 'Shopee VN - RTA', advId: '7369539150103576593' },
  { type: 'RTA', market: 'MY', name: 'Shopee MY - RTA', advId: '7369537989195743233' },
  { type: 'RTA', market: 'SG', name: 'Shopee SG - RTA', advId: '7369540364748734481' },
  { type: 'RTA', market: 'TW', name: 'Shopee TW - RTA', advId: '7395071134275911697' },
  { type: 'RTA', market: 'AR', name: 'Shopee AR - RTA', advId: '7062167500011634690' },

  // ---- Pangle S+2.0 账号 ----
  { type: 'Pangle', market: 'BR', name: 'Shopee BR - Pangle S+2.0', advId: '7571016854194602001' },
  { type: 'Pangle', market: 'ID', name: 'Shopee ID - Pangle S+2.0', advId: '7571017317229035521' },
  { type: 'Pangle', market: 'PH', name: 'Shopee PH - Pangle S+2.0', advId: '7612488309063024648' },
  { type: 'Pangle', market: 'TH', name: 'Shopee TH - Pangle S+2.0', advId: '7612487942952271880' },
  { type: 'Pangle', market: 'VN', name: 'Shopee VN - Pangle S+2.0', advId: '7571017594497531920' },
  { type: 'Pangle', market: 'MY', name: 'Shopee MY - Pangle S+2.0', advId: '7612489082162921473' },
  { type: 'Pangle', market: 'SG', name: 'Shopee SG - Pangle S+2.0', advId: '7612487380559069192' },
  { type: 'Pangle', market: 'TW', name: 'Shopee TW - Pangle S+2.0', advId: '7612487927935008775' },

  // ---- OM Branding 账号 ----
  { type: 'OM Branding', market: 'BR', name: 'Shopee BR - Branding', advId: '7218375640117018626' },
  { type: 'OM Branding', market: 'PH', name: 'Shopee PH - Branding', advId: '7218377600304037890' },
];

// ===================== 日期计算工具 =====================
let datePicker = null;

function setDateRange(mode) {
  const today = new Date();

  // 更新快捷按钮的高亮颜色
  document.querySelectorAll('.shortcut-btn').forEach(btn => {
    btn.classList.toggle('active', btn.id === 'btn-date-' + mode);
  });

  const end = new Date(today);
  end.setDate(today.getDate() - 1); // 结束日期固定为昨天

  const start = new Date(end);
  const offset = parseInt(mode, 10);
  start.setDate(end.getDate() - offset + 1);

  const startStr = formatDate(start);
  const endStr = formatDate(end);

  document.getElementById('start-date').value = startStr;
  document.getElementById('end-date').value = endStr;
  document.getElementById('date-range').value = `${startStr} ~ ${endStr}`;

  if (datePicker) {
    datePicker.setDateRange(startStr, endStr);
  }
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// ===================== 基础工具 =====================
function parseIds(input) {
  if (!input) return [];
  return input.split(/[\s,，]+/).map(s => s.trim()).filter(s => s.length > 0);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'show';
  setTimeout(() => t.className = '', 2000);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('已复制');
  } catch (e) {
    showToast('请手动选择复制');
  }
}

// ===================== 核心逻辑：账号与Tab =====================
function getUniqueTypes() { return [...new Set(ACCOUNTS.map(a => a.type))]; }
function getMarkets(type) { return [...new Set(ACCOUNTS.filter(a => a.type === type).map(a => a.market))]; }
function getAccounts(type, market) { return ACCOUNTS.filter(a => a.type === type && a.market === market); }

function switchTab(name) {
  document.querySelectorAll('.tab-btn, .tab-content').forEach(el => el.classList.remove('active'));
  document.querySelector(`[data-tab="${name}"]`).classList.add('active');
  document.getElementById(`tab-${name}`).classList.add('active');
}

// ===================== 渲染函数 =====================
let currentType = null;

function renderAccountTabs() {
  const container = document.getElementById('account-type-tabs');
  const types = getUniqueTypes();
  currentType = types[0];
  types.forEach((type, i) => {
    const btn = document.createElement('button');
    btn.className = 'account-type-btn' + (i === 0 ? ' active' : '');
    btn.textContent = type;
    btn.onclick = () => {
      currentType = type;
      document.querySelectorAll('.account-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards();
    };
    container.appendChild(btn);
  });
}

function renderCards() {
  const container = document.getElementById('account-cards');
  container.innerHTML = '';
  ACCOUNTS.filter(a => a.type === currentType).forEach(acc => {
    const card = document.createElement('div');
    card.className = 'account-card';
    card.innerHTML = `
      <div class="market-badge">${acc.market}</div>
      <div class="account-name">${acc.name}</div>
      <div class="card-actions">
        <button class="btn-card" onclick="window.open('https://ads.tiktok.com/i18n/manage/campaign?aadvid=${acc.advId}', '_blank')">Account</button>
        <button class="btn-card" id="btn-to-camp-${acc.advId}">Camp</button>
      </div>
    `;
    card.querySelector(`#btn-to-camp-${acc.advId}`).onclick = () => {
      jumpToCamp(acc.type, acc.market, acc.advId);
    };
    container.appendChild(card);
  });
}

function jumpToCamp(type, market, advId) {
  switchCampMode('list');
  const t = document.getElementById('camp-type');
  const m = document.getElementById('camp-market');
  const a = document.getElementById('camp-account');
  t.value = type;
  t.onchange();
  m.value = market;
  m.onchange();
  a.value = advId;
  switchTab('ttam');
  document.getElementById('camp-ids').focus();
  document.getElementById('camp-level-section').scrollIntoView({ behavior: 'smooth' });
}

function initSelectors() {
  const t = document.getElementById('camp-type');
  const m = document.getElementById('camp-market');
  const a = document.getElementById('camp-account');

  getUniqueTypes().forEach(type => t.add(new Option(type, type)));

  t.onchange = () => {
    m.innerHTML = '<option value="">-- Market --</option>';
    a.innerHTML = '<option value="">-- Account --</option>';
    if (!t.value) return;
    getMarkets(t.value).forEach(market => m.add(new Option(market, market)));
  };

  m.onchange = () => {
    a.innerHTML = '<option value="">-- Account --</option>';
    if (!m.value) return;
    getAccounts(t.value, m.value).forEach(acc => a.add(new Option(`${acc.name} (${acc.advId})`, acc.advId)));
  };
}

function switchCampMode(mode, advId = '') {
  document.querySelectorAll('.mode-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
  document.getElementById('camp-selectors').classList.toggle('hidden', mode !== 'list');
  document.getElementById('custom-camp-row').classList.toggle('hidden', mode !== 'custom');
  if (mode === 'custom' && advId) document.getElementById('camp-custom-advid').value = advId;
}

// ===================== 生成链接逻辑 =====================
function handleGenerate() {
  const isCustom = document.querySelector('.mode-tab[data-mode="custom"]').classList.contains('active');
  const advId = isCustom ? document.getElementById('camp-custom-advid').value.trim() : document.getElementById('camp-account').value;
  const start = document.getElementById('start-date').value;
  const end = document.getElementById('end-date').value;
  const ids = parseIds(document.getElementById('camp-ids').value);

  if (!advId) return showToast('请选择账号');
  if (ids.length === 0) return showToast('请输入 Camp ID');
  if (!start || !end) return showToast('请选择日期');

  const base = 'columns=campaign_id%2Cad_id%2Cad_name%2Ccampaign_budget%2Cbudget%2Cbid_strategy%2Cbid%2Cstat_cost%2Ctime_attr_effect_cnt%2Ctime_attr_effect_cost%2Ctime_attr_convert_cnt%2Ctime_attr_conversion_cost%2Cschedule%2Cattribution_statistic_type%2Ccreative_id%2Ccpc%2Ccpm%2Cshow_cnt%2Cclick_cnt%2Cctr%2Cskan_convert_cnt%2Cskan_conversion_cost%2Ctime_attr_conversion_rate%2Ctime_attr_conversion_rate_imp%2Cskan_conversion_rate%2Cskan_conversion_rate_imp%2Ctime_attr_effect_rate%2Cattribution_window';
  const filters = ids.map((id, i) => `filters%5B0%5D%5Bin_field_values%5D%5B${i}%5D=${encodeURIComponent(id)}`).join('&');
  const url = `https://ads.tiktok.com/i18n/manage/campaign?aadvid=${advId}&${base}&st=${start}&et=${end}&filters%5B0%5D%5Bfield%5D=campaign_ids&${filters}&filters%5B0%5D%5Bfilter_type%5D=0`;

  const link = document.getElementById('generated-link');
  link.textContent = link.href = url;
  document.getElementById('link-result').classList.remove('hidden');
}

// ===================== OCR 图片提取逻辑 =====================
const OCR = {
  isProcessing: false,
  worker: null,

  async getWorker() {
    if (!this.worker) {
      this.worker = await Tesseract.createWorker('chi_sim+eng', 1, {
        logger: m => {
          if (m.status === 'recognizing text') {
            this.updateProgress(m.progress * 100, `正在识别文字: ${Math.round(m.progress * 100)}%`);
          }
        }
      });
    }
    return this.worker;
  },

  async compressImage(file) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1280;
        let width = img.width;
        let height = img.height;
        if (width > MAX_WIDTH) {
          height = Math.round(height * MAX_WIDTH / width);
          width = MAX_WIDTH;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, { type: file.type }));
        }, file.type, 0.85);
      };
      img.onerror = () => resolve(file);
    });
  },

  async init() {
    this.dropzone = document.getElementById('ocr-dropzone');
    this.fileInput = document.getElementById('ocr-upload');
    this.preview = document.getElementById('ocr-preview');
    this.hint = this.dropzone.querySelector('.dropzone-hint');
    this.progress = document.getElementById('ocr-progress');
    this.progressBar = document.getElementById('ocr-progress-fill');
    this.statusText = document.getElementById('ocr-status');

    // 绑定事件
    this.dropzone.onclick = () => this.fileInput.click();
    this.fileInput.onchange = (e) => this.handleFiles(e.target.files);

    // 全局粘贴监听
    document.addEventListener('paste', (e) => {
      if (document.getElementById('tab-ocr').classList.contains('active')) {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (const item of items) {
          if (item.type.indexOf('image') !== -1) {
            this.handleFiles([item.getAsFile()]);
          }
        }
      }
    });

    // 复制按钮
    document.getElementById('btn-copy-ocr-raw').onclick = () => copyText(document.getElementById('ocr-raw-text').value);
    document.getElementById('btn-copy-ocr-ids').onclick = () => copyText(document.getElementById('ocr-ids').value);
    document.getElementById('btn-copy-ocr-links').onclick = () => copyText(document.getElementById('ocr-links').value);

    // 删除/重新识别按钮
    document.getElementById('btn-ocr-clear').onclick = () => this.clear();
  },

  clear() {
    this.preview.src = '';
    this.preview.classList.add('hidden');
    this.hint.classList.remove('hidden');
    document.getElementById('btn-ocr-clear').classList.add('hidden');
    this.progress.classList.add('hidden');
    this.updateProgress(0, '准备识别中...');
    document.getElementById('ocr-raw-text').value = '';
    document.getElementById('ocr-ids').value = '';
    document.getElementById('ocr-links').value = '';
  },

  async handleFiles(files) {
    if (!files || files.length === 0 || this.isProcessing) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) return showToast('请上传图片文件');

    this.isProcessing = true;
    this.showPreview(file);
    this.updateProgress(0, '正在准备识别...');

    try {
      const worker = await this.getWorker();
      const processedFile = await this.compressImage(file);
      const { data: { text } } = await worker.recognize(processedFile);

      this.processResult(text);
      this.updateProgress(100, '识别完成！');
      setTimeout(() => this.progress.classList.add('hidden'), 2000);
    } catch (err) {
      console.error(err);
      showToast('识别出错，请重试');
      this.updateProgress(0, '识别失败');
    } finally {
      this.isProcessing = false;
    }
  },

  showPreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.preview.src = e.target.result;
      this.preview.classList.remove('hidden');
      this.hint.classList.add('hidden');
      this.progress.classList.remove('hidden');
      document.getElementById('btn-ocr-clear').classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  },

  updateProgress(percent, status) {
    this.progressBar.style.width = percent + '%';
    this.statusText.textContent = status;
  },

  processResult(text) {
    // 1. 全量文字
    document.getElementById('ocr-raw-text').value = text;

    // 2. 提取 ID (15-20位数字)
    const ids = [...new Set(text.match(/\d{15,20}/g) || [])];
    document.getElementById('ocr-ids').value = ids.join('\n');

    // 3. 提取链接：先修复被换行截断的 URL
    const lines = text.split('\n');
    const merged = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (i > 0 && merged[merged.length - 1].match(/https?:\/\/[^\s]*$/) && !line.match(/^https?:\/\//)) {
        merged[merged.length - 1] += line;
      } else {
        merged.push(line);
      }
    }
    const linkText = merged.join('\n');

    const linkRegex = /https?:\/\/[a-zA-Z0-9_\-.\/?&=+%#~:@]+/g;
    let links = [...new Set(linkText.match(linkRegex) || [])];
    // 清理末尾常见标点
    links = links.map(l => l.replace(/[.,;:!?。，；：！？"'"'》）」\]\)>]+$/, ''))
                 .filter(l => l.length > 10 && l.includes('.'));

    document.getElementById('ocr-links').value = links.join('\n');

    if (ids.length > 0 || links.length > 0) {
      showToast(`提取到 ${ids.length} 个 ID, ${links.length} 个链接`);
    }
  }
};

// ===================== 初始化页面 =====================
document.addEventListener('DOMContentLoaded', () => {
  // Tab 点击 - 兼容侧边栏结构
  document.querySelectorAll('.sidebar .tab-btn').forEach(btn => {
    btn.onclick = () => {
      const tabName = btn.dataset.tab;
      document.querySelectorAll('.sidebar .tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(`tab-${tabName}`).classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  });
  
  // OCR 初始化
  OCR.init();
  
  // 首页其他内容渲染
  renderAccountTabs();
  renderCards();
  
  // “其他账号”按钮
  document.getElementById('custom-account-dashboard').onclick = () => {
    const id = document.getElementById('custom-advid').value.trim();
    if (id) window.open(`https://ads.tiktok.com/i18n/manage/campaign?aadvid=${id}`, '_blank');
  };
  document.getElementById('custom-account-camp').onclick = () => {
    const id = document.getElementById('custom-advid').value.trim();
    if (id) { switchCampMode('custom', id); switchTab('ttam'); }
  };

  // Camp Level 初始化
  initSelectors();
  document.querySelectorAll('.mode-tab').forEach(tab => tab.onclick = () => switchCampMode(tab.dataset.mode));
  setDateRange('1'); // 默认选中昨天

  // 初始化 Litepicker 日期范围选择器
  datePicker = new Litepicker({
    element: document.getElementById('date-range'),
    singleMode: false,
    format: 'YYYY-MM-DD',
    delimiter: ' ~ ',
    numberOfMonths: 2,
    numberOfColumns: 2,
    setup: (picker) => {
      picker.on('selected', (startDate, endDate) => {
        document.getElementById('start-date').value = startDate.format('YYYY-MM-DD');
        document.getElementById('end-date').value = endDate.format('YYYY-MM-DD');
        document.getElementById('date-range').value = `${startDate.format('YYYY-MM-DD')} ~ ${endDate.format('YYYY-MM-DD')}`;
      });
    }
  });

  // 生成/打开/复制
  document.getElementById('btn-generate').onclick = handleGenerate;
  document.getElementById('btn-open-link').onclick = () => {
    const u = document.getElementById('generated-link').href;
    if (u && u !== '#') window.open(u, '_blank');
  };
  document.getElementById('btn-copy-link').onclick = () => copyText(document.getElementById('generated-link').textContent);

  // 格式转换逻辑
  const tIn = document.getElementById('transform-input');
  const tOut = document.getElementById('transform-output');
  const updateTrans = () => {
    const mode = document.querySelector('input[name="output-mode"]:checked').value;
    const dedup = document.getElementById('deduplicate').checked;
    let ids = parseIds(tIn.value);
    if (dedup) ids = [...new Set(ids)];
    tOut.value = ids.join(mode === 'comma' ? ',' : '\n');
  };
  document.getElementById('btn-transform').onclick = updateTrans;
  document.getElementById('btn-copy-output').onclick = () => copyText(tOut.value);
  tIn.oninput = updateTrans;
  document.querySelectorAll('input[name="output-mode"], #deduplicate').forEach(el => el.onchange = updateTrans);
});

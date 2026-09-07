const header = document.querySelector('.site-header');
const progress = document.querySelector('#scrollProgress');
const menuToggle = document.querySelector('#menuToggle');
const mobileNav = document.querySelector('#mobileNav');

function updatePageChrome() {
  header?.classList.toggle('scrolled', window.scrollY > 18);
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  if (progress) progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
}

updatePageChrome();
window.addEventListener('scroll', updatePageChrome, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  menuToggle.setAttribute('aria-label', open ? '打开导航菜单' : '关闭导航菜单');
  mobileNav.hidden = open;
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '打开导航菜单');
    mobileNav.hidden = true;
  });
});

const solutions = {
  clinic: {
    kicker: 'FOR CLINICAL TEAMS',
    title: '把复杂脑网络，转化为可执行的诊疗计划。',
    description: '在统一病例空间中完成影像检查、靶点评估、刺激参数比较与过程记录，为多学科讨论提供共同视图。',
    list: ['个体化候选靶点与证据排序', '刺激前方案模拟与复核', '治疗过程记录与纵向疗效报告'],
    value: '更清晰的决策依据',
    output: '输出：病例工作区 · 靶点报告 · 导航计划 · 随访对比'
  },
  research: {
    kicker: 'FOR RESEARCH TEAMS',
    title: '让多模态神经影像研究更快复现、更易协作。',
    description: '把数据管线、连接组分析、刺激仿真与统计输出组织为标准研究工作区，支持队列研究和多中心验证。',
    list: ['可复现的数据处理与质量报告', '算法插件、批量分析与结果对比', '多中心协作与研究资产沉淀'],
    value: '更短的验证路径',
    output: '输出：标准管线 · 队列结果 · 算法报告 · 可复现配置'
  },
  device: {
    kicker: 'FOR DEVICE COMPANIES',
    title: '为神经调控硬件补齐影像、算法与导航智能层。',
    description: '通过 SDK、API 与模块化部署接入现有设备，减少重复研发，快速构建面向新病种和新场景的差异化方案。',
    list: ['靶点、仿真、导航模块按需组合', '硬件位姿、刺激参数与病例系统联动', '联合验证、OEM 与国产化适配'],
    value: '更强的产品差异化',
    output: '输出：SDK / API · OEM 模块 · 设备适配 · 联合方案'
  },
  hospital: {
    kicker: 'FOR HEALTHCARE ORGANIZATIONS',
    title: '建设可管理、可扩展的精准神经调控能力中心。',
    description: '以私有化部署连接科研、临床和设备，统一数据治理、质量标准和病例资产，为学科建设和多中心合作提供底座。',
    list: ['院内数据边界与权限审计', '跨科室标准流程和质量管理', '病例库、科研队列与转化协同'],
    value: '更可持续的能力资产',
    output: '输出：私有平台 · 标准流程 · 质量看板 · 病例资产'
  }
};

const solutionFields = {
  kicker: document.querySelector('#solutionKicker'),
  title: document.querySelector('#solutionTitle'),
  description: document.querySelector('#solutionDescription'),
  value: document.querySelector('#solutionValue'),
  output: document.querySelector('#solutionOutput')
};
const solutionList = document.querySelector('#solutionList');

function animateSwap(elements) {
  elements.filter(Boolean).forEach((element) => {
    if (!element.animate) return;
    element.animate(
      [{ opacity: .15, transform: 'translateY(7px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 300, easing: 'cubic-bezier(.2,.7,.2,1)' }
    );
  });
}

document.querySelectorAll('[data-solution]').forEach((button) => {
  button.addEventListener('click', () => {
    const next = solutions[button.dataset.solution];
    document.querySelectorAll('[data-solution]').forEach((tab) => tab.setAttribute('aria-selected', String(tab === button)));
    Object.entries(solutionFields).forEach(([key, element]) => { if (element) element.textContent = next[key]; });
    if (solutionList) {
      solutionList.replaceChildren(...next.list.map((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        return li;
      }));
    }
    animateSwap([...Object.values(solutionFields), solutionList]);
  });
});

const scenarios = {
  tms: { kicker: 'NON-INVASIVE STIMULATION', title: '难治性抑郁的个体化 TMS 靶点导航', description: '在个体皮层形态上定位左侧前额叶候选靶点，结合 DLPFC–sgACC 功能关系、白质通路与电场覆盖，形成可解释的刺激计划。', input: 'T1w · dMRI · fMRI · 量表', decision: '靶点 · 线圈方向 · 强度', output: '导航计划 · 疗效评估', tags: ['难治性抑郁', '强迫症', '成瘾'] },
  dbs: { kicker: 'INVASIVE NEUROMODULATION', title: '运动障碍的 DBS 环路规划与通路评估', description: '围绕 STN、GPi 等候选核团，融合个体解剖、纤维连接、电极轨迹与刺激体积，比较运动环路覆盖和潜在副作用通路。', input: 'T1w · dMRI · CT · 临床评分', decision: '靶点 · 轨迹 · 接触点 · 参数', output: '通路覆盖 · 风险提示', tags: ['帕金森病', '震颤', '肌张力障碍'] },
  tfus: { kicker: 'TRANSCRANIAL FOCUSED ULTRASOUND', title: '经颅聚焦超声的靶点、声场与安全边界', description: '将颅骨 CT、个体 MRI 与目标脑环路统一到同一空间，辅助选择入射路径，并比较声场聚焦、能量衰减与邻近风险结构。', input: 'T1w · CT · 靶点图谱', decision: '入射路径 · 焦点 · 声学参数', output: '声场方案 · 安全边界', tags: ['深部脑区', '疼痛', '意识障碍研究'] },
  tes: { kicker: 'ELECTRICAL & TEMPORAL INTERFERENCE', title: 'tES / TI 的个体电场优化与网络剂量设计', description: '结合个体头模型、皮层靶点与深部环路目标，比较电极布局、频率组合和场分布，使刺激剂量从设备参数走向网络剂量。', input: 'T1w · CT 可选 · 电极模型', decision: '电极布局 · 频率 · 强度', output: '电场比较 · 参数建议', tags: ['认知调控', '康复', '深部电刺激研究'] },
  bci: { kicker: 'BRAIN–COMPUTER INTERFACE', title: '结构连接与实时脑状态的跨模态闭环', description: '把 EEG/MEG 的动态状态映射到个体白质通路和功能网络，用于探索信息传递路径、状态识别与安全约束下的反馈规则。', input: 'dMRI · EEG/MEG · 行为任务', decision: '脑状态 · 通路 · 反馈规则', output: '实时可视化 · 闭环接口', tags: ['脑状态监测', '神经反馈', '闭环研究'] }
};

const scenarioFields = {
  kicker: document.querySelector('#scenarioKicker'), title: document.querySelector('#scenarioTitle'),
  description: document.querySelector('#scenarioDescription'), input: document.querySelector('#scenarioInput'),
  decision: document.querySelector('#scenarioDecision'), output: document.querySelector('#scenarioOutput')
};
const scenarioTags = document.querySelector('#scenarioTags');

document.querySelectorAll('[data-scenario]').forEach((button) => {
  button.addEventListener('click', () => {
    const next = scenarios[button.dataset.scenario];
    document.querySelectorAll('[data-scenario]').forEach((tab) => tab.setAttribute('aria-selected', String(tab === button)));
    Object.entries(scenarioFields).forEach(([key, element]) => { if (element) element.textContent = next[key]; });
    if (scenarioTags) {
      scenarioTags.replaceChildren(...next.tags.map((item) => {
        const span = document.createElement('span');
        span.textContent = item;
        return span;
      }));
    }
    animateSwap([...Object.values(scenarioFields), scenarioTags]);
  });
});

function addTabKeyboardNavigation(selector) {
  const tabList = document.querySelector(selector);
  if (!tabList) return;
  tabList.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    const tabs = [...tabList.querySelectorAll('[role="tab"]')];
    const current = tabs.indexOf(document.activeElement);
    if (current < 0) return;
    event.preventDefault();
    const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown';
    const next = tabs[(current + (forward ? 1 : -1) + tabs.length) % tabs.length];
    next.focus();
    next.click();
  });
}

addTabKeyboardNavigation('.solution-tabs');
addTabKeyboardNavigation('.scenario-nav');

const productFilm = document.querySelector('#productFilm');
const filmControl = document.querySelector('#filmControl');
let filmUserPaused = false;

function updateFilmControl() {
  if (!productFilm || !filmControl) return;
  const paused = productFilm.paused;
  filmControl.querySelector('span').textContent = paused ? '▶' : 'Ⅱ';
  filmControl.querySelector('b').textContent = paused ? 'PLAY FILM' : 'PAUSE FILM';
  filmControl.setAttribute('aria-label', paused ? '播放产品概念片' : '暂停产品概念片');
}

filmControl?.addEventListener('click', async () => {
  if (productFilm.paused) {
    filmUserPaused = false;
    try { await productFilm.play(); } catch (_) { /* Native media state remains visible. */ }
  } else {
    filmUserPaused = true;
    productFilm.pause();
  }
  updateFilmControl();
});

productFilm?.addEventListener('play', updateFilmControl);
productFilm?.addEventListener('pause', updateFilmControl);

if (productFilm && 'IntersectionObserver' in window) {
  const filmObserver = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting && !filmUserPaused && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        try { await productFilm.play(); } catch (_) { updateFilmControl(); }
      } else if (!entry.isIntersecting) {
        productFilm.pause();
      }
    });
  }, { threshold: .15 });
  filmObserver.observe(productFilm);
}

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  productFilm?.pause();
  updateFilmControl();
}

const consoleButton = document.querySelector('.console-button');
consoleButton?.addEventListener('click', () => {
  const panel = consoleButton.closest('.evidence-panel');
  const expanded = panel.classList.toggle('expanded');
  consoleButton.setAttribute('aria-pressed', String(expanded));
  consoleButton.innerHTML = expanded ? '数据 → 模型 → 推荐 → 参数 <span>✓</span>' : '查看证据链 <span>↗</span>';
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .1, rootMargin: '0px 0px -45px' });
  document.querySelectorAll('.reveal').forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 45}ms`);
    revealObserver.observe(element);
  });
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}

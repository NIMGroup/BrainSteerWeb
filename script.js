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
  tms: { kicker: 'NON-INVASIVE STIMULATION', title: '难治性抑郁的个体化 TMS 靶点导航', description: '在个体皮层形态上定位左侧前额叶候选靶点，结合 DLPFC–sgACC 功能关系、白质通路与电场覆盖，形成可解释的刺激计划。', input: 'T1w · dMRI · fMRI · 量表', decision: '靶点 · 线圈方向 · 强度', output: '导航计划 · 疗效评估', tags: ['难治性抑郁', '强迫症', '成瘾'], image: './assets/clinical-tms-v3.webp', alt: 'TMS 门诊中医生使用光学追踪和患者影像进行个体化刺激定位' },
  dbs: { kicker: 'INVASIVE NEUROMODULATION', title: '运动障碍的 DBS 环路规划与通路评估', description: '围绕 STN、GPi 等候选核团，融合个体解剖、纤维连接、电极轨迹与刺激体积，比较运动环路覆盖和潜在副作用通路。', input: 'T1w · dMRI · CT · 临床评分', decision: '靶点 · 轨迹 · 接触点 · 参数', output: '通路覆盖 · 风险提示', tags: ['帕金森病', '震颤', '肌张力障碍'], image: './assets/clinical-dbs-v3.webp', alt: '神经外科与神经科医生在常规工作站讨论 DBS 靶点和电极轨迹' },
  tfus: { kicker: 'TRANSCRANIAL FOCUSED ULTRASOUND', title: '经颅聚焦超声的靶点、声场与安全边界', description: '将颅骨 CT、个体 MRI 与目标脑环路统一到同一空间，辅助选择入射路径，并比较声场聚焦、能量衰减与邻近风险结构。', input: 'T1w · CT · 靶点图谱', decision: '入射路径 · 焦点 · 声学参数', output: '声场方案 · 安全边界', tags: ['深部脑区', '疼痛', '意识障碍研究'], image: './assets/clinical-dbs-v3.webp', alt: '临床团队在常规医学影像工作站共同复核深部靶点、路径与邻近风险结构' },
  tes: { kicker: 'ELECTRICAL & TEMPORAL INTERFERENCE', title: 'tES / TI 的个体电场优化与网络剂量设计', description: '结合个体头模型、皮层靶点与深部环路目标，比较电极布局、频率组合和场分布，使刺激剂量从设备参数走向网络剂量。', input: 'T1w · CT 可选 · 电极模型', decision: '电极布局 · 频率 · 强度', output: '电场比较 · 参数建议', tags: ['认知调控', '康复', '深部电刺激研究'], image: './assets/clinical-tms-v3.webp', alt: '医生在神经调控门诊使用常规设备和医学影像工作站进行治疗计划' },
  bci: { kicker: 'BRAIN–COMPUTER INTERFACE', title: '结构连接与实时脑状态的跨模态闭环', description: '把 EEG/MEG 的动态状态映射到个体白质通路和功能网络，用于探索信息传递路径、状态识别与安全约束下的反馈规则。', input: 'dMRI · EEG/MEG · 行为任务', decision: '脑状态 · 通路 · 反馈规则', output: '实时可视化 · 闭环接口', tags: ['脑状态监测', '神经反馈', '闭环研究'], image: './assets/clinical-rehab-v3.webp', alt: '脑卒中患者在康复医生指导下进行 EEG 辅助上肢训练' }
};

const scenarioFields = {
  kicker: document.querySelector('#scenarioKicker'), title: document.querySelector('#scenarioTitle'),
  description: document.querySelector('#scenarioDescription'), input: document.querySelector('#scenarioInput'),
  decision: document.querySelector('#scenarioDecision'), output: document.querySelector('#scenarioOutput')
};
const scenarioTags = document.querySelector('#scenarioTags');
const scenarioImage = document.querySelector('#scenarioImage');

document.querySelectorAll('[data-scenario]').forEach((button) => {
  button.addEventListener('click', () => {
    const next = scenarios[button.dataset.scenario];
    document.querySelectorAll('[data-scenario]').forEach((tab) => tab.setAttribute('aria-selected', String(tab === button)));
    Object.entries(scenarioFields).forEach(([key, element]) => { if (element) element.textContent = next[key]; });
    if (scenarioImage) { scenarioImage.src = next.image; scenarioImage.alt = next.alt; }
    if (scenarioTags) {
      scenarioTags.replaceChildren(...next.tags.map((item) => {
        const span = document.createElement('span');
        span.textContent = item;
        return span;
      }));
    }
    animateSwap([...Object.values(scenarioFields), scenarioTags, scenarioImage]);
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
  document.querySelectorAll('video[autoplay]').forEach((video) => video.pause());
  updateFilmControl();
}

const ambientVideos = document.querySelectorAll('video:not(#productFilm)');
if (ambientVideos.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const ambientObserver = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        try { await entry.target.play(); } catch (_) { /* Poster remains visible if autoplay is unavailable. */ }
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: .08 });
  ambientVideos.forEach((video) => ambientObserver.observe(video));
}

const coreModules = [
  { kicker: 'TARGET ENGINE', title: '靶点引擎', tagline: '为 TMS、tFUS、tES、DBS 生成患者个体化候选靶点。', flow: 'MRI → 个体结构 → 图谱映射 → 候选靶点 → 可达性约束', stack: ['ANTs', 'SynthSeg', 'Nilearn', 'neuromaps', 'vtk.js'], owned: '候选靶点生成 · Target Score · 置信度与解释' },
  { kicker: 'CONNECTOME-GUIDED TARGETING', title: '连接组引导靶向', tagline: '把候选脑区升级为与症状和疾病环路相连的个体化网络靶点。', flow: 'dMRI / fMRI → 纤维束与功能网络 → 环路匹配 → 可达靶区', stack: ['MRtrix3', 'TractSeg', 'Nilearn', 'NetworkX'], owned: '环路匹配 · 路径覆盖 · 疾病网络一致性' },
  { kicker: 'REVERSE TARGET DISCOVERY', title: '反向靶点发现引擎', tagline: '从证据、影像表型和真实世界结局反推新的可干预环路。', flow: '文献 / 试验 / 病例 → 知识图谱 → 多智能体 → 候选假设', stack: ['LangGraph', 'LLM', 'Europe PMC', 'scispaCy', 'pgvector', 'DoWhy'], owned: '证据抽取 · 矛盾识别 · 因果假设 · 靶点卡' },
  { kicker: 'MULTIMODAL TARGET RANKING', title: '多模态靶点排序', tagline: '以六维评分和不确定性量化，对候选靶点进行可解释排序。', flow: '生物学 + 影像 + 循证 + 可达性 + 安全 + 转化 → Target Score', stack: ['Pandas', 'scikit-learn', 'Optuna', 'SHAP', 'PyMC'], owned: '六维评分 · A–D 分级 · 置信区间 · 可解释排名' },
  { kicker: 'COORDINATE & NAVIGATION', title: '坐标与实时导航', tagline: '统一影像、靶点、设备和患者空间，持续监测位姿与偏差。', flow: '标志点 / 表面 → 配准 → 实时追踪 → 靶点锁定 → 误差记录', stack: ['OpenIGTLink', 'PlusLib', 'SciKit-Surgery', 'OpenCV', 'Open3D', 'VTK'], owned: '坐标编排 · 设备适配 · 导航质控 · 误差闭环' },
  { kicker: 'TREATMENT PLANNING', title: '治疗计划与场仿真', tagline: '在治疗前比较设备、角度、强度、入射路径与网络覆盖。', flow: '个体头模 → 场计算 → 多参数搜索 → 风险约束 → 方案复核', stack: ['SimNIBS', 'BabelBrain', 'SciPy', 'Optuna'], owned: '跨设备方案空间 · 网络剂量 · 反事实仿真' },
  { kicker: 'CLOSED-LOOP CONTROLLER', title: '实时闭环控制器', tagline: '融合脑状态、运动与生理反馈，在安全边界内更新刺激策略。', flow: 'EEG / MEP / HRV → 状态识别 → 规则与模型 → 参数建议 → 留痕', stack: ['BrainFlow', 'LSL', 'MNE', 'SciPy', 'ONNX Runtime'], owned: '状态估计 · 安全约束 · 在线策略 · 结果回流' },
  { kicker: 'CLINICAL WORKFLOW & UI', title: '临床工作流与界面', tagline: '把影像、证据、仿真、导航、随访组织为同一个病例空间。', flow: '病例 → QC → 决策 → 复核 → 执行 → 报告 → 随访', stack: ['React', 'Cornerstone3D', 'OHIF', 'vtk.js', 'FastAPI', 'PostgreSQL', 'MinIO'], owned: '病例工作区 · 权限审计 · 版本追溯 · 多中心协作' }
];

const moduleFields = {
  index: document.querySelector('#moduleIndex'), kicker: document.querySelector('#moduleKicker'),
  title: document.querySelector('#moduleTitle'), tagline: document.querySelector('#moduleTagline'),
  flow: document.querySelector('#moduleFlow'), owned: document.querySelector('#moduleOwned')
};
const moduleStack = document.querySelector('#moduleStack');

document.querySelectorAll('[data-module]').forEach((button) => {
  button.addEventListener('click', () => {
    const index = Number(button.dataset.module);
    const next = coreModules[index];
    document.querySelectorAll('[data-module]').forEach((tab) => tab.setAttribute('aria-selected', String(tab === button)));
    if (moduleFields.index) moduleFields.index.textContent = `MODULE ${String(index + 1).padStart(2, '0')}`;
    ['kicker', 'title', 'tagline', 'flow', 'owned'].forEach((key) => { if (moduleFields[key]) moduleFields[key].textContent = next[key]; });
    if (moduleStack) {
      moduleStack.replaceChildren(...next.stack.map((item) => {
        const chip = document.createElement('i');
        chip.textContent = item;
        return chip;
      }));
    }
    animateSwap([...Object.values(moduleFields), moduleStack]);
  });
});

addTabKeyboardNavigation('.module-switch');

document.querySelectorAll('[data-engine-tab]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.engineTab;
    document.querySelectorAll('[data-engine-tab]').forEach((tab) => tab.setAttribute('aria-selected', String(tab === button)));
    document.querySelectorAll('[data-engine-panel]').forEach((panel) => { panel.hidden = panel.dataset.enginePanel !== target; });
  });
});

addTabKeyboardNavigation('.engine-tabs');

const agents = [
  ['文献侦察智能体', '持续扫描论文、指南、临床试验与会议摘要', '输出：新靶点线索与证据增量'],
  ['证据分级智能体', '依据研究设计、样本量、一致性与偏倚风险分层', '输出：E0–E5 证据等级'],
  ['环路映射智能体', '把候选靶点映射到功能网络与白质通路', '输出：环路坐标与网络覆盖'],
  ['影像表型智能体', '分析 MRI、dMRI、fMRI 与 EEG 的个体异常模式', '输出：患者特异异常环路'],
  ['靶点生成智能体', '融合症状、机制和可达性生成候选靶点与策略', '输出：候选靶点集合与靶点卡'],
  ['刺激仿真智能体', '比较刺激场、网络覆盖、反事实参数与风险边界', '输出：仿真排序与备选计划'],
  ['临床策略智能体', '把靶点、设备与患者条件转译为可执行疗程', '输出：待医生复核的治疗策略'],
  ['安全合规智能体', '识别禁忌证、不良事件、适应证与注册边界', '输出：风险提示与使用边界'],
  ['试验设计智能体', '定义验证终点、样本量、分层方法和统计方案', '输出：前瞻性验证方案草案'],
  ['真实世界学习智能体', '从参数、过程、随访与结局中持续校准评分', '输出：模型更新与下一疗程建议']
];

const agentRole = document.querySelector('#agentRole');
const agentMission = document.querySelector('#agentMission');
const agentOutput = document.querySelector('#agentOutput');
document.querySelectorAll('[data-agent]').forEach((button) => {
  button.addEventListener('click', () => {
    const next = agents[Number(button.dataset.agent)];
    document.querySelectorAll('[data-agent]').forEach((item) => item.classList.toggle('active', item === button));
    if (agentRole) agentRole.textContent = next[0];
    if (agentMission) agentMission.textContent = next[1];
    if (agentOutput) agentOutput.textContent = next[2];
    animateSwap([agentRole, agentMission, agentOutput]);
  });
});
document.querySelector('[data-agent="0"]')?.classList.add('active');

const simulation = {
  offset: document.querySelector('#offsetControl'), angle: document.querySelector('#angleControl'),
  intensity: document.querySelector('#intensityControl'), state: document.querySelector('#stateControl')
};
const simulationValues = {
  offset: document.querySelector('#offsetValue'), angle: document.querySelector('#angleValue'),
  intensity: document.querySelector('#intensityValue'), state: document.querySelector('#stateValue')
};
const simulationOutputs = {
  coverage: [document.querySelector('#coverageBar'), document.querySelector('#coverageValue')],
  offTarget: [document.querySelector('#offTargetBar'), document.querySelector('#offTargetValue')],
  safety: [document.querySelector('#safetyBar'), document.querySelector('#safetyValue')],
  uncertainty: [document.querySelector('#uncertaintyBar'), document.querySelector('#uncertaintyValue')]
};
const stateNames = ['静息', '任务态', '疲劳'];
const clamp = (value, min = 0, max = 100) => Math.min(max, Math.max(min, value));

function updateSimulation() {
  if (!simulation.offset || !simulation.angle || !simulation.intensity || !simulation.state) return;
  const offset = Number(simulation.offset.value);
  const angle = Number(simulation.angle.value);
  const intensity = Number(simulation.intensity.value);
  const state = Number(simulation.state.value);
  const coverage = clamp(Math.round(94 - Math.abs(offset) * 3.8 - Math.abs(angle) * .55 - Math.abs(intensity - 100) * .28 - state * 7));
  const offTarget = clamp(Math.round(14 + Math.abs(offset) * 3.2 + Math.abs(angle) * .35 + Math.max(0, intensity - 100) * .8 + state * 4));
  const safety = clamp(Math.round(92 - Math.max(0, intensity - 100) * 1.5 - Math.abs(angle) * .25 - state * 5));
  const uncertainty = clamp(Math.round(12 + state * 17 + Math.abs(offset) * 1.4 + Math.abs(angle) * .25));
  simulationValues.offset.textContent = `${offset > 0 ? '+' : ''}${offset} mm`;
  simulationValues.angle.textContent = `${angle > 0 ? '+' : ''}${angle}°`;
  simulationValues.intensity.textContent = `${intensity}%`;
  simulationValues.state.textContent = stateNames[state];
  Object.entries({ coverage, offTarget, safety, uncertainty }).forEach(([key, value]) => {
    const [bar, label] = simulationOutputs[key];
    if (bar) bar.style.width = `${value}%`;
    if (label) label.textContent = value;
  });
  const focus = document.querySelector('#fieldFocus');
  const reticle = document.querySelector('#fieldReticle');
  const x = 58 + offset;
  const y = 38 + state * 1.8;
  if (focus) {
    focus.style.left = `${x}%`;
    focus.style.top = `${y}%`;
    focus.style.width = `${clamp(210 + (intensity - 100) * 3, 130, 270)}px`;
  }
  if (reticle) {
    reticle.style.left = `${x}%`;
    reticle.style.top = `${y}%`;
    reticle.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
  }
  const advice = document.querySelector('#simAdvice');
  if (advice) {
    if (safety < 68 || offTarget > 54) advice.textContent = '安全余量降低或非目标暴露偏高；建议减小强度并重新搜索角度。';
    else if (coverage < 70) advice.textContent = '目标覆盖不足；建议回到候选靶点与入射方向进行联合优化。';
    else if (uncertainty > 48) advice.textContent = '脑状态不确定性较高；建议补充实时信号并进入闭环监测。';
    else advice.textContent = '目标覆盖充分；当前方案可进入医生复核。';
  }
}

Object.values(simulation).forEach((control) => control?.addEventListener('input', updateSimulation));
document.querySelectorAll('[data-sim-preset]').forEach((button) => {
  button.addEventListener('click', () => {
    const preset = button.dataset.simPreset;
    const values = { offset: [5, 0, 100, 0], angle: [0, 15, 100, 0], intensity: [0, 0, 90, 0], fatigue: [0, 0, 100, 2], reset: [0, 0, 100, 0] }[preset];
    if (!values) return;
    [simulation.offset, simulation.angle, simulation.intensity, simulation.state].forEach((control, index) => { if (control) control.value = values[index]; });
    updateSimulation();
  });
});
updateSimulation();

const radarProducts = {
  brainlab: { name: 'Brainlab', type: '神经外科导航平台', title: 'BrainSteer 的差异：从术中导航扩展到神经调控治疗闭环。', tags: ['多设备调控', '环路靶点', '闭环随访'], scores: [3.4, 2.4, 5, 2.2, 3.3, 4] },
  localite: { name: 'Localite', type: 'TMS 神经导航', title: 'BrainSteer 的差异：让定位、环路证据、场仿真与疗效学习贯通。', tags: ['多模态融合', '治疗决策', '真实世界学习'], scores: [2.7, 1.7, 4.6, 2, 2.5, 2.7] },
  nexstim: { name: 'Nexstim', type: 'nTMS 定位与功能映射', title: 'BrainSteer 的差异：设备中立，并把连接组与多疗程反馈纳入同一系统。', tags: ['设备中立', '连接组靶向', '纵向闭环'], scores: [4, 2, 4.3, 2, 2.7, 2.3] },
  zeta: { name: 'Zeta TMS', type: 'TMS 导航与机器人定位', title: 'BrainSteer 的差异：从空间自动化扩展到靶点发现和网络剂量。', tags: ['新靶点发现', '反事实仿真', '多设备平台'], scores: [3, 1.7, 4.1, 1.6, 2.3, 2.6] },
  quicktome: { name: 'Quicktome', type: '连接组手术规划', title: 'BrainSteer 的差异：面向多类神经调控设备，连接治疗前、中、后。', tags: ['刺激仿真', '实时反馈', '疗效报告'], scores: [4.2, 5, 2.4, 2.7, 3.4, 3.3] }
};
const radarLabels = ['多模态影像', '环路靶向', '实时导航', '闭环反馈', '疗效报告', '开放集成'];
const radarCenter = { x: 310, y: 260 };
const radarRadius = 180;
const svgNS = 'http://www.w3.org/2000/svg';
function radarPoint(index, value, radius = radarRadius) {
  const angle = -Math.PI / 2 + index * (Math.PI * 2 / radarLabels.length);
  const scale = value / 5;
  return [radarCenter.x + Math.cos(angle) * radius * scale, radarCenter.y + Math.sin(angle) * radius * scale];
}
function radarPoints(values) { return values.map((value, index) => radarPoint(index, value).join(',')).join(' '); }

const radarGrid = document.querySelector('#radarGrid');
const radarLabelLayer = document.querySelector('#radarLabels');
if (radarGrid && radarLabelLayer) {
  for (let level = 1; level <= 5; level += 1) {
    const polygon = document.createElementNS(svgNS, 'polygon');
    polygon.setAttribute('points', radarPoints(new Array(radarLabels.length).fill(level)));
    polygon.setAttribute('class', 'radar-grid-line');
    radarGrid.append(polygon);
  }
  radarLabels.forEach((label, index) => {
    const edge = radarPoint(index, 5);
    const labelPoint = radarPoint(index, 5, radarRadius + 43);
    const axis = document.createElementNS(svgNS, 'line');
    axis.setAttribute('x1', radarCenter.x); axis.setAttribute('y1', radarCenter.y);
    axis.setAttribute('x2', edge[0]); axis.setAttribute('y2', edge[1]); axis.setAttribute('class', 'radar-axis');
    radarGrid.append(axis);
    const text = document.createElementNS(svgNS, 'text');
    text.setAttribute('x', labelPoint[0]); text.setAttribute('y', labelPoint[1]); text.setAttribute('class', 'radar-label'); text.textContent = label;
    radarLabelLayer.append(text);
  });
}
const brainsteerRadar = document.querySelector('#radarBrainsteer');
const competitorRadar = document.querySelector('#radarCompetitor');
if (brainsteerRadar) brainsteerRadar.setAttribute('points', radarPoints([5, 5, 5, 5, 5, 5]));

function updateRadar(key) {
  const product = radarProducts[key];
  if (!product) return;
  if (competitorRadar) competitorRadar.setAttribute('points', radarPoints(product.scores));
  const dots = document.querySelector('#radarDots');
  if (dots) {
    dots.replaceChildren();
    [5, 5, 5, 5, 5, 5].forEach((value, index) => {
      const point = radarPoint(index, value); const dot = document.createElementNS(svgNS, 'circle');
      dot.setAttribute('cx', point[0]); dot.setAttribute('cy', point[1]); dot.setAttribute('r', 3); dot.setAttribute('class', 'radar-dot'); dots.append(dot);
    });
    product.scores.forEach((value, index) => {
      const point = radarPoint(index, value); const dot = document.createElementNS(svgNS, 'circle');
      dot.setAttribute('cx', point[0]); dot.setAttribute('cy', point[1]); dot.setAttribute('r', 3); dot.setAttribute('class', 'radar-dot competitor-dot'); dots.append(dot);
    });
  }
  const name = document.querySelector('#radarCompetitorName');
  const type = document.querySelector('#benchmarkType');
  const title = document.querySelector('#benchmarkTitle');
  const tags = document.querySelector('#benchmarkTags');
  if (name) name.textContent = product.name;
  if (type) type.textContent = product.type;
  if (title) title.textContent = product.title;
  if (tags) tags.replaceChildren(...product.tags.map((tag) => { const item = document.createElement('i'); item.textContent = tag; return item; }));
  animateSwap([name, type, title, tags]);
}
document.querySelectorAll('[data-radar-product]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-radar-product]').forEach((tab) => tab.setAttribute('aria-selected', String(tab === button)));
    updateRadar(button.dataset.radarProduct);
  });
});
addTabKeyboardNavigation('.product-picker');
updateRadar('brainlab');

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

'use strict';

(() => {
  const html = String.raw`<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>LVGL + FreeRTOS 从零到项目 · 初学者学习路线</title>
  <style>
    :root{--guide-bg:#08121f;--guide-panel:#101d2d;--guide-panel-2:#142438;--guide-line:#294057;--guide-text:#e9f4f1;--guide-muted:#95a8b7;--guide-mint:#6fe8b3;--guide-cyan:#67d1df;--guide-warn:#ffbd73}
    *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--guide-bg);color:var(--guide-text);font:16px/1.75 "Microsoft YaHei","PingFang SC",sans-serif}.study-guide{max-width:1120px;margin:auto;padding:42px 26px 96px}.guide-hero{padding:36px;border:1px solid var(--guide-line);border-radius:20px;background:radial-gradient(circle at 90% 0,rgba(111,232,179,.14),transparent 32%),linear-gradient(145deg,#12243a,#0c1827)}.guide-kicker{color:var(--guide-mint);font:600 12px Consolas,monospace;letter-spacing:.16em}.guide-hero h1{max-width:780px;margin:12px 0 14px;font-size:clamp(34px,5vw,62px);line-height:1.15;letter-spacing:-.04em}.guide-hero p{max-width:760px;margin:0;color:var(--guide-muted);font-size:18px}.guide-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:28px}.guide-stat{padding:15px;border:1px solid var(--guide-line);border-radius:10px;background:rgba(8,18,31,.58)}.guide-stat b,.guide-stat span{display:block}.guide-stat b{color:var(--guide-mint);font:600 24px Consolas,monospace}.guide-stat span{color:var(--guide-muted);font-size:12px}.guide-nav{position:sticky;top:0;z-index:5;display:flex;gap:8px;margin:18px 0 38px;padding:10px;border:1px solid var(--guide-line);border-radius:12px;background:rgba(8,18,31,.9);backdrop-filter:blur(14px);overflow:auto}.guide-nav a{padding:7px 12px;border-radius:7px;color:var(--guide-muted);font-size:13px;text-decoration:none;white-space:nowrap}.guide-nav a:hover{color:#08121f;background:var(--guide-mint)}.guide-section{margin-top:58px;scroll-margin-top:80px}.section-label{color:var(--guide-cyan);font:600 11px Consolas,monospace;letter-spacing:.15em}.guide-section h2{margin:7px 0 10px;font-size:clamp(27px,4vw,42px);line-height:1.25}.section-intro{max-width:820px;margin:0 0 24px;color:var(--guide-muted)}.phase-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.phase{padding:24px;border:1px solid var(--guide-line);border-radius:16px;background:var(--guide-panel)}.phase header{display:flex;justify-content:space-between;gap:12px;color:var(--guide-mint);font:600 11px Consolas,monospace}.phase h3{margin:18px 0 7px;font-size:22px}.phase p{margin:0;color:var(--guide-muted);font-size:14px}.phase ul{margin:18px 0 0;padding:0;list-style:none}.phase li{padding:9px 0;border-top:1px solid var(--guide-line);font-size:14px}.phase li::before{content:"□";margin-right:10px;color:var(--guide-mint)}.phase output{display:block;margin-top:16px;padding:10px 12px;border-radius:8px;color:#10261e;background:var(--guide-mint);font-size:12px;font-weight:700}.mental-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.panel{padding:24px;border:1px solid var(--guide-line);border-radius:16px;background:var(--guide-panel)}.panel h3{margin:0 0 12px}.tree{font:14px/2 Consolas,monospace;color:#cfe0dc}.tree b{color:var(--guide-mint)}.rule{margin-top:16px;padding:12px 14px;border-left:3px solid var(--guide-mint);background:#0a1726;color:var(--guide-muted);font-size:13px}pre{margin:0;padding:22px;border:1px solid var(--guide-line);border-radius:12px;background:#06101b;color:#c8f6e0;overflow:auto;font:13px/1.75 Consolas,monospace}code{font-family:Consolas,monospace}.lesson{margin-top:14px;border:1px solid var(--guide-line);border-radius:16px;background:var(--guide-panel);overflow:hidden}.lesson-head{padding:22px 24px;border-bottom:1px solid var(--guide-line);background:var(--guide-panel-2)}.lesson-head small{color:var(--guide-mint);font:600 11px Consolas,monospace}.lesson-head h3{margin:6px 0 0;font-size:21px}.lesson-body{display:grid;grid-template-columns:.9fr 1.1fr;gap:22px;padding:24px}.lesson-points{display:grid;gap:12px}.lesson-point{padding:13px 14px;border-radius:9px;background:#0b1725}.lesson-point b,.lesson-point span{display:block}.lesson-point b{margin-bottom:3px;color:var(--guide-cyan);font-size:12px}.lesson-point span{color:var(--guide-muted);font-size:13px}.choose-table{border:1px solid var(--guide-line);border-radius:14px;overflow:hidden}.choose-row{display:grid;grid-template-columns:1.1fr .75fr 1.4fr;gap:14px;padding:14px 18px;border-top:1px solid var(--guide-line);background:var(--guide-panel);font-size:13px}.choose-row:first-child{border-top:0}.choose-row.head{color:var(--guide-muted);background:#0a1726;font:600 11px Consolas,monospace}.choose-row strong{color:var(--guide-mint)}.architecture{display:grid;grid-template-columns:1fr 160px 1fr;gap:18px;align-items:center;padding:24px;border:1px solid var(--guide-line);border-radius:16px;background:var(--guide-panel)}.task-stack{display:grid;gap:9px}.task{padding:13px 15px;border:1px solid var(--guide-line);border-radius:9px;background:#0b1725}.task b,.task span{display:block}.task b{font-size:14px}.task span{color:var(--guide-muted);font-size:11px}.queue{text-align:center;color:var(--guide-mint);font:600 12px Consolas,monospace}.queue i{display:block;height:2px;margin:12px 0;background:linear-gradient(90deg,var(--guide-cyan),var(--guide-mint));position:relative}.queue i::after{content:"→";position:absolute;right:-3px;top:-14px;color:var(--guide-mint);font-size:20px}.ui-task{border-color:#39735d;background:#102921}.danger{margin-top:14px;padding:16px 18px;border:1px solid rgba(255,189,115,.45);border-radius:11px;color:#dbc09e;background:rgba(255,189,115,.08);font-size:14px}.danger b{color:var(--guide-warn)}.chapter-map{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.chapter{padding:14px;border:1px solid var(--guide-line);border-radius:9px;background:var(--guide-panel);font-size:13px}.chapter span{display:block;color:var(--guide-cyan);font:600 10px Consolas,monospace}.topic-groups{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.topic-group{padding:20px;border:1px solid var(--guide-line);border-radius:13px;background:var(--guide-panel)}.topic-group h3{margin:0 0 8px;color:var(--guide-mint);font-size:16px}.topic-group p{margin:0;color:var(--guide-muted);font-size:13px}.project-steps{counter-reset:step;display:grid;gap:10px}.project-step{counter-increment:step;display:grid;grid-template-columns:44px 1fr;gap:14px;padding:18px;border:1px solid var(--guide-line);border-radius:12px;background:var(--guide-panel)}.project-step::before{content:counter(step,decimal-leading-zero);display:grid;place-items:center;width:42px;height:42px;border-radius:9px;color:#07151f;background:var(--guide-mint);font:700 13px Consolas,monospace}.project-step h3{margin:0 0 4px;font-size:16px}.project-step p{margin:0;color:var(--guide-muted);font-size:13px}.source-note{margin-top:42px;padding:20px;border:1px dashed #3c566e;border-radius:12px;color:var(--guide-muted);font-size:13px}.source-note b{color:var(--guide-text)}
    @media(max-width:760px){.study-guide{padding:24px 16px 70px}.guide-hero{padding:24px}.guide-stats,.phase-grid,.mental-grid,.topic-groups{grid-template-columns:1fr}.lesson-body{grid-template-columns:1fr}.choose-row{grid-template-columns:1fr}.choose-row.head{display:none}.architecture{grid-template-columns:1fr}.queue i{transform:rotate(90deg);margin:28px auto;width:70px}.chapter-map{grid-template-columns:1fr 1fr}}
  </style>
</head>
<body>
<article class="study-guide">
  <header class="guide-hero">
    <div class="guide-kicker">BEGINNER PATH · LVGL × FREERTOS</div>
    <h1>从一个对象开始，做出真正会动的嵌入式界面</h1>
    <p>这不是 API 大全。每一节都先回答“它解决什么问题”，再给最小代码、预期现象、常见错误和真实项目用法。</p>
    <div class="guide-stats"><div class="guide-stat"><b>4</b><span>学习阶段</span></div><div class="guide-stat"><b>19</b><span>FreeRTOS 章节脉络</span></div><div class="guide-stat"><b>163</b><span>LVGL 原始主题</span></div><div class="guide-stat"><b>1</b><span>最终融合项目</span></div></div>
  </header>

  <nav class="guide-nav"><a href="#route">学习路线</a><a href="#lvgl">LVGL 核心</a><a href="#rtos">FreeRTOS 核心</a><a href="#together">融合架构</a><a href="#map">章节地图</a><a href="#project">最终项目</a></nav>

  <section class="guide-section" id="route">
    <div class="section-label">01 · LEARNING ROUTE</div><h2>四段式学习路线</h2><p class="section-intro">一次只增加少量新概念。每个阶段都有一个可运行成果，避免“学了很多 API，仍然不会做项目”。</p>
    <div class="phase-grid">
      <section class="phase"><header><span>PHASE 01</span><span>先跑起来</span></header><h3>LVGL 入门</h3><p>建立刷新循环、对象树和事件回调的基本模型。</p><ul><li>Hello World</li><li>对象与父子关系</li><li>Label、Button 与 Event</li></ul><output>成果：一个能点击并改变状态的界面</output></section>
      <section class="phase"><header><span>PHASE 02</span><span>组织界面</span></header><h3>布局与视觉</h3><p>从手调坐标过渡到可维护、可复用的页面结构。</p><ul><li>盒子模型与 Style</li><li>Flex / Grid</li><li>图片、字体、动画与页面切换</li></ul><output>成果：一个多页面设备仪表盘</output></section>
      <section class="phase"><header><span>PHASE 03</span><span>任务协作</span></header><h3>FreeRTOS 基础</h3><p>从“同时做事”走向职责清晰的任务与通信。</p><ul><li>Task、Tick 与调度</li><li>Queue 与任务通知</li><li>Semaphore、Mutex 与 Event Group</li></ul><output>成果：传感器任务 + 显示任务</output></section>
      <section class="phase"><header><span>PHASE 04</span><span>真实项目</span></header><h3>FreeRTOS × LVGL</h3><p>用单一 UI Task、消息队列和状态数据组织完整工程。</p><ul><li>线程安全</li><li>消息驱动架构</li><li>网络 / 音频 / UI 协作</li></ul><output>成果：可扩展的 AI 语音助手 UI</output></section>
    </div>
  </section>

  <section class="guide-section" id="lvgl">
    <div class="section-label">02 · LVGL MENTAL MODEL</div><h2>先理解对象，再学习控件</h2><p class="section-intro">按钮、标签和图像都不是孤立函数。它们是对象树上的节点，拥有父子关系、大小、位置、样式、状态和事件。</p>
    <div class="mental-grid">
      <div class="panel"><h3>对象树</h3><div class="tree"><b>Screen</b> · lv_screen_active()<br>├─ <b>Label</b> · 状态标题<br>├─ <b>Button</b> · 父对象<br>│&nbsp;&nbsp;└─ <b>Label</b> · 按钮文字<br>└─ <b>Image</b> · 设备图标</div><div class="rule">创建控件时传入谁，谁就是它的父对象。父对象决定坐标参考、裁剪、滚动和部分样式继承。</div></div>
      <div><pre><code>lv_obj_t *btn = lv_button_create(
    lv_screen_active());

lv_obj_t *label = lv_label_create(btn);
lv_label_set_text(label, "Hello");
lv_obj_center(btn);</code></pre><div class="rule">运行后：屏幕中央出现一个带 “Hello” 文字的按钮。如果没有刷新，先检查 Tick 和 lv_timer_handler()。</div></div>
    </div>

    <section class="lesson"><header class="lesson-head"><small>LESSON · EVENT</small><h3>按钮为什么需要事件？</h3></header><div class="lesson-body"><div class="lesson-points"><div class="lesson-point"><b>解决什么</b><span>把“用户做了什么”和“程序如何响应”连接起来。</span></div><div class="lesson-point"><b>什么时候用</b><span>点击、按下、值改变、滚动、获得焦点或自定义消息。</span></div><div class="lesson-point"><b>最容易错</b><span>混淆事件目标和当前冒泡目标；回调中保留失效的局部变量指针。</span></div><div class="lesson-point"><b>真实项目</b><span>一个公共回调处理多个按钮，通过 user_data 区分功能。</span></div></div><pre><code>static void btn_cb(lv_event_t *e)
{
    lv_obj_t *label = lv_event_get_user_data(e);
    lv_label_set_text(label, "Clicked!");
}

lv_obj_add_event_cb(btn, btn_cb,
                    LV_EVENT_CLICKED, label);</code></pre></div></section>
  </section>

  <section class="guide-section" id="rtos">
    <div class="section-label">03 · FREERTOS FROM PROBLEMS</div><h2>先判断问题，再选择工具</h2><p class="section-intro">裸机轮询的问题是：一个函数耗时，其他事情全部等待。RTOS 先把职责拆成任务，再明确任务之间怎样交换数据、信号和资源所有权。</p>
    <div class="choose-table"><div class="choose-row head"><span>实际问题</span><span>选择</span><span>记住这句话</span></div><div class="choose-row"><span>传一份带内容的数据</span><strong>Queue</strong><span>消息有内容，也有顺序</span></div><div class="choose-row"><span>通知某件事发生了</span><strong>Binary Semaphore</strong><span>只关心信号，不关心数据</span></div><div class="choose-row"><span>保护串口、文件系统等共享资源</span><strong>Mutex</strong><span>谁拿锁，谁释放；支持优先级继承</span></div><div class="choose-row"><span>等待多个条件中的任意或全部</span><strong>Event Group</strong><span>一组 bit 表示一组系统状态</span></div><div class="choose-row"><span>固定任务之间快速通知</span><strong>Task Notification</strong><span>轻量高效，但属于指定任务</span></div><div class="choose-row"><span>周期执行非阻塞工作</span><strong>Software Timer</strong><span>回调运行在定时器守护任务中</span></div></div>

    <section class="lesson"><header class="lesson-head"><small>LESSON · QUEUE</small><h3>让传感器任务把数据交给 UI Task</h3></header><div class="lesson-body"><div class="lesson-points"><div class="lesson-point"><b>解决什么</b><span>数据生产者不需要知道界面控件细节。</span></div><div class="lesson-point"><b>预期现象</b><span>UI Task 收到温度消息后更新 Label。</span></div><div class="lesson-point"><b>最容易错</b><span>item size 配错；把局部变量地址放入队列；永久阻塞 UI 刷新。</span></div><div class="lesson-point"><b>真实项目</b><span>按键、传感器和网络任务都发送统一的 ui_msg_t。</span></div></div><pre><code>typedef struct {
    uint8_t type;
    float value;
} ui_msg_t;

QueueHandle_t ui_queue =
    xQueueCreate(8, sizeof(ui_msg_t));

ui_msg_t msg = { UI_TEMP, 24.6f };
xQueueSend(ui_queue, &msg, portMAX_DELAY);</code></pre></div></section>
  </section>

  <section class="guide-section" id="together">
    <div class="section-label">04 · ONE UI TASK RULE</div><h2>把二者组合成一个项目</h2><p class="section-intro">LVGL 默认不是线程安全的。对初学者最可靠的结构是：只有 UI Task 调用 LVGL，其他任务把消息送进队列。</p>
    <div class="architecture"><div class="task-stack"><div class="task"><b>Button Task</b><span>按键事件</span></div><div class="task"><b>Sensor Task</b><span>温湿度数据</span></div><div class="task"><b>Network Task</b><span>AI / 网络结果</span></div></div><div class="queue">UI Message Queue<i></i>ui_msg_t</div><div class="task ui-task"><b>UI Task</b><span>唯一调用 LVGL<br>处理消息 + lv_timer_handler()</span></div></div>
    <div class="danger"><b>三条底线：</b>只在一个任务中修改 UI；队列优先传结构体副本而非短命指针；中断只做最少工作并使用 FromISR API。</div>
    <div style="margin-top:14px"><pre><code>void ui_task(void *arg)
{
    ui_msg_t msg;
    for (;;) {
        while (xQueueReceive(ui_queue, &msg, 0) == pdTRUE) {
            ui_apply_message(&msg);   // 只在这里调用 LVGL
        }
        lv_timer_handler();
        vTaskDelay(pdMS_TO_TICKS(5));
    }
}</code></pre></div>
  </section>

  <section class="guide-section" id="map">
    <div class="section-label">05 · SOURCE MAP</div><h2>原始资料的章节地图</h2><p class="section-intro">主路线负责理解，章节地图负责深入查阅。FreeRTOS 原稿共 19 章；LVGL 资料共 163 个主题、274 页。</p>
    <div class="chapter-map"><div class="chapter"><span>01</span>课程介绍</div><div class="chapter"><span>02</span>单片机程序设计模式</div><div class="chapter"><span>03</span>搭建开发环境</div><div class="chapter"><span>04</span>开发板使用</div><div class="chapter"><span>05</span>硬件模块与驱动</div><div class="chapter"><span>06</span>创建 FreeRTOS 工程</div><div class="chapter"><span>07</span>源码与移植结构</div><div class="chapter"><span>08</span>内存管理与 Heap</div><div class="chapter"><span>09</span>任务、Tick 与调度</div><div class="chapter"><span>10</span>同步、互斥与通信</div><div class="chapter"><span>11</span>Queue 与 Queue Set</div><div class="chapter"><span>12</span>Semaphore</div><div class="chapter"><span>13</span>Mutex 与优先级继承</div><div class="chapter"><span>14</span>Event Group</div><div class="chapter"><span>15</span>Task Notification</div><div class="chapter"><span>16</span>Software Timer</div><div class="chapter"><span>17</span>中断管理与 FromISR</div><div class="chapter"><span>18</span>资源管理</div><div class="chapter"><span>19</span>调试与优化</div></div>
    <div class="topic-groups" style="margin-top:18px"><div class="topic-group"><h3>准备与移植</h3><p>开发环境、源码目录、启动流程、裁剪、编译、显示驱动、触摸驱动、LV_LOG、LTDC、GT911。</p></div><div class="topic-group"><h3>对象与核心机制</h3><p>lv_obj、大小、位置、盒子模型、Style、状态与部分、Event、事件冒泡、lv_timer。</p></div><div class="topic-group"><h3>常用控件</h3><p>Label、Button、Bar、Slider、Arc、Spinner、List、Switch、Table、Chart、Image、Menu 等 30 余类。</p></div><div class="topic-group"><h3>布局与输入</h3><p>Flex、Grid、触摸、Button、Encoder、Keypad、Group、物理按键、背光和交互反馈。</p></div><div class="topic-group"><h3>文件与资源</h3><p>lv_fs、FATFS、SD 卡图片、字体 BIN、FreeType、二维码、条形码、文件资源管理器。</p></div><div class="topic-group"><h3>进阶与融合</h3><p>FreeRTOS 适配、线程安全、外部 RAM、动画、开源项目移植、LV_LOG、LV_SYSMON 与 Monkey 测试。</p></div></div>
  </section>

  <section class="guide-section" id="project">
    <div class="section-label">06 · FINAL PROJECT</div><h2>最终项目：AI 语音助手 UI</h2><p class="section-intro">目标不是堆功能，而是用一套清楚的消息架构把输入、网络、音频和界面连接起来。</p>
    <div class="project-steps"><div class="project-step"><div><h3>搭建 UI Task</h3><p>初始化 LVGL、创建页面与控件、稳定调用 lv_timer_handler()。</p></div></div><div class="project-step"><div><h3>定义统一消息</h3><p>用 ui_msg_t 描述按键、传感器、录音状态、网络结果和错误。</p></div></div><div class="project-step"><div><h3>接入输入任务</h3><p>物理按键或编码器任务把用户动作发送给 UI Task。</p></div></div><div class="project-step"><div><h3>接入 Network Task</h3><p>网络请求不阻塞界面，结果通过 Queue 返回。</p></div></div><div class="project-step"><div><h3>接入 Audio Task</h3><p>录音、播放和状态指示各司其职，UI 只展示状态。</p></div></div><div class="project-step"><div><h3>调试与压力测试</h3><p>检查堆栈余量、队列拥塞、刷新周期、断言、日志与长时间运行稳定性。</p></div></div></div>
  </section>

  <aside class="source-note"><b>资料来源说明：</b>本路线依据项目内的《FreeRTOS 入门与工程实践（基于 DshanMCU-103）》以及“百问网 LVGL 笔记”163 份 PDF 重组。它负责建立学习顺序与项目心智模型；具体硬件接线、驱动配置和完整 API 细节仍以原始资料为准。</aside>
</article>
</body>
</html>`;

  if (!Array.isArray(window.KNOWLEDGE_BASE_MODULES)) {
    throw new Error('请先加载 modules-data.js');
  }

  window.KNOWLEDGE_BASE_MODULES.push({
    id: 'beginner-path',
    title: 'LVGL + FreeRTOS 从零到项目 · 初学者学习路线',
    shortTitle: '从零到项目',
    summary: '从对象、事件和布局开始，学习任务、Queue、Mutex 与线程安全，最终完成 FreeRTOS + LVGL 消息驱动项目。',
    group: '学习路线',
    tags: ['初学者', 'LVGL', 'FreeRTOS', 'Queue', '线程安全', '项目架构'],
    accent: '#6FE8B3',
    fileName: 'LVGL_FreeRTOS_从零到项目_初学者学习路线.html',
    size: new TextEncoder().encode(html).length,
    sha256: 'CURATED-FROM-LOCAL-PDF-SOURCES',
    html
  });
})();

'use strict';

window.LVGL_ENTRANCE_CONTENT = Object.freeze({
  title: 'Pro-X',
  eyebrow: 'EMBEDDED EXPLORATION LOG · 01—02',
  statement: '从实时内核出发，再让界面真正活起来。',
  attribution: '两段航程，一条完整的嵌入式 GUI 工程路线',
  footer: 'DShanMCU-F103 · FreeRTOS · LVGL',
  routes: Object.freeze([
    Object.freeze({
      id: 'freertos',
      order: '01',
      kicker: 'SYSTEM ORBIT · FIRST STOP',
      title: 'FreeRTOS',
      subtitle: '先让系统会协作',
      summary: '从裸机循环切入任务、调度与通信，理解实时系统如何把并发工作拆成职责清晰、可观测、可扩展的工程。',
      href: './KnowledgeBase/index.html?module=freertos-f103',
      accent: '#b9ff4a',
      stats: Object.freeze([
        Object.freeze({ value: '19', label: '章工程脉络' }),
        Object.freeze({ value: 'F103', label: '上板目标' })
      ]),
      milestones: Object.freeze(['Task / Tick / 调度', 'Queue / Mutex / 通知', 'FromISR / 资源 / 调试']),
      insight: '终点不是“会创建任务”，而是能用消息流隔离业务与界面。',
      cta: '进入实时系统航道'
    }),
    Object.freeze({
      id: 'lvgl',
      order: '02',
      kicker: 'VISUAL ORBIT · NEXT STOP',
      title: 'LVGL',
      subtitle: '再让交互有生命力',
      summary: '沿对象树、样式、状态与事件建立界面心智模型，再深入布局、输入设备、文件资源、动画与性能调试。',
      href: './KnowledgeBase/index.html?module=designer-api',
      accent: '#62e7ff',
      stats: Object.freeze([
        Object.freeze({ value: '163', label: '个专题' }),
        Object.freeze({ value: '274', label: '页知识图谱' })
      ]),
      milestones: Object.freeze(['对象 / Style / Event', 'Flex / Grid / 输入设备', 'FATFS / 动画 / 性能']),
      insight: '终点不是“堆出页面”，而是让 UI Task 成为唯一的 LVGL 状态入口。',
      cta: '进入图形界面航道'
    })
  ])
});

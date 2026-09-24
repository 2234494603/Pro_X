'use strict';

document.getElementById('entranceRoot').innerHTML = String.raw`
  <div class="entrance-backdrop" aria-hidden="true">
    <video class="entrance-video" autoplay muted loop playsinline preload="metadata" tabindex="-1">
      <source src="./MP4/14512643_1920_1080_24fps.mp4" type="video/mp4">
    </video>
    <span class="entrance-stars"></span>
    <span class="entrance-scrim"></span>
    <span class="space-orbit space-orbit-a"></span>
    <span class="space-orbit space-orbit-b"></span>
  </div>

  <main class="entrance-shell" aria-labelledby="routeHeading">
    <header class="entrance-masthead entrance-reveal">
      <div class="entrance-brand-lockup">
        <h1 class="entrance-title"><button class="pro-x-trigger" id="entranceTitle" type="button" aria-label="返回 Pro-X 主入口" aria-describedby="journeyHint"></button></h1>
        <span class="brand-pulse" aria-hidden="true"></span>
        <p class="journey-hint" id="journeyHint">返回 Pro-X 主入口 <span aria-hidden="true">↖</span></p>
      </div>
      <p class="entrance-eyebrow" id="entranceEyebrow"></p>
    </header>

    <section class="entrance-content">
      <div class="entrance-copy entrance-reveal">
        <p class="entrance-overline">CHOOSE YOUR ORBIT</p>
        <h2 class="entrance-statement" id="routeHeading"><span id="entranceStatement"></span></h2>
        <p class="entrance-attribution" id="entranceAttribution"></p>
      </div>

      <div class="route-selector entrance-reveal" id="routeSelector">
        <div class="route-topline">
          <div class="route-tabs" id="routeTabs" role="tablist" aria-label="选择学习航线"></div>
          <p class="route-instruction"><span class="instruction-wide">滚轮 / 拖动 / 方向键</span><span class="instruction-compact">滑动切换</span></p>
        </div>

        <div class="route-viewport" id="routeViewport" aria-live="polite">
          <span class="route-axis" aria-hidden="true"></span>
          <div class="route-stack" id="routeStack"></div>
          <button class="route-arrow route-arrow-prev" id="routePrevious" type="button" aria-label="上一条航线"><span aria-hidden="true">←</span></button>
          <button class="route-arrow route-arrow-next" id="routeNext" type="button" aria-label="下一条航线"><span aria-hidden="true">→</span></button>
        </div>

        <div class="route-progress" aria-hidden="true"><span id="routeProgress"></span></div>
        <p class="entrance-status" id="entranceStatus" role="status" aria-live="polite"></p>
      </div>
    </section>

    <footer class="entrance-footer entrance-reveal">
      <span class="entrance-orbit" aria-hidden="true"><i></i></span>
      <span id="entranceFooter"></span>
      <span class="footer-separator" aria-hidden="true"></span>
      <span>BUILD · TEST · ITERATE</span>
    </footer>
  </main>
`;

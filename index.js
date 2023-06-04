// 1. html에서 canvas 태그를 가져옵니다.
const canvas = document.querySelector("canvas");
// 2. canvas 안에 있는 도구 context를 가져옵니다.
const ctx = canvas.getContext("2d");
// 3. 디바이스 픽셀 값 가져오기
const dpr = window.devicePixelRatio;

// fps를 위한 초기화
const fps = 60;
const interval = 1000 / fps;
let now, delta;
let then = Date.now();

// canvas 가로, 세로 값 초기화
let canvasWidth, canvasHeight;

function init() {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;

  // 캔버스의 사이즈를 담당하는 것은 2가지가 있습니다.
  // 1. 캔버스 고유 사이즈를 강제로 css로 맞춰 늘리거나 줄임.
  // 2. 캔버스의 고유 사이즈를 지정하기.
  // 먼저 캔버스의 고유 사이즈를 우리가 원하는 목표사이즈에 dpr을 곱해줍니다.
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr); // canvas안의 전체 컨텐츠를 확대시킵니다.

  // css로 각각의 기기마다 dpr 수치만큼 곱해서 확대가 된것을 강제로 사이즈조절을 해서
  // window innerwidth, window innerheight에 맞춰서 다시 줄여줍니다. (화면이 더 선명해짐)
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
}

function render() {
  requestAnimationFrame(render);

  // 각 디스플레이에 화면 주사율마다 다른 횟수로 실행되는 requestAnimationFrame이 실행이 되는 횟수(fps)
  // 개념을 사용하여 모든 화면에서 동일한 컨텐츠 속도를 보여주어야 합니다.
  now = Date.now();
  delta = now - then;
  if (delta < interval) return;

  ctx.fillRect(100, 100, 200, 200); // 사각형 시험 출력

  then = now - (delta % interval);
}

// 전체 window가 로드되었을 때 실행
window.addEventListener("load", () => {
  init();
  render();
});

// window가 리사이즈 될때마다 실행
window.addEventListener("resize", () => {
  init();
});

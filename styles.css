
const visualizer = document.getElementById('visualizer');
const algorithmSelect = document.getElementById('algorithm');
const arraySizeInput = document.getElementById('arraySize');
const generateButton = document.getElementById('generate');
const startButton = document.getElementById('start');

let array = [];
let bars = [];

function generateArray(size) {
  array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
  renderArray();
}

function renderArray() {
  visualizer.innerHTML = '';
  bars = array.map((value) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${value}%`;
    visualizer.appendChild(bar);
    return bar;
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort() {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].classList.add('active');
      bars[j + 1].classList.add('active');

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        renderArray();
        await sleep(50);
      }

      bars[j].classList.remove('active');
      bars[j + 1].classList.remove('active');
    }
  }
}

async function selectionSort() {
  for (let i = 0; i < array.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      bars[j].classList.add('active');
      bars[minIdx].classList.add('active');

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
      await sleep(50);
      bars[j].classList.remove('active');
    }
    [array[i], array[minIdx]] = [array[minIdx], array[i]];
    renderArray();
    bars[minIdx].classList.remove('active');
  }
}

async function quickSortHelper(start, end) {
  if (start >= end) return;

  let pivotIndex = start;
  let pivotValue = array[end];
  bars[end].classList.add('active');

  for (let i = start; i < end; i++) {
    bars[i].classList.add('active');
    if (array[i] < pivotValue) {
      [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
      pivotIndex++;
      renderArray();
      await sleep(50);
    }
    bars[i].classList.remove('active');
  }
  [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
  renderArray();
  bars[end].classList.remove('active');

  await quickSortHelper(start, pivotIndex - 1);
  await quickSortHelper(pivotIndex + 1, end);
}

async function quickSort() {
  await quickSortHelper(0, array.length - 1);
}

function startSorting() {
  const algorithm = algorithmSelect.value;
  switch (algorithm) {
    case 'bubble':
      bubbleSort();
      break;
    case 'selection':
      selectionSort();
      break;
    case 'quick':
      quickSort();
      break;
    default:
      alert('Algorithm not implemented yet.');
  }
}

// Event Listeners
generateButton.addEventListener('click', () => {
  generateArray(arraySizeInput.value);
});

startButton.addEventListener('click', startSorting);

// Initialize
generateArray(arraySizeInput.value);

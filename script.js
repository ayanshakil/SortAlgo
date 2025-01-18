const visualizer = document.getElementById('visualizer');
const algorithmSelect = document.getElementById('algorithm');
const arraySizeInput = document.getElementById('arraySize');
const generateButton = document.getElementById('generate');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const customArrayInput = document.getElementById('customArray');

let array = [];
let bars = [];
let sorting = false;

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
  sorting = true;
  for (let i = 0; i < array.length - 1 && sorting; i++) {
    for (let j = 0; j < array.length - i - 1 && sorting; j++) {
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
  sorting = false;
}

async function selectionSort() {
  sorting = true;
  for (let i = 0; i < array.length && sorting; i++) {
    let minIdx = i;
    for (let j = i + 1; j < array.length && sorting; j++) {
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
  sorting = false;
}

async function quickSortHelper(start, end) {
  if (start >= end || !sorting) return;

  let pivotIndex = start;
  let pivotValue = array[end];
  bars[end].classList.add('active');

  for (let i = start; i < end && sorting; i++) {
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
  sorting = true;
  await quickSortHelper(0, array.length - 1);
  sorting = false;
}

function startSorting() {
  if (sorting) return;
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

function stopSorting() {
  sorting = false;
}

function resetVisualizer() {
  stopSorting();
  array = [];
  renderArray();
}

function setCustomArray() {
  const input = customArrayInput.value;
  const customArray = input.split(',').map(Number).filter((n) => !isNaN(n) && n > 0 && n <= 100);
  if (customArray.length > 0 && customArray.length <= 50) {
    array = customArray;
    renderArray();
  } else {
    alert('Invalid array! Please enter up to 50 numbers between 1 and 100, separated by commas.');
  }
}

// Event Listeners
generateButton.addEventListener('click', () => {
  generateArray(arraySizeInput.value);
});

startButton.addEventListener('click', startSorting);
stopButton.addEventListener('click', stopSorting);
resetButton.addEventListener('click', resetVisualizer);
customArrayInput.addEventListener('change', setCustomArray);

// Initialize
generateArray(arraySizeInput.value);

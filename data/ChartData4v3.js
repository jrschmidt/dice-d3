// Chart Data for 4 armies attacking 3 armies
// ChartData4v3.js

var dataSpecs = {
  'graphHeight': 12,
  'graphDepth': 5
};

var dataNodes = [
  {'type': 'root', 'att': 4, 'def': 3, 'loc': [0, 12]},
  {'type': 'pww', 'att': 4, 'def': 1, 'loc': [1, 4]},
  {'type': 'pw', 'att': 4, 'def': 0, 'loc': [4, 1]},
  {'type': 'pl', 'att': 3, 'def': 1, 'loc': [2, 5]},
  {'type': 'pw', 'att': 3, 'def': 0, 'loc': [4, 3]},
  {'type': 'pl', 'att': 2, 'def': 1, 'loc': [3, 6]},
  {'type': 'pw', 'att': 2, 'def': 0, 'loc': [4, 5]},
  {'type': 'pl', 'att': 1, 'def': 1, 'loc': [4, 7]},
  {'type': 'pwl', 'att': 3, 'def': 2, 'loc': [1, 12]},
  {'type': 'pww', 'att': 3, 'def': 0, 'loc': [4, 9]},
  {'type': 'pwl', 'att': 2, 'def': 1, 'loc': [2, 12]},
  {'type': 'pw', 'att': 2, 'def': 0, 'loc': [4, 11]},
  {'type': 'pl', 'att': 1, 'def': 1, 'loc': [4, 13]},
  {'type': 'pll', 'att': 1, 'def': 2, 'loc': [4, 15]},
  {'type': 'pll', 'att': 2, 'def': 3, 'loc': [1, 20]},
  {'type': 'pw', 'att': 2, 'def': 1, 'loc': [3, 18]},
  {'type': 'pw', 'att': 2, 'def': 0, 'loc': [4, 17]},
  {'type': 'pl', 'att': 1, 'def': 1, 'loc': [4, 19]},
  {'type': 'pl', 'att': 1, 'def': 2, 'loc': [4, 21]},
  {'type': 'pl', 'att': 1, 'def': 3, 'loc': [4, 23]}
];

var dataLines = [
  {'end0': [0, 12], 'end1': [1, 4], 'type': 'pww', 'probs': 0.},
  {'end0': [1, 4], 'end1': [4, 1], 'type': 'pw', 'probs': 0.},
  {'end0': [1, 4], 'end1': [2, 5], 'type': 'pl', 'probs': 0.},
  {'end0': [2, 5], 'end1': [4, 3], 'type': 'pw', 'probs': 0.},
  {'end0': [2, 5], 'end1': [3, 6], 'type': 'pl', 'probs': 0.},
  {'end0': [3, 6], 'end1': [4, 5], 'type': 'pw', 'probs': 0.},
  {'end0': [3, 6], 'end1': [4, 7], 'type': 'pl', 'probs': 0.},
  {'end0': [0, 12], 'end1': [1, 12], 'type': 'pwl', 'probs': 0.},
  {'end0': [1, 12], 'end1': [4, 9], 'type': 'pww', 'probs': 0.},
  {'end0': [1, 12], 'end1': [2, 12], 'type': 'pwl', 'probs': 0.},
  {'end0': [2, 12], 'end1': [4, 11], 'type': 'pw', 'probs': 0.},
  {'end0': [2, 12], 'end1': [4, 13], 'type': 'pl', 'probs': 0.},
  {'end0': [1, 12], 'end1': [4, 15], 'type': 'pll', 'probs': 0.},
  {'end0': [0, 12], 'end1': [1, 20], 'type': 'pll', 'probs': 0.},
  {'end0': [1, 20], 'end1': [2, 19], 'type': 'pw', 'probs': 0.},
  {'end0': [2, 19], 'end1': [3, 18], 'type': 'pw', 'probs': 0.},
  {'end0': [3, 18], 'end1': [4, 17], 'type': 'pw', 'probs': 0.},
  {'end0': [3, 18], 'end1': [4, 19], 'type': 'pl', 'probs': 0.},
  {'end0': [2, 19], 'end1': [4, 21], 'type': 'pl', 'probs': 0.},
  {'end0': [1, 20], 'end1': [4, 23], 'type': 'pl', 'probs': 0.}
];

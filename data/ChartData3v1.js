// Chart Data for 3 armies attacking 1 army
// ChartData3v1.js

var dataSpecs = {
  'graphHeight': 3,
  'graphDepth': 4
};

var dataNodes = [
  {'type': 'root', 'att': 3, 'def': 1, 'a': 0, 'b': 3},
  {'type': 'pw', 'att': 3, 'def': 0, 'a': 3, 'b': 1},
  {'type': 'pl', 'att': 2, 'def': 1, 'a': 1, 'b': 4},
  {'type': 'pw', 'att': 2, 'def': 0, 'a': 3, 'b': 3},
  {'type': 'pl', 'att': 1, 'def': 1, 'a': 3, 'b': 5}
];

var dataLines = [
  {'end0': [0, 3], 'end1': [3, 1], 'type': 'pw', 'probs': 0.579},
  {'end0': [0, 3], 'end1': [1, 4], 'type': 'pl', 'probs': 0.421},
  {'end0': [1, 4], 'end1': [3, 3], 'type': 'pw', 'probs': 0.417},
  {'end0': [1, 4], 'end1': [3, 5], 'type': 'pl', 'probs': 0.583}
];

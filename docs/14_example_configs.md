### `assets/cars/rx01/tuning.json`

```json
{
  "mass": 1280,
  "inertia": [450, 1200, 1500],
  "engine": {
    "maxRPM": 7500,
    "torqueCurve": [
      [1000, 120],
      [3500, 200],
      [6500, 210]
    ]
  },
  "gears": [3.2, 2.1, 1.5, 1.2, 1.0, 0.82],
  "finalDrive": 3.9,
  "tire": { "frontWidth": 235, "rearWidth": 245, "mu": 1.1 },
  "suspension": {
    "kf": 35000,
    "kr": 30000,
    "cf": 3200,
    "cr": 3000,
    "arbF": 3500,
    "arbR": 2800
  },
  "aero": { "cd": 0.34, "clFront": 0.0, "clRear": 0.05 }
}
```

### `assets/tracks/willow/checkpoints.json`

```json
{
  "startFinish": [0, 1],
  "sectors": [
    [2, 15],
    [16, 33],
    [34, 49]
  ]
}
```

### Physics Tuning Prompt

"""
You are a vehicle dynamics assistant. Given tuning.json and a telemetry CSV (columns: time, speed, steer, throttle, brake, lateralG, longG, slipF, slipR), propose parameter adjustments to reduce mid‑corner understeer while preserving stability at 180 km/h. Output a patch to tuning.json and a 3‑bullet rationale.
"""

### AI Line Prompt

"""
You are an AI racing engineer. Given a centerline polyline and a curvature profile, generate an optimal racing line and target speed map that respects tire μ=1.1 and engine power limits. Output JSON: { waypoints:[...], targetSpeedKph:[...] }.
"""

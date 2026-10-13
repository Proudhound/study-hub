/**
 * Small, framework-independent reference implementation for progress rules.
 * All examples in the public repository must be synthetic.
 */
export type ModuleState = "not_started" | "in_progress" | "completed";
export type ModuleKind = "required" | "elective";

export interface ModuleRecord {
  id: string;
  credits: number;
  status: ModuleState;
  kind: ModuleKind;
  selected?: boolean;
  recognizedCredits?: number;
}
export interface ProgressResult {
  earnedCredits: number;
  remainingCredits: number;
  requiredCredits: number;
  percent: number;
  filledSegments: number;
  segmentCount: number;
}
function validNonnegative(value: number): boolean {
  return Number.isFinite(value) && value >= 0;
}
export function calculateProgress(
  modules: readonly ModuleRecord[],
  requiredCredits: number,
  segmentCount = 36,
): ProgressResult {
  if (!Number.isFinite(requiredCredits) || requiredCredits <= 0) {
    throw new RangeError("requiredCredits must be positive and finite");
  }
  if (!Number.isInteger(segmentCount) || segmentCount < 1 || segmentCount > 120) {
    throw new RangeError("segmentCount must be an integer from 1 to 120");
  }
  const seen = new Set<string>();
  let sum = 0;
  for (const module of modules) {
    if (!module.id || seen.has(module.id)) {
      throw new Error("Module identifiers must be unique and nonempty");
    }
    seen.add(module.id);
    if (!validNonnegative(module.credits)) {
      throw new RangeError("credits must be nonnegative and finite");
    }
    const recognized = module.recognizedCredits ?? 0;
    if (!validNonnegative(recognized) || recognized > module.credits) {
      throw new RangeError("recognizedCredits must be within module credits");
    }
    if (!["required", "elective"].includes(module.kind)) {
      throw new TypeError("Unknown module kind");
    }
    if (!["not_started", "in_progress", "completed"].includes(module.status)) {
      throw new TypeError("Unknown module status");
    }
    if (module.kind === "elective" && module.selected !== true) continue;

    // Completion and recognition are alternative credit pathways, NOT additive.
    sum += module.status === "completed" ? module.credits : recognized;
  }
  // A program may have surplus awards, but its dashboard never exceeds 100%.
  const earnedCredits = Math.min(sum, requiredCredits);
  const fraction = earnedCredits / requiredCredits;
  return {
    earnedCredits,
    remainingCredits: Math.max(0, requiredCredits - earnedCredits),
    requiredCredits,
    percent: Math.round(fraction * 1000) / 10,
    filledSegments: Math.floor(fraction * segmentCount),
    segmentCount,
  };
}

export function getUserStatus(id: number): "Active" | "Inactive" {
  return id % 3 === 0 ? "Inactive" : "Active"; // deterministic placeholder — documented in README
}
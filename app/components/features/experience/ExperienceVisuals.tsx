import { FreelanceVisual } from "./visuals/Freelance";
import { AiqueVisual } from "./visuals/Aique";
import { BeyondgenVisual } from "./visuals/Beyondgen";
import { KeepItSimpleVisual } from "./visuals/KeepItSimple";
import { BuildFastVisual } from "./visuals/BuildFast";
import { IopexVisual } from "./visuals/Iopex";

export const experienceVisuals = {
  iopex: IopexVisual,
  freelance: FreelanceVisual,
  aique: AiqueVisual,
  beyondgen: BeyondgenVisual,
  keepitsimpleos: KeepItSimpleVisual,
  buildfast: BuildFastVisual,
} as const;

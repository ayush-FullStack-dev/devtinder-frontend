import { z } from "zod";
import { emptyCode } from "./schema";

export const baseClientInfo = z.object({
  deviceId: z.string().min(32).max(32),
  deviceSize: z.number().min(170).max(4000),
  clientTimestamp: z.date().optional(),
});

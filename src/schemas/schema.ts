import { z } from "zod";

export const emptyCode = z.union([z.literal(""), z.undefined(), z.null()]);

import { z } from "zod";

const isSketchId = (id: string): boolean => z.uuid().safeParse(id).success;

export { isSketchId };

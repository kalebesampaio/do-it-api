import { uniqueEmail } from "./uniqueEmail.middleware";
import { validateBody } from "./validateBody.middleware";
import { verifyToken } from "./verifyToken.middleware";
import { isOwner } from "./isOwner.middleware";
import { idTaskExists } from "./idTaskExists.middleware";
import { idUserExists } from "./idUserExists.middleware";
import { taskOwner } from "./TaskOwner.middleware";

export default {
  validateBody,
  uniqueEmail,
  verifyToken,
  isOwner,
  taskOwner,
  idUserExists,
  idTaskExists
};
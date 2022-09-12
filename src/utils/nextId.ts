import crypto from "crypto";

function nextId() {
  return crypto.randomBytes(16).toString("hex");
}

export default nextId

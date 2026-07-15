const { spawn } = require("child_process");
const port = process.env.PORT || 3000;
const next = spawn("npx", ["next", "start", "-p", port], {
  stdio: "inherit",
  shell: true,
});
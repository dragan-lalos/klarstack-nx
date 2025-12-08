import { waitForPortClosed } from './ports';

module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // Hint: `globalThis` is shared between setup and teardown.
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  // Best-effort: also kill the spawned server process (if still alive).
  const pid = (globalThis as any).__CORE_SVC_PID__;
  if (typeof pid === 'number') {
    try {
      process.kill(pid, 'SIGTERM');
    } catch {
      // ignore
    }
  }

  try {
    await waitForPortClosed(port, { host });
  } catch {
    // ignore
  }
  console.log(globalThis.__TEARDOWN_MESSAGE__);
};

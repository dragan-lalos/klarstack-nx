import net from 'node:net';

export interface WaitForPortOptions {
  host: string;
  timeoutMs?: number;
  pollIntervalMs?: number;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function isPortOpen(port: number, host: string): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();

    const onDone = (open: boolean) => {
      socket.removeAllListeners();
      socket.destroy();
      resolve(open);
    };

    socket.setTimeout(1000);
    socket.once('connect', () => onDone(true));
    socket.once('timeout', () => onDone(false));
    socket.once('error', () => onDone(false));

    socket.connect(port, host);
  });
}

export async function waitForPortOpen(port: number, options: WaitForPortOptions): Promise<void> {
  const timeoutMs = options.timeoutMs ?? 60_000;
  const pollIntervalMs = options.pollIntervalMs ?? 250;
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    // eslint-disable-next-line no-await-in-loop
    const open = await isPortOpen(port, options.host);
    if (open) return;
    // eslint-disable-next-line no-await-in-loop
    await sleep(pollIntervalMs);
  }

  throw new Error(`Timed out waiting for port ${options.host}:${port} to open`);
}

export async function waitForPortClosed(port: number, options: WaitForPortOptions): Promise<void> {
  const timeoutMs = options.timeoutMs ?? 30_000;
  const pollIntervalMs = options.pollIntervalMs ?? 250;
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    // eslint-disable-next-line no-await-in-loop
    const open = await isPortOpen(port, options.host);
    if (!open) return;
    // eslint-disable-next-line no-await-in-loop
    await sleep(pollIntervalMs);
  }

  throw new Error(`Timed out waiting for port ${options.host}:${port} to close`);
}

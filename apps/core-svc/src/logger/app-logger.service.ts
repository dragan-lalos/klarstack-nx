import { Injectable, LoggerService } from '@nestjs/common';

type LogLevel = 'debug' | 'verbose' | 'info' | 'warn' | 'error';

export type LogMetadata = Record<string, unknown> & { traceId?: string };

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

@Injectable()
export class AppLogger implements LoggerService {
  private readonly useColors: boolean;
  private readonly useJson: boolean;

  constructor() {
    // Use colors in development, JSON in production
    // Allow LOG_FORMAT env var to override: 'json' or 'pretty'
    const logFormat = process.env.LOG_FORMAT?.toLowerCase();
    const env = process.env.NODE_ENV ?? 'development';

    if (logFormat === 'json') {
      this.useColors = false;
      this.useJson = true;
    } else if (logFormat === 'pretty' || logFormat === 'color') {
      this.useColors = true;
      this.useJson = false;
    } else {
      // Auto-detect: use colors in development
      this.useColors = env === 'development';
      this.useJson = !this.useColors;
    }
  }

  log(message: string, context?: string, meta?: LogMetadata): void {
    this.write('info', message, context, meta);
  }

  error(message: string, trace?: string, context?: string, meta?: LogMetadata): void {
    const mergedMeta = this.mergeMeta(meta, trace ? { stack: trace } : undefined);
    this.write('error', message, context, mergedMeta);
  }

  warn(message: string, context?: string, meta?: LogMetadata): void {
    this.write('warn', message, context, meta);
  }

  debug(message: string, context?: string, meta?: LogMetadata): void {
    this.write('debug', message, context, meta);
  }

  verbose(message: string, context?: string, meta?: LogMetadata): void {
    this.write('verbose', message, context, meta);
  }

  info(message: string, context?: string, meta?: LogMetadata): void {
    this.write('info', message, context, meta);
  }

  private write(level: LogLevel, message: string, context?: string, meta?: LogMetadata): void {
    if (this.useJson) {
      this.writeJson(level, message, context, meta);
    } else {
      this.writeColored(level, message, context, meta);
    }
  }

  private writeJson(level: LogLevel, message: string, context?: string, meta?: LogMetadata): void {
    const payload: Record<string, unknown> = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(context ? { context } : {}),
      ...(meta ? this.normalizeMeta(meta) : {}),
    };

    const serialized = this.safeSerialize(payload);
    if (level === 'error') {
      console.error(serialized);
    } else if (level === 'warn') {
      console.warn(serialized);
    } else {
      console.log(serialized);
    }
  }

  private writeColored(
    level: LogLevel,
    message: string,
    context?: string,
    meta?: LogMetadata,
  ): void {
    const timestamp = new Date().toLocaleString();
    const pid = process.pid;

    // Color scheme matching NestJS default logger
    const levelColor = this.getLevelColor(level);
    const levelText = level.toUpperCase().padEnd(7);
    const contextText = context ? `[${context}]` : '';

    let output = `${colors.dim}[Nest] ${pid}  - ${colors.reset}`;
    output += `${colors.dim}${timestamp}${colors.reset}     `;
    output += `${levelColor}${levelText}${colors.reset} `;
    output += `${colors.yellow}${contextText}${colors.reset} `;
    output += `${levelColor}${message}${colors.reset}`;

    // Add metadata if present
    if (meta && Object.keys(meta).length > 0) {
      const metaStr = this.formatMetaForDisplay(meta);
      output += ` ${colors.dim}${metaStr}${colors.reset}`;
    }

    if (level === 'error') {
      console.error(output);
    } else if (level === 'warn') {
      console.warn(output);
    } else {
      console.log(output);
    }
  }

  private getLevelColor(level: LogLevel): string {
    switch (level) {
      case 'error':
        return colors.red;
      case 'warn':
        return colors.yellow;
      case 'info':
        return colors.green;
      case 'debug':
        return colors.magenta;
      case 'verbose':
        return colors.cyan;
      default:
        return colors.white;
    }
  }

  private formatMetaForDisplay(meta: LogMetadata): string {
    const entries = Object.entries(meta)
      .filter(([key]) => key !== 'stack') // Don't show stack in inline meta
      .map(([key, value]) => {
        if (typeof value === 'object') {
          return `${key}=${JSON.stringify(value)}`;
        }
        return `${key}=${value}`;
      });
    return entries.length > 0 ? `{${entries.join(', ')}}` : '';
  }

  private mergeMeta(...metas: Array<LogMetadata | undefined>): LogMetadata | undefined {
    const merged = metas
      .filter(Boolean)
      .reduce((acc, current) => Object.assign(acc, current), {} as LogMetadata);
    return Object.keys(merged).length ? merged : undefined;
  }

  private normalizeMeta(meta: LogMetadata): LogMetadata {
    const normalized: LogMetadata = {};
    for (const [key, value] of Object.entries(meta)) {
      normalized[key] = this.normalizeValue(value);
    }
    return normalized;
  }

  private normalizeValue(value: unknown): unknown {
    if (value instanceof Error) {
      return { name: value.name, message: value.message, stack: value.stack };
    }
    if (typeof value === 'bigint') {
      return value.toString();
    }
    return value;
  }

  private safeSerialize(payload: Record<string, unknown>): string {
    try {
      return JSON.stringify(payload);
    } catch {
      return JSON.stringify({
        level: payload.level,
        message: payload.message,
        timestamp: payload.timestamp,
        serializationError: true,
      });
    }
  }
}

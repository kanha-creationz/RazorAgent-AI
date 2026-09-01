
import { ServerEventLog } from '@/types';

type EventListener = (data: any) => void;

class GlobalEventBus {
  private listeners: Map<string, Set<EventListener>> = new Map();
  private recentLogs: ServerEventLog[] = [];
  private readonly MAX_LOGS = 100;

  constructor() {
    this.addLog({
      method: 'SYSTEM',
      endpoint: '/system/boot',
      statusCode: 200,
      responseTimeMs: 12,
      category: 'SYSTEM' as any,
      message: 'RazorAgent AI core engine initialized.'
    });
  }

  public subscribe(event: string, callback: EventListener): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  public emit(event: string, data: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => {
        try {
          cb(data);
        } catch (e) {
          console.error('Error in event listener', e);
        }
      });
    }
  }

  public addLog(log: Omit<ServerEventLog, 'id' | 'timestamp' | 'ipHash' | 'requestId'> & { ipHash?: string; requestId?: string }): ServerEventLog {
    const fullLog: ServerEventLog = {
      id: 'log_' + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      ipHash: log.ipHash || 'ip_7f9a2b',
      requestId: log.requestId || 'req_' + Math.random().toString(36).substring(2, 8),
      ...log
    };

    this.recentLogs.unshift(fullLog);
    if (this.recentLogs.length > this.MAX_LOGS) {
      this.recentLogs.pop();
    }

    this.emit('server_log', fullLog);
    return fullLog;
  }

  public getRecentLogs(): ServerEventLog[] {
    return [...this.recentLogs];
  }
}

// Global singleton across hot reloads
const globalForEvents = global as unknown as { eventBus: GlobalEventBus };
export const eventBus = globalForEvents.eventBus || new GlobalEventBus();
if (process.env.NODE_ENV !== 'production') globalForEvents.eventBus = eventBus;

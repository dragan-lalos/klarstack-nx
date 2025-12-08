/**
 * Domain Types
 *
 * Core data models for the application
 */

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';
export type AlertStatus = 'active' | 'acknowledged' | 'resolved' | 'dismissed';
export type AlertType = 'intrusion' | 'loitering' | 'access_violation' | 'perimeter_breach';

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  status: AlertStatus;
  score: number;
  title: string;
  description: string;
  timestamp: string;
  zoneId: string;
  zoneName: string;
  assetId?: string;
  assetName?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'closed';

export interface Incident {
  id: string;
  title: string;
  description: string;
  status: IncidentStatus;
  severity: AlertSeverity;
  createdAt: string;
  updatedAt: string;
  alertIds: string[];
  assignedTo?: string;
  zoneIds: string[];
}

export type AssetType = 'camera' | 'sensor' | 'access_point' | 'patrol_vehicle';
export type AssetCriticality = 'critical' | 'high' | 'normal' | 'low';
export type AssetStatus = 'online' | 'offline' | 'maintenance' | 'error';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  criticality: AssetCriticality;
  status: AssetStatus;
  location: {
    lat: number;
    lng: number;
  };
  zoneId: string;
  lastSeen: string;
  metadata?: Record<string, unknown>;
}

export interface Zone {
  id: string;
  name: string;
  type: 'restricted' | 'monitored' | 'public' | 'perimeter';
  bounds?: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  assetCount: number;
  alertCount: number;
}

export type EvidenceType = 'video' | 'image' | 'audio' | 'sensor_data' | 'log';

export interface EvidenceEvent {
  id: string;
  alertId: string;
  type: EvidenceType;
  timestamp: string;
  source: string;
  confidence: number;
  description: string;
  metadata?: Record<string, unknown>;
}

export interface Integration {
  id: string;
  name: string;
  type: 'ais' | 'access_control' | 'cctv' | 'vms' | 'analytics';
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastSync?: string;
  config?: Record<string, unknown>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'analyst' | 'viewer';
  lastActive: string;
}

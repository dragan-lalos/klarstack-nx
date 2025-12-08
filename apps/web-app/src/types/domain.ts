/**
 * Domain Types - Core data models for the Klastack-nx application
 * These types represent the business entities used across the application
 */

/**
 * Severity levels for alerts and incidents
 */
export enum Severity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

/**
 * Status for trackable entities
 */
export enum Status {
  ACTIVE = 'active',
  ACKNOWLEDGED = 'acknowledged',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

/**
 * Asset types supported by the system
 */
export enum AssetType {
  CAMERA = 'camera',
  SENSOR = 'sensor',
  GATEWAY = 'gateway',
  SERVER = 'server',
  NETWORK = 'network',
}

/**
 * Zone represents a physical or logical area
 */
export interface Zone {
  id: string;
  name: string;
  description: string;
  type: 'indoor' | 'outdoor' | 'perimeter' | 'restricted';
  /**
   * Parent zone ID for hierarchical organization
   */
  parentId?: string;
  /**
   * Number of assets deployed in this zone
   */
  assetCount: number;
  /**
   * Total area in square meters
   */
  area: number;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Asset represents a physical device or system component
 */
export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  model: string;
  serialNumber: string;
  zoneId: string;
  zoneName: string;
  status: 'online' | 'offline' | 'maintenance' | 'error';
  /**
   * Health score (0-100)
   */
  health: number;
  /**
   * IP address or network identifier
   */
  ipAddress?: string;
  /**
   * Last communication timestamp
   */
  lastSeen: Date;
  /**
   * Firmware or software version
   */
  version?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Alert represents an automated notification of a potential issue
 */
export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: Status;
  /**
   * Asset that triggered the alert
   */
  assetId: string;
  assetName: string;
  /**
   * Zone where the alert originated
   */
  zoneId: string;
  zoneName: string;
  /**
   * Alert type/category
   */
  type: string;
  /**
   * Alert rule or policy that triggered this alert
   */
  ruleId?: string;
  ruleName?: string;
  /**
   * User who acknowledged the alert
   */
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  /**
   * User who resolved the alert
   */
  resolvedBy?: string;
  resolvedAt?: Date;
  /**
   * Related evidence events
   */
  evidenceEventIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Incident represents a confirmed security or operational event requiring investigation
 */
export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: Status;
  /**
   * Incident type/category
   */
  type: string;
  /**
   * Associated zone
   */
  zoneId: string;
  zoneName: string;
  /**
   * Assigned investigator
   */
  assignedTo?: string;
  /**
   * User who created the incident
   */
  createdBy: string;
  /**
   * User who resolved the incident
   */
  resolvedBy?: string;
  resolvedAt?: Date;
  /**
   * Related alerts
   */
  alertIds: string[];
  /**
   * Related evidence events
   */
  evidenceEventIds: string[];
  /**
   * Investigation notes
   */
  notes?: string;
  /**
   * Tags for categorization
   */
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * EvidenceEvent represents captured data (video, image, sensor reading) related to an alert or incident
 */
export interface EvidenceEvent {
  id: string;
  /**
   * Type of evidence
   */
  type: 'video' | 'image' | 'sensor_data' | 'log' | 'other';
  /**
   * Asset that captured the evidence
   */
  assetId: string;
  assetName: string;
  /**
   * Zone where evidence was captured
   */
  zoneId: string;
  zoneName: string;
  /**
   * Storage path or URL
   */
  storageUrl: string;
  /**
   * Thumbnail for visual evidence
   */
  thumbnailUrl?: string;
  /**
   * File size in bytes
   */
  fileSize: number;
  /**
   * MIME type
   */
  mimeType: string;
  /**
   * Duration in seconds (for video/audio)
   */
  duration?: number;
  /**
   * Related alerts
   */
  alertIds: string[];
  /**
   * Related incidents
   */
  incidentIds: string[];
  /**
   * Metadata extracted from the evidence
   */
  metadata?: Record<string, unknown>;
  /**
   * When the event was captured
   */
  capturedAt: Date;
  /**
   * When the record was created in the system
   */
  createdAt: Date;
}

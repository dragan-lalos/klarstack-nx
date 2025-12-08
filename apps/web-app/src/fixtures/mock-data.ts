/**
 * Fake Data Fixtures
 *
 * Mock data for MVP pages
 */

import type { Alert, Incident, Asset, Zone, EvidenceEvent, Integration, User } from '../types';

// ============================================================================
// Alerts
// ============================================================================

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'intrusion',
    severity: 'critical',
    status: 'active',
    score: 0.95,
    title: 'Unauthorized Access Detected',
    description: 'Person detected in restricted zone after hours',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    zoneId: 'zone-1',
    zoneName: 'Warehouse North',
    assetId: 'camera-1',
    assetName: 'Camera 101',
    location: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: 'alert-2',
    type: 'loitering',
    severity: 'medium',
    status: 'acknowledged',
    score: 0.72,
    title: 'Loitering Detected',
    description: 'Individual present in area for extended period',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    zoneId: 'zone-2',
    zoneName: 'Perimeter East',
    assetId: 'camera-2',
    assetName: 'Camera 205',
    location: { lat: 37.7751, lng: -122.4192 },
  },
  {
    id: 'alert-3',
    type: 'access_violation',
    severity: 'high',
    status: 'active',
    score: 0.88,
    title: 'Access Denied - Multiple Attempts',
    description: 'Failed access attempts at secure door',
    timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
    zoneId: 'zone-3',
    zoneName: 'Server Room',
    assetId: 'access-1',
    assetName: 'Door Controller 12',
    location: { lat: 37.7748, lng: -122.4196 },
  },
  {
    id: 'alert-4',
    type: 'perimeter_breach',
    severity: 'high',
    status: 'active',
    score: 0.91,
    title: 'Perimeter Fence Breach',
    description: 'Motion detected at fence line sector 4',
    timestamp: new Date(Date.now() - 3 * 60000).toISOString(),
    zoneId: 'zone-4',
    zoneName: 'Perimeter South',
    location: { lat: 37.7746, lng: -122.4198 },
  },
  {
    id: 'alert-5',
    type: 'intrusion',
    severity: 'low',
    status: 'dismissed',
    score: 0.45,
    title: 'Possible Movement',
    description: 'Low confidence detection, likely false positive',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    zoneId: 'zone-1',
    zoneName: 'Warehouse North',
    location: { lat: 37.775, lng: -122.4193 },
  },
  {
    id: 'alert-6',
    type: 'loitering',
    severity: 'medium',
    status: 'resolved',
    score: 0.68,
    title: 'Loitering Event Cleared',
    description: 'Security patrol verified authorized personnel',
    timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
    zoneId: 'zone-2',
    zoneName: 'Perimeter East',
    location: { lat: 37.7752, lng: -122.419 },
  },
  {
    id: 'alert-7',
    type: 'intrusion',
    severity: 'critical',
    status: 'acknowledged',
    score: 0.93,
    title: 'After-Hours Entry',
    description: 'Unauthorized entry detected via back entrance',
    timestamp: new Date(Date.now() - 20 * 60000).toISOString(),
    zoneId: 'zone-5',
    zoneName: 'Loading Dock',
    assetId: 'camera-3',
    assetName: 'Camera 302',
    location: { lat: 37.7745, lng: -122.42 },
  },
  {
    id: 'alert-8',
    type: 'access_violation',
    severity: 'medium',
    status: 'active',
    score: 0.71,
    title: 'Badge Access Anomaly',
    description: 'Access card used in unusual location',
    timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
    zoneId: 'zone-3',
    zoneName: 'Server Room',
    location: { lat: 37.7747, lng: -122.4197 },
  },
];

// ============================================================================
// Incidents
// ============================================================================

export const mockIncidents: Incident[] = [
  {
    id: 'incident-1',
    title: 'Warehouse Intrusion Investigation',
    description: 'Multiple unauthorized access attempts in warehouse area',
    status: 'investigating',
    severity: 'critical',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 300000).toISOString(),
    alertIds: ['alert-1', 'alert-7'],
    assignedTo: 'John Doe',
    zoneIds: ['zone-1', 'zone-5'],
  },
  {
    id: 'incident-2',
    title: 'Perimeter Security Review',
    description: 'Recurring loitering events requiring investigation',
    status: 'open',
    severity: 'medium',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
    alertIds: ['alert-2', 'alert-6'],
    zoneIds: ['zone-2'],
  },
  {
    id: 'incident-3',
    title: 'Access Control System Audit',
    description: 'Multiple failed access attempts requiring review',
    status: 'resolved',
    severity: 'high',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 43200000).toISOString(),
    alertIds: ['alert-3', 'alert-8'],
    assignedTo: 'Jane Smith',
    zoneIds: ['zone-3'],
  },
];

// ============================================================================
// Assets
// ============================================================================

export const mockAssets: Asset[] = [
  {
    id: 'camera-1',
    name: 'Camera 101',
    type: 'camera',
    criticality: 'critical',
    status: 'online',
    location: { lat: 37.7749, lng: -122.4194 },
    zoneId: 'zone-1',
    lastSeen: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: 'camera-2',
    name: 'Camera 205',
    type: 'camera',
    criticality: 'high',
    status: 'online',
    location: { lat: 37.7751, lng: -122.4192 },
    zoneId: 'zone-2',
    lastSeen: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: 'camera-3',
    name: 'Camera 302',
    type: 'camera',
    criticality: 'high',
    status: 'online',
    location: { lat: 37.7745, lng: -122.42 },
    zoneId: 'zone-5',
    lastSeen: new Date(Date.now() - 90000).toISOString(),
  },
  {
    id: 'access-1',
    name: 'Door Controller 12',
    type: 'access_point',
    criticality: 'critical',
    status: 'online',
    location: { lat: 37.7748, lng: -122.4196 },
    zoneId: 'zone-3',
    lastSeen: new Date(Date.now() - 30000).toISOString(),
  },
  {
    id: 'sensor-1',
    name: 'Motion Sensor A4',
    type: 'sensor',
    criticality: 'normal',
    status: 'online',
    location: { lat: 37.7746, lng: -122.4198 },
    zoneId: 'zone-4',
    lastSeen: new Date(Date.now() - 45000).toISOString(),
  },
  {
    id: 'patrol-1',
    name: 'Security Vehicle 01',
    type: 'patrol_vehicle',
    criticality: 'normal',
    status: 'online',
    location: { lat: 37.775, lng: -122.4195 },
    zoneId: 'zone-2',
    lastSeen: new Date(Date.now() - 180000).toISOString(),
  },
  {
    id: 'camera-4',
    name: 'Camera 110',
    type: 'camera',
    criticality: 'normal',
    status: 'offline',
    location: { lat: 37.7747, lng: -122.4199 },
    zoneId: 'zone-4',
    lastSeen: new Date(Date.now() - 3600000).toISOString(),
  },
];

// ============================================================================
// Zones
// ============================================================================

export const mockZones: Zone[] = [
  {
    id: 'zone-1',
    name: 'Warehouse North',
    type: 'restricted',
    assetCount: 12,
    alertCount: 3,
  },
  {
    id: 'zone-2',
    name: 'Perimeter East',
    type: 'perimeter',
    assetCount: 8,
    alertCount: 2,
  },
  {
    id: 'zone-3',
    name: 'Server Room',
    type: 'restricted',
    assetCount: 4,
    alertCount: 2,
  },
  {
    id: 'zone-4',
    name: 'Perimeter South',
    type: 'perimeter',
    assetCount: 6,
    alertCount: 1,
  },
  {
    id: 'zone-5',
    name: 'Loading Dock',
    type: 'monitored',
    assetCount: 5,
    alertCount: 1,
  },
];

// ============================================================================
// Evidence Events
// ============================================================================

export const mockEvidenceEvents: EvidenceEvent[] = [
  {
    id: 'ev-1',
    alertId: 'alert-1',
    type: 'video',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    source: 'Camera 101',
    confidence: 0.95,
    description: 'Person detected entering restricted area',
  },
  {
    id: 'ev-2',
    alertId: 'alert-1',
    type: 'sensor_data',
    timestamp: new Date(Date.now() - 4.5 * 60000).toISOString(),
    source: 'Motion Sensor A1',
    confidence: 0.92,
    description: 'Motion detected in sector 2',
  },
  {
    id: 'ev-3',
    alertId: 'alert-1',
    type: 'image',
    timestamp: new Date(Date.now() - 4 * 60000).toISOString(),
    source: 'Camera 101',
    confidence: 0.88,
    description: 'Individual moving toward storage units',
  },
];

// ============================================================================
// Integrations
// ============================================================================

export const mockIntegrations: Integration[] = [
  {
    id: 'int-1',
    name: 'AIS Maritime Tracker',
    type: 'ais',
    status: 'connected',
    lastSync: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: 'int-2',
    name: 'Lenel Access Control',
    type: 'access_control',
    status: 'connected',
    lastSync: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: 'int-3',
    name: 'Milestone CCTV',
    type: 'cctv',
    status: 'syncing',
    lastSync: new Date(Date.now() - 30000).toISOString(),
  },
  {
    id: 'int-4',
    name: 'Analytics Engine',
    type: 'analytics',
    status: 'connected',
    lastSync: new Date(Date.now() - 90000).toISOString(),
  },
  {
    id: 'int-5',
    name: 'Legacy VMS',
    type: 'vms',
    status: 'error',
    lastSync: new Date(Date.now() - 3600000).toISOString(),
  },
];

// ============================================================================
// Users
// ============================================================================

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    lastActive: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'operator',
    lastActive: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'analyst',
    lastActive: new Date(Date.now() - 600000).toISOString(),
  },
];

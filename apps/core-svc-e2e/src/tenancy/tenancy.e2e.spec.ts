import { randomUUID } from 'node:crypto';
import request from 'supertest';

function getBaseUrl(): string {
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ?? '3000';
  return `http://${host}:${port}`;
}

describe('Tenancy v1.0 (minimal, but real)', () => {
  const api = request(getBaseUrl());
  const devAuthHeader = { 'x-dev-auth': 'dev' };

  it('GET /api/health works without auth and without workspace header', async () => {
    const res = await api.get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('GET /api/me works with dev auth and returns memberships', async () => {
    const res = await api.get('/api/me').set(devAuthHeader);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: expect.any(String),
        memberships: expect.any(Array),
      }),
    );
    expect(res.body.memberships.length).toBeGreaterThan(0);
    expect(res.body.memberships[0]).toEqual(
      expect.objectContaining({
        workspaceId: expect.any(String),
        workspaceName: expect.any(String),
        role: expect.any(String),
      }),
    );
  });

  it('GET /api/workspaces works with dev auth', async () => {
    const res = await api.get('/api/workspaces').set(devAuthHeader);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        role: expect.any(String),
      }),
    );
  });

  it('Tenant-protected endpoint enforces membership and header', async () => {
    // First, discover a real workspace id the dev user belongs to.
    const workspacesRes = await api.get('/api/workspaces').set(devAuthHeader);
    expect(workspacesRes.status).toBe(200);
    const workspaceId: string = workspacesRes.body[0].id;

    // valid membership -> 200
    const okRes = await api
      .get('/api/tenant/ping')
      .set(devAuthHeader)
      .set('x-workspace-id', workspaceId);
    expect(okRes.status).toBe(200);
    expect(okRes.body).toEqual({ workspaceId });

    // random workspaceId -> 403
    const forbiddenRes = await api
      .get('/api/tenant/ping')
      .set(devAuthHeader)
      .set('x-workspace-id', randomUUID());
    expect(forbiddenRes.status).toBe(403);
    expect(forbiddenRes.body).toEqual(
      expect.objectContaining({
        code: 'WORKSPACE_FORBIDDEN',
      }),
    );

    // missing header -> 422
    const missingHeaderRes = await api.get('/api/tenant/ping').set(devAuthHeader);
    expect([400, 422]).toContain(missingHeaderRes.status);
    expect(missingHeaderRes.body).toEqual(
      expect.objectContaining({
        code: 'WORKSPACE_HEADER_REQUIRED',
      }),
    );
  });
});

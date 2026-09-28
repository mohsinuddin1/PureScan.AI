# PureScan AI auth.md

This document defines agent registration, authentication procedures, and credential management for AI agents interacting with PureScan AI APIs and tools.

## Discovery Metadata

AI agents should read the standard discovery endpoints before initiating authentication:

- **OAuth Protected Resource Metadata (PRM):** [/.well-known/oauth-protected-resource](https://purescan.droploop.in/.well-known/oauth-protected-resource)
- **OAuth Authorization Server Metadata:** [/.well-known/oauth-authorization-server](https://purescan.droploop.in/.well-known/oauth-authorization-server)
- **OIDC Configuration:** [/.well-known/openid-configuration](https://purescan.droploop.in/.well-known/openid-configuration)
- **API Catalog (RFC 9727):** [/.well-known/api-catalog](https://purescan.droploop.in/.well-known/api-catalog)

## Audience

This specification is intended for autonomous AI agents, LLM assistants, and programmatic clients performing food ingredient analysis, cosmetic hazard checks, or managing user subscription portals.

## Agent Registration

Agents can register or provision access via the registration endpoint:

- **Endpoint:** `https://purescan.droploop.in/api/agent/register`
- **Method:** `POST`
- **Content-Type:** `application/json`

### Supported Registration Methods

1. **Identity Assertion (ID-JAG):**
   - Assertion type: `urn:ietf:params:oauth:token-type:id-jag`
   - Credential types: `bearer_token`, `api_key`
   - Claims endpoint: `https://purescan.droploop.in/api/agent/claim`
   - Revocation endpoint: `https://purescan.droploop.in/api/agent/revoke`

2. **Verified Email:**
   - Assertion type: `verified_email`
   - Credential types: `bearer_token`, `api_key`
   - Claims endpoint: `https://purescan.droploop.in/api/agent/claim`

3. **Anonymous Agent Access:**
   - Credential types: `bearer_token`
   - Claims endpoint: `https://purescan.droploop.in/api/agent/claim`

## Credential Use

All authenticated requests to protected PureScan AI resources must include the issued token in the HTTP `Authorization` header:

```http
Authorization: Bearer <your-issued-token>
```

Tokens are scoped according to the requested capabilities:
- `api:read`: Read-only access to product information and ingredient databases.
- `scan:read`: Execute automated ingredient analysis and hazard scoring.
- `api:write`: Save analysis results or request customer portal links.

## Revocation & Token Lifecycle

Tokens may be revoked by submitting a POST request to `https://purescan.droploop.in/api/agent/revoke` with the token or assertion identifier.

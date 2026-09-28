# DNS for AI Discovery (DNS-AID) Configuration Guide

To pass the **DNS-AID** agent readiness check (`checks.discoverability.dnsAid`), you need to publish DNS records at your DNS provider (e.g. Cloudflare, Route 53, Namecheap, etc.) and enable DNSSEC.

---

## 1. DNS Records to Add

Add the following records for your domain (`purescan.droploop.in` or `droploop.in`):

### Record 1: Agent Index Entrypoint (`_index._agents`)
- **Type:** `SVCB` (or `HTTPS`)
- **Name:** `_index._agents.purescan.droploop.in` (or `_index._agents` if on subdomain zone)
- **Priority / SvcPriority:** `1`
- **Target / TargetName:** `purescan.droploop.in.`
- **Parameters:** `alpn="h2,h3" port=443 mandatory=alpn,port`

### Record 2: Agent-to-Agent Service Record (`_a2a._agents`)
- **Type:** `SVCB`
- **Name:** `_a2a._agents.purescan.droploop.in`
- **Priority / SvcPriority:** `1`
- **Target / TargetName:** `purescan.droploop.in.`
- **Parameters:** `alpn="a2a" port=443 mandatory=alpn,port`

### Record 3: ARD Agent Catalog Discovery (`_catalog._agents`)
- **Type:** `TXT`
- **Name:** `_catalog._agents.purescan.droploop.in`
- **Content:** `"url=https://purescan.droploop.in/.well-known/ai-catalog.json"`

---

## 2. Standard BIND / Zone File Format

If your DNS manager supports importing raw zone entries, paste the following:

```dns
_index._agents.purescan.droploop.in. 3600 IN SVCB 1 purescan.droploop.in. alpn="h2,h3" port=443 mandatory=alpn,port
_a2a._agents.purescan.droploop.in.   3600 IN SVCB 1 purescan.droploop.in. alpn="a2a" port=443 mandatory=alpn,port
_catalog._agents.purescan.droploop.in. 3600 IN TXT "url=https://purescan.droploop.in/.well-known/ai-catalog.json"
```

---

## 3. Enable DNSSEC (Crucial for DNS-AID)

The DNS-AID specification requires discovery zones to be signed with **DNSSEC** so validating DoH resolvers (Cloudflare `1.1.1.1` and Google `8.8.8.8`) return authenticated data (`ad` flag).

- **Cloudflare DNS:** Go to **DNS** -> **Settings** -> Click **Enable DNSSEC**. Add the generated DS record to your domain registrar.
- **Route 53:** Go to **Hosted zones** -> Select zone -> **DNSSEC signing** -> **Enable**.
- **Namecheap / GoDaddy:** Enable DNSSEC in the Advanced DNS / Security tab.

---

## 4. Verification

Verify that your DNS-AID records resolve via DNS-over-HTTPS:

```bash
# Check _index record:
curl -H "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=_index._agents.purescan.droploop.in&type=SVCB"

# Check _catalog TXT record:
curl -H "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=_catalog._agents.purescan.droploop.in&type=TXT"
```

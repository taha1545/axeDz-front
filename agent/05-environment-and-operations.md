# Environment & Operations Guide

## Environment Inventory
| Environment | URL | Purpose | Data | Access |
|-------------|-----|---------|------|--------|
| Local | `localhost:3000` | Development | Fake/seeded | Any dev |
| Production | `https://axedz.com` | Live | Real | On-call + restricted |



### Commands
```bash
# 1. Clone and enter
git clone https://github.com/taha1545/axeDz-front && cd [axeDz-front]

# 2. Copy environment
cp .env.example .env
# Edit .env with dev credentials (see "Secrets" below)

# 3. Install dependencies
npm  install  && npm run build

# 4. Start application
npm run dev

# 8. Verify
open http://localhost:[PORT]/health
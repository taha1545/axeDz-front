# Technical Architecture

## System Diagram

```text
User Browser
      |
      v
+------------------+
|   Next.js App    |
|   (axedz-next)   |
+------------------+
      |
      v
+------------------+
| Custom Hooks     |
| use-auth         |
| use-key          |
| use-payment      |
| use-otp          |
| use-contact      |
| use-comn         |
| use-mobile       |
+------------------+
      |
      v
+------------------+
| External APIs    |
| Authentication   |
| SMS              |
| Email            |
| Payment          |
| Cloud Services   |
+------------------+
```

## Service Inventory

| Service      | Tech Stack                   | Port | Responsibility                             | Health Endpoint |
| ------------ | ---------------------------- | ---- | ------------------------------------------ | --------------- |
| web          | Next.js + React + TypeScript | 3000 | Frontend UI and user interactions          | /api/health     |
| external-api | Third-party APIs             | N/A  | SMS, Email, Storage, Payment, OTP services | External        |

## Data Flow

### Critical Paths

1. **User Request Flow**

   * Client → Next.js Application → External API → Response

2. **Authentication Flow**

   * Client → use-auth → Authentication API → User Session

3. **Payment Flow**

   * Client → use-payment → Payment Provider API → Response

4. **Communication Flow**

   * Client → use-comn → SMS/Email API → Delivery Response

### State Management

* **User Sessions**: Authentication token management
* **Application State**: React Hooks and Component State
* **Configuration**: Environment Variables

## Technology Choices

| Layer                | Choice             | Rationale                           |
| -------------------- | ------------------ | ----------------------------------- |
| Language             | TypeScript         | Type safety and maintainability     |
| Framework            | Next.js            | Performance, SSR, App Router        |
| UI Library           | React              | Component-based architecture        |
| Styling              | Tailwind CSS       | Rapid and consistent UI development |
| Internationalization | next-intl          | EN/FR language support              |
| Authentication       | External API       | Centralized auth management         |
| Storage              | External Services  | Managed infrastructure              |
| Infrastructure       | Next.js Deployment | Simplicity and scalability          |

## Integration Points

| System                 | Protocol | Auth            | Purpose                   | SLA      |
| ---------------------- | -------- | --------------- | ------------------------- | -------- |
| Authentication API     | REST     | API Key / Token | Login and user management | External |
| SMS Provider           | REST     | API Key         | SMS delivery              | External |
| Email Provider         | REST     | API Key         | Email delivery            | External |
| Payment Provider       | REST     | API Key         | Billing and payments      | External |
| Cloud Storage Provider | REST     | API Key         | File management           | External |

## Security Architecture

* **Network**: HTTPS only
* **Transport**: TLS encryption
* **Application**: Input validation and error handling
* **Secrets**: Environment variables
* **Audit**: Client-side logging and monitoring

## Scalability & Limits

* **Current Capacity**: Dependent on hosting provider and external APIs
* **Bottlenecks**: Third-party API latency and availability
* **Scaling Strategy**: Horizontal scaling through frontend deployment platform
* **Rate Limits**: Determined by external service providers

```

### Existing Hooks

- use-auth
- use-comn
- use-contact
- use-key
- use-mobile
- use-otp
- use-payment

### Existing Types

- auth
- api-key
- communication
- contact
- forms
- otp
- payment
```

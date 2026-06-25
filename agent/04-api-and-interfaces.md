API Contracts & Interfaces (AxeDz)
Base URL & Versioning
Production: https://api.axedz.com/api

/api/...
Content-Type:
application/json (default)
multipart/form-data (file uploads)

POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/refresh-token
POST   /api/auth/logout
POST   /api/auth/admin/login
POST   /api/auth/send-reset-otp
PUT    /api/auth/reset-password-otp
PATCH  /api/auth/reset-password
POST   /api/auth/send-verify-sms-otp
PUT    /api/auth/verify-sms
GET    /api/auth/me
PUT    /api/auth/update
GET    /api/auth/storage
DELETE /api/auth/storage

GET    /api/google
GET    /api/google/callback

GET    /api/github
GET    /api/github/callback

POST   /api/contacts
GET    /api/contacts
PUT    /api/contacts/:id
DELETE /api/contacts/:id

POST   /api/api-keys
POST   /api/api-keys/validate
GET    /api/api-keys
GET    /api/api-keys/:id
PUT    /api/api-keys/:id
DELETE /api/api-keys/:id
PATCH  /api/api-keys/:id/rotate
GET    /api/api-keys/:id/stats

POST   /api/communication/send-email
POST   /api/communication/send-sms
GET    /api/communication/usage
GET    /api/communication/wallet
GET    /api/communication/emails
GET    /api/communication/sms

POST   /api/payments/initiate
POST   /api/payments/status/:orderId/sync
GET    /api/payments/history
GET    /api/payments/transactions
GET    /api/payments/wallet
POST   /api/payments/wallet/switch-to-production
POST   /api/payments/wallet/alert


Authorization: Bearer <access_token>
X-API-Key: <api_key>
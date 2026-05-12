- More topics
    
    A senior/fullstack web developer is usually expected to understand security across:
    
    - frontend
    - backend
    - APIs
    - authentication
    - infrastructure
    - cloud
    - deployment
    - data protection
    
    Not just “how to code securely”, but also:
    
    - attack surfaces
    - architecture risks
    - operational security
    
    Here are the most important real-world areas.
    
    ---
    
    # 1. Authentication & Authorization
    
    Most critical topic.
    
    ## Must Know
    
    - JWT vs session auth
    - Refresh tokens
    - OAuth
    - RBAC (Role Based Access Control)
    - Permission systems
    - Secure password hashing
    
    Use:
    
    - bcrypt
    - OAuth 2.0
    
    ---
    
    # 2. OWASP Top 10
    
    Senior developers are expected to know major web vulnerabilities.
    
    Must know:
    
    - XSS
    - CSRF
    - SQL Injection
    - Broken auth
    - Security misconfiguration
    - Sensitive data exposure
    - SSRF
    - Insecure deserialization
    
    Reference:
    
    [OWASP Top 10](https://owasp.org/www-project-top-ten/?utm_source=chatgpt.com)
    
    ---
    
    # 3. API Security
    
    Very important in modern systems.
    
    ## Must Know
    
    - Rate limiting
    - API authentication
    - API versioning
    - Request validation
    - Idempotency
    - Secure headers
    
    Never trust frontend input.
    
    ---
    
    # 4. Secure Password Handling
    
    Never:
    
    - store plain passwords
    - use MD5/SHA1 directly
    
    Use:
    
    - bcrypt
    - argon2
    
    Also:
    
    - password reset expiry
    - OTP expiration
    - brute-force protection
    
    ---
    
    # 5. HTTPS / TLS
    
    Must understand:
    
    - HTTPS everywhere
    - SSL certificates
    - HSTS
    - secure cookies
    
    Without HTTPS:
    
    - all other security weakens
    
    ---
    
    # 6. Secure Cookies
    
    Know:
    
    - HttpOnly
    - Secure
    - SameSite
    
    Example:
    
    ```
    Set-Cookie:
    HttpOnly;
    Secure;
    SameSite=Strict
    ```
    
    ---
    
    # 7. Input Validation & Sanitization
    
    Backend validation mandatory.
    
    Must know:
    
    - schema validation
    - sanitization
    - escaping
    
    Libraries:
    
    - Zod
    - Joi
    
    ---
    
    # 8. XSS Protection
    
    Need understanding of:
    
    - CSP
    - sanitization
    - escaping
    - DOM-based XSS
    - reflected/stored XSS
    
    ---
    
    # 9. SQL/NoSQL Injection
    
    Never build queries like:
    
    ```jsx
    "SELECT * FROM users WHERE id = " + userInput
    ```
    
    Use:
    
    - parameterized queries
    - ORM protections
    
    ---
    
    # 10. Rate Limiting & Abuse Prevention
    
    Protect against:
    
    - brute force
    - spam
    - DOS/DDOS
    
    Tools:
    
    - Redis
    - rate limiting middleware
    
    ---
    
    # 11. Secrets Management
    
    Never:
    
    - commit secrets to GitHub
    - expose env variables publicly
    
    Use:
    
    - `.env`
    - vaults
    - secret managers
    
    Platforms:
    
    - Amazon Web Services Secrets Manager
    - HashiCorp Vault
    
    ---
    
    # 12. Logging & Monitoring
    
    Must know:
    
    - audit logs
    - suspicious activity tracking
    - monitoring
    - alerting
    
    Tools:
    
    - Sentry
    - Grafana
    
    ---
    
    # 13. File Upload Security
    
    Huge real-world risk.
    
    Must validate:
    
    - MIME type
    - file size
    - virus scan
    - extension whitelist
    
    Never trust filename.
    
    ---
    
    # 14. Cloud & Infra Security
    
    Senior engineers often expected to know:
    
    - IAM permissions
    - least privilege principle
    - VPC basics
    - firewall/security groups
    - container security
    
    ---
    
    # 15. Dependency Security
    
    Supply-chain attacks are huge now.
    
    Must know:
    
    - npm audit
    - dependency scanning
    - lock files
    - trusted packages
    
    Tools:
    
    - Dependabot
    
    ---
    
    # 16. CI/CD Security
    
    Protect:
    
    - deployment secrets
    - pipelines
    - production access
    
    Avoid:
    
    - direct prod access for everyone
    
    ---
    
    # 17. Secure Headers
    
    Know these:
    
    - CSP
    - HSTS
    - X-Frame-Options
    - X-Content-Type-Options
    
    Using:
    
    - Helmet
    
    ---
    
    # 18. Webhooks Security
    
    Very common interview topic.
    
    Must:
    
    - verify signatures
    - prevent replay attacks
    - validate source
    
    Example:
    
    - payment gateway webhooks
    
    ---
    
    # 19. Architecture-Level Security
    
    Senior engineers should understand:
    
    - zero trust
    - microservice auth
    - service-to-service auth
    - API gateway security
    - distributed systems risks
    
    ---
    
    # 20. Security Mindset
    
    Most important.
    
    Senior developers think:
    
    - “What can go wrong?”
    - “How can this be abused?”
    - “What if attacker controls this input?”
    
    Not just:
    
    - “Does it work?”
    
    ---
    
    # Strong Senior-Level Topics
    
    If you know these well, you’re already above many mid-level developers:
    
    Strong Topics
    
    ---
    
    JWT refresh token rotation
    
    ---
    
    OAuth flows
    
    ---
    
    CSP
    
    ---
    
    CSRF
    
    ---
    
    Secure payment integrations
    
    ---
    
    Rate limiting
    
    ---
    
    Webhook verification
    
    ---
    
    RBAC/ABAC
    
    ---
    
    XSS prevention
    
    ---
    
    Secure file uploads
    
    ---
    
    Cloud IAM
    
    ---
    
    API gateway security
    
    ---
    
    OWASP Top 10
    
    ---
    
    Secrets management
    
    ---
    
    ---
    
    # Practical Senior Advice
    
    In real companies, biggest production incidents often happen because of:
    
    - bad authorization
    - leaked secrets
    - insecure APIs
    - weak validation
    - missing rate limiting
    - dependency vulnerabilities
    - misconfigured cloud permissions
    
    Not because of complex hacking scenes from movies.
                    Client
                      │
                  API Gateway
                      │
                Load Balancer
                      │
    ┌──────────────┬───────────────┬──────────────┐
    ▼              ▼               ▼              ▼
 Auth Service   Employee Service  Org Service   Payment Service
    │              │               │              │
    ▼              ▼               ▼              ▼
 Auth DB       Employee DB      Org DB        Payment DB

                     │
                     ▼
              📩 Message Broker
                     │
                     ▼
             Notification Service
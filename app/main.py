from fastapi import FastAPI
from prometheus_client import make_asgi_app
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from app.core.config import settings

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="Vaultverse API", version="0.1.0")

# Rate limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, lambda r, e: e)
app.add_middleware(SlowAPIMiddleware)

# Prometheus metrics under /metrics
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}


from __future__ import annotations

import json
import os
from typing import Any
from urllib import request

ROUTERBASE_BASE_URL = "https://routerbase.com/v1"
DEFAULT_MODEL = "google/gemini-2.5-flash"


class RouterBase:
    def __init__(
        self,
        api_key: str | None = None,
        base_url: str = ROUTERBASE_BASE_URL,
        timeout: float = 60,
    ) -> None:
        self.api_key = api_key or os.getenv("ROUTERBASE_API_KEY")
        if not self.api_key:
            raise ValueError("RouterBase API key is required. Set ROUTERBASE_API_KEY.")

        self.base_url = base_url.rstrip("/")
        self.timeout = timeout

    def _request(self, path: str, payload: dict[str, Any] | None = None) -> dict[str, Any]:
        data = None if payload is None else json.dumps(payload).encode("utf-8")
        req = request.Request(
            f"{self.base_url}{path}",
            data=data,
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            },
            method="GET" if payload is None else "POST",
        )

        with request.urlopen(req, timeout=self.timeout) as response:
            body = response.read().decode("utf-8")
            return json.loads(body) if body else {}

    def chat_completion(
        self,
        messages: list[dict[str, str]],
        model: str = DEFAULT_MODEL,
        **kwargs: Any,
    ) -> dict[str, Any]:
        if not messages:
            raise ValueError("messages must be a non-empty list.")

        return self._request(
            "/chat/completions",
            {
                "model": model,
                "messages": messages,
                **kwargs,
            },
        )

    def list_models(self) -> dict[str, Any]:
        return self._request("/models")

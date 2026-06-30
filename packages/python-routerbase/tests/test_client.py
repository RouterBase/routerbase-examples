import json
import unittest
from unittest.mock import patch

from routerbase import DEFAULT_MODEL, RouterBase


class FakeResponse:
    def __init__(self, body):
        self.body = body

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, traceback):
        return False

    def read(self):
        return json.dumps(self.body).encode("utf-8")


class RouterBaseTest(unittest.TestCase):
    def test_requires_api_key(self):
        with patch.dict("os.environ", {}, clear=True):
            with self.assertRaisesRegex(ValueError, "API key"):
                RouterBase()

    def test_chat_completion(self):
        calls = []

        def fake_urlopen(req, timeout):
            calls.append((req, timeout))
            return FakeResponse({"choices": [{"message": {"content": "Hello"}}]})

        with patch("urllib.request.urlopen", fake_urlopen):
            client = RouterBase(api_key="sk-rb-test", timeout=10)
            response = client.chat_completion(
                messages=[{"role": "user", "content": "Hi"}]
            )

        self.assertEqual(response["choices"][0]["message"]["content"], "Hello")
        self.assertEqual(calls[0][0].full_url, "https://routerbase.com/v1/chat/completions")
        self.assertEqual(json.loads(calls[0][0].data.decode("utf-8"))["model"], DEFAULT_MODEL)
        self.assertEqual(calls[0][1], 10)

    def test_list_models(self):
        with patch(
            "urllib.request.urlopen",
            lambda req, timeout: FakeResponse({"data": [{"id": "google/gemini"}]}),
        ):
            client = RouterBase(api_key="sk-rb-test")
            response = client.list_models()

        self.assertEqual(response["data"][0]["id"], "google/gemini")


if __name__ == "__main__":
    unittest.main()

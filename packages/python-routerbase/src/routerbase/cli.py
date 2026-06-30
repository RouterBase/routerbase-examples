from __future__ import annotations

import argparse
import json

from .client import DEFAULT_MODEL, RouterBase


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run a prompt with RouterBase.")
    parser.add_argument("prompt", help="Prompt text to send.")
    parser.add_argument("--model", default=DEFAULT_MODEL, help="RouterBase model id.")
    parser.add_argument("--json", action="store_true", help="Print the full JSON response.")
    return parser


def main() -> None:
    args = build_parser().parse_args()
    client = RouterBase()
    response = client.chat_completion(
        model=args.model,
        messages=[{"role": "user", "content": args.prompt}],
    )

    if args.json:
        print(json.dumps(response, indent=2))
    else:
        print(response.get("choices", [{}])[0].get("message", {}).get("content", ""))


if __name__ == "__main__":
    main()

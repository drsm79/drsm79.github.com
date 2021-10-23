---
layout: post
title: Verifying signatures on the XRPL with Python
categories: web
tags:
    - coding
    - python]
    - xrpl
    - xrp
---
Writing this more because I spent a while bouncing around the internet trying to find an example. There's a [nice library for Javascript](https://github.com/XRPL-Labs/verify-xrpl-signature) from the good people at [XRP Labs](https://xrpl-labs.com/) but I couldn't find similar in Python, and needed to verify a signature for a [XUMM](https://xumm.app/) [login](https://xumm.readme.io/docs/user-sign-in). There is a [comprehensive Python SDK](https://xrpl-py.readthedocs.io/en/stable/) so I figured rolling my own wouldn't be a hardship. In fact it was super easy, the whole thing is just [two](https://xrpl-py.readthedocs.io/en/stable/source/xrpl.core.binarycodec.html?highlight=binarycodec#xrpl.core.binarycodec.decode) [functions](https://xrpl-py.readthedocs.io/en/stable/source/xrpl.core.keypairs.html?highlight=is_valid_message#xrpl.core.keypairs.is_valid_message), it was just a bit hidden away in the docs.

What's nice is we can use the example from the javascript tool to confirm:

```
from xrpl.core.binarycodec import decode
from xrpl.core.binarycodec import encode_for_signing
from xrpl.core.keypairs import is_valid_message


transaction_hex = '2280000000240000000268400000000000000C73210333C718C9CB716E0575454F4A343D46B284ED51151B9C7383524B82C10B262095744730450221009A4D99017F8FD6881D888047E2F9F90C068C09EC9308BC8526116B539D6DD44102207FAA7E8756F67FE7EE1A88884F120A00A8EC37E7D3E5ED3E02FEA7B1D97AA05581146C0994D3FCB140CAB36BAE9465137448883FA487'

decoded = decode(transaction_hex)

expected_account = 'rwiETSee2wMz3SBnAG8hkMsCgvGy9LWbZ1'
assert decoded['Account'] == expected_account

is_valid_message(
    bytes.fromhex(encode_for_signing(decoded)),
    bytes.fromhex(decoded['TxnSignature']),
    decoded['SigningPubKey'],
)
```

It seemed to make sense to wrap this up into a [helper library](https://github.com/audiotarky/xrplpers) and open source it. Let me know if you see any mistakes!

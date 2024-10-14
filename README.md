<h1 align="center">is-not.cool</h1>

<p align="center"><strong>is-not.cool</strong> is a goofy domain made by <a href="https://github.com/CuteDog5695">CuteDog5695</a> and <a href="https://github.com/trollm8">trollm8</a></p>

<p align="center">
   <a href="https://discord.gg/ZtcFe2s7St"><img alt="Discord Server" src="https://invidget.switchblade.xyz/ZtcFe2s7St"></a>
</p>


## Issues
If you have any problems, feel free to [open a issue](https://github.com/is-not-cool/register/issues/new/choose).

If you have an issue, please send a email to support@is-not.cool.

If you have a technical issue, please join our [discord server!](https://discord.gg/ZtcFe2s7St)

## Register
1. Fork the repo.
2. Make a json file named `example.is-not.cool.json` in the `domains` directory
3. Add the following file format to the json you just made:
```json
{
    "domain": "is-not.cool",
    "subdomain": "example",

    "owner": {
        "username": "yourgithubusername",
        "email": "hello@example.com",
        "repo": "yourrepohere"
    },

    "record": {
        "A": ["1.1.1.1", "1.0.0.1"],
        "AAAA": ["2606:4700:4700::1111", "2606:4700:4700::1001"],
        "CNAME": "example.com",
        "MX": ["mx1.example.com", "mx2.example.com"],
        "TXT": ["example_verification=1234567890"],
        "NS": ["ns1.example.com", "ns2.example.com"],
        "SRV": [
            { "priority": 10, "weight": 60, "port": 5060, "target": "sipserver.example.com" },
            { "priority": 20, "weight": 10, "port": 5061, "target": "sipbackup.example.com" }
        ]
    },

    "proxied": false
}
```
> [!NOTE]
> Only select the records you need, this is just a example on what all the records we support should be.

4. Make a Pull Request to the repo and wait for it to be merged. If you want it to be merged faster then consider joining [our discord server!](https://discord.gg/ZtcFe2s7St)
5. After the Pull Request is merged, DNS should propogate in a moment or 24 hours.
6. That's all, enjoy your `is-not.cool` domain!

## Documentation
If you want to take a look into our documentation [go here!](https://docs.is-not.cool)

### Similar Services
If you want to find services similar to is-not.cool, please check out [Open Domains](https://github.com/open-domains/register) and [is-a.dev](https://github.com/is-a-dev/register)

<h1 align="center">is-not.cool</h1>

<p align="center"><strong>is-not.cool</strong> is a goofy domain made by <a href="https://github.com/iostpa">iostpa</a> and <a href="https://github.com/trollmeight">trollmeight</a>.</p>

<p align="center">
   <a href="https://discord.gg/ZtcFe2s7St"><img alt="Discord Server" src="https://invidget.switchblade.xyz/ZtcFe2s7St"></a>
</p>

> [!CAUTION]
> We do not support Vercel or Cloudflare at the moment since we are not on the PSL. 
 
## Issues
If you have any problems, feel free to [open an issue](https://github.com/is-not-cool/register/issues/new/choose).

If you have an issue, please send a email to support@is-not.cool.

If you have a technical issue, please join our [Discord server](https://discord.gg/ZtcFe2s7St)!

## Register
1. Fork the repo.
2. Make a json file named `example.json` in the `domains` directory.
3. Add the following file format to the json you just made:
```json
{
    "owner": {
        "username": "your-github-username",
        "email": "hello@example.com",
        "repo": "your-repository-link-here"
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
        ],
        "DS": [
            {
                "key_tag": 2371,
                "algorithm": 13,
                "digest_type": 2,
                "digest": "...."
            }
        ]
    },
    "proxied": false
}
```
> [!NOTE]
> Only select the records you need, this is just an example of all the records we support.

4. Make a pull request to the repo and wait for it to be merged. If you want it to be merged faster then consider joining [our Discord server](https://discord.gg/ZtcFe2s7St)!
5. After the pull request is merged, the DNS records should propagate within 24 hours.
6. That's all, enjoy your `is-not.cool` subdomain!

## Documentation
Our documentation is available [here](https://docs.is-not.cool)!

### Similar Services
If you want to find services that are similar to is-not.cool, please check out [Open Domains](https://github.com/open-domains/register), [is-a.dev](https://github.com/is-a-dev/register), [part-of.my.id](https://github.com/partofmyid/register), and [is-truly-a.pro](https://github.com/is-truly-a-pro/register).

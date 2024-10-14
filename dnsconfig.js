var regnone = newregistar("none");
var providercf = dnsprovider(newdnsprovider("cloudflare"));

var proxy = {
  on: { "cloudflare_proxy": "on" },
  off: { "cloudflare_proxy": "off" }
};

function getdomainslist(filespath) {
  var result = [];
  var files = glob.apply(null, [filespath, true, '.json']);

  files.forEach(function (file) {
    var filename = file.split('/').pop();
    var domainname = filename.split('.')[0];
    var domaindata = require(file);

    result.push({ name: domainname, data: domaindata });
  });

  return result;
}

function processdomains(filespath) {
  var domains = getdomainslist(filespath);
  var commit = {};

  domains.forEach(function (domaininfo) {
    var domaindata = domaininfo.data;
    var proxystate = domaindata.proxied === false ? proxy.off : proxy.on;

    if (!commit[domaindata.domain]) {
      commit[domaindata.domain] = [];
    }

    function addrecord(recordtype, subdomain, value, extra = {}) {
      commit[domaindata.domain].push(recordtype(subdomain, value, extra));
    }

    if (domaindata.record) {
      var records = domaindata.record;

      if (records.A) {
        records.A.forEach(function (ip) {
          addrecord(A, domaindata.subdomain, IP(ip), proxystate);
        });
      }

      if (records.AAAA) {
        records.AAAA.forEach(function (ipv6) {
          addrecord(AAAA, domaindata.subdomain, ipv6, proxystate);
        });
      }

      if (records.CNAME) {
        addrecord(CNAME, domaindata.subdomain, records.CNAME + ".", proxystate);
      }

      if (records.MX) {
        records.MX.forEach(function (mx) {
          addrecord(MX, domaindata.subdomain, 10, mx + ".");
        });
      }

      if (records.NS) {
        records.NS.forEach(function (ns) {
          addrecord(NS, domaindata.subdomain, ns + ".");
        });
      }

      if (records.TXT) {
        records.TXT.forEach(function (txt) {
          addrecord(TXT, domaindata.subdomain, txt);
        });
      }

      if (records.SRV) {
        records.SRV.forEach(function (srv) {
          addrecord(SRV, domaindata.subdomain, srv.priority, {
            weight: srv.weight,
            port: srv.port,
            target: srv.target + "."
          });
        });
      }
    } else {
      console.error(`No record data found for domain: ${domaindata.domain}`);
    }
  });

  return commit;
}

function committoprovider(commit) {
  for (var domainname in commit) {
    if (commit.hasOwnProperty(domainname)) {
      D(domainname, regnone, providercf, commit[domainname]);
    }
  }
}

var dnscommits = processdomains('./domains');
committoprovider(dnscommits);

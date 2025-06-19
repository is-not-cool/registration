var regNone = NewRegistrar("none");
var providerCf = DnsProvider(NewDnsProvider("cloudflare"));

var rootDomain = 'is-not.cool';
var proxy = { // https://stackexchange.github.io/dnscontrol/providers/cloudflare
  on: { "cloudflare_proxy": "on" },
  off: { "cloudflare_proxy": "off" }
}

function getDomainsList(filesPath) {
  var result = [];
  var files = glob.apply(null, [filesPath, true, '.json']);

  for (var i = 0; i < files.length; i++) {
    var name = files[i].split("/").pop().replace(/\.json$/, "");

    result.push({ name: name, data: require(files[i]) });
  }

  return result;
}

var domains = getDomainsList('./domains');
var commit = [];

for (var idx in domains) {
  var subdomainName = domains[idx].name;
  var domainData = domains[idx].data;
  var proxyState = proxy.on; // enabled by default

  if (!commit[domainData.domain]) {
    commit[domainData.domain] = [];
  }

  if (domainData.proxied === false) {
    proxyState = proxy.off;
  }

  if (domainData.record.A) {
    for (var a in domainData.record.A) {
      commit[domainData.domain].push(
        A(subdomainName, IP(domainData.record.A[a]), proxyState)
      )
    }
  }

  if (domainData.record.AAAA) {
    for (var aaaa in domainData.record.AAAA) {
      commit[domainData.domain].push(
        AAAA(subdomainName, domainData.record.AAAA[aaaa], proxyState)
      )
    }
  }

  if (domainData.record.CNAME) {
    commit[domainData.domain].push(
      CNAME(subdomainName, domainData.record.CNAME + ".", proxyState)
    )
  }
  
  if (domainData.record.MX) {
    for (var mx in domainData.record.MX) {
      commit[domainData.domain].push(
        MX(subdomainName, 10, domainData.record.MX[mx] + ".")
      )
    }  
  }

  if (domainData.record.NS) {
    for (var ns in domainData.record.NS) {
      commit[domainData.domain].push(
        NS(subdomainName, domainData.record.NS[ns] + ".")
      )
    }
  }

  if (domainData.record.TXT) {
    for (var txt in domainData.record.TXT) {
      commit[domainData.domain].push(
        TXT(subdomainName, domainData.record.TXT[txt])
      )
    }
  }

  if (domainData.record.SRV) {
    for (var srv in domainData.record.SRV) {
      var srvRecord = domainData.record.SRV[srv];
      commit[domainData.domain].push(
        SRV(subdomainName, srvRecord.priority, srvRecord.weight, srvRecord.port, srvRecord.target + ".")
      );
    }
  }

    if (domainData.record.DS) {
    for (var ds in domainData.record.DS) {
      var dsRecord = domainData.record.DS[ds];
      commit[domainData.domain].push(
        DS(subdomainName, dsRecord.key_tag, dsRecord.algorithm, dsRecord.digest_type, dsRecord.digest)
      );
    }
  }
}

for (var domainName in commit) {
  D(rootDomain, regNone, providerCf, commit);
}

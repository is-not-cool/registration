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

  if (domainData.records.A) {
    for (var a in domainData.records.A) {
      commit[domainData.domain].push(
        A(subdomainName, IP(domainData.records.A[a]), proxyState)
      )
    }
  }

  if (domainData.records.AAAA) {
    for (var aaaa in domainData.records.AAAA) {
      commit[domainData.domain].push(
        AAAA(subdomainName, domainData.records.AAAA[aaaa], proxyState)
      )
    }
  }

  if (domainData.records.CNAME) {
    commit[domainData.domain].push(
      CNAME(subdomainName, domainData.records.CNAME + ".", proxyState)
    )
  }
  
  if (domainData.records.MX) {
    for (var mx in domainData.records.MX) {
      commit[domainData.domain].push(
        MX(subdomainName, 10, domainData.records.MX[mx] + ".")
      )
    }  
  }

  if (domainData.records.NS) {
    for (var ns in domainData.records.NS) {
      commit[domainData.domain].push(
        NS(subdomainName, domainData.records.NS[ns] + ".")
      )
    }
  }

  if (domainData.records.TXT) {
    for (var txt in domainData.records.TXT) {
      commit[domainData.domain].push(
        TXT(subdomainName, domainData.records.TXT[txt])
      )
    }
  }

  if (domainData.records.SRV) {
    for (var srv in domainData.records.SRV) {
      var srvRecords = domainData.records.SRV[srv];
      commit[domainData.domain].push(
        SRV(subdomainName, srvRecords.priority, srvRecords.weight, srvRecords.port, srvRecords.target + ".")
      );
    }
  }

    if (domainData.records.DS) {
    for (var ds in domainData.records.DS) {
      var dsRecords = domainData.records.DS[ds];
      commit[domainData.domain].push(
        DS(subdomainName, dsRecords.key_tag, dsRecords.algorithm, dsRecords.digest_type, dsRecords.digest)
      );
    }
  }
}

for (var domainName in commit) {
  D(rootDomain, regNone, providerCf, commit);
}

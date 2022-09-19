# ens-bigquery-udf

Converstion scripts to port old and new ens normalisation libs

## Usage

```
git clone https://github.com/ensdomains/ens-bigquery-udf
cd ens-bigquery-udf
yarn
yarn build

yarn run v1.22.17
warning ../package.json: No license field
$ yarn build:old1 && yarn build:old2 && yarn build:new
warning ../package.json: No license field
$ rollup -c rollup.config.eth_ens_namehash_2_0_8

src/index.js → dist/eth-ens-namehash-2-0-8.js...
created dist/eth-ens-namehash-2-0-8.js in 413ms
warning ../package.json: No license field
$ rollup -c rollup.config.eth_ens_namehash_2_0_15

src/eth-ens-namehash-2-0-15.js → dist/eth-ens-namehash-2-0-15.js...
created dist/eth-ens-namehash-2-0-15.js in 369ms
warning ../package.json: No license field
$ rollup -c rollup.config.ens_normalize.js

src/ens-normalize.js → dist/ens-normalize.js...
created dist/ens-normalize.js in 118ms
✨  Done in 2.44s.

```

Once done, upload files under dist/ to https://console.cloud.google.com/storage/browser/jsassets

## Query example

```
CREATE TEMP FUNCTION ens_normalize(arg1 STRING)
RETURNS STRING
LANGUAGE js
  OPTIONS (
    library=['gs://jsassets/ens-normalize.js'])
AS r"""
  try{
    return ens_normalize(arg1)
  }catch(e){
    return null;
  }
""";


CREATE TEMP FUNCTION eth_ens_namehash_2_0_8(arg1 STRING)
RETURNS STRING
LANGUAGE js
  OPTIONS (
    library=['gs://jsassets/eth-ens-namehash-2-0-8.js'])
AS r"""
  try{
    return eth_ens_namehash_2_0_8(arg1)
  }catch(e){
        return null;
  }

""";

CREATE TEMP FUNCTION eth_ens_namehash_2_0_15(arg1 STRING)
RETURNS STRING
LANGUAGE js
  OPTIONS (
    library=['gs://jsassets/eth-ens-namehash-2-0-15.js'])
AS r"""
  try{
    return eth_ens_namehash_2_0_15(arg1)
  }catch(e){
        return null;
  }

""";

CREATE TEMP FUNCTION NAME_TO_LABELHASH(name STRING)
RETURNS STRING
LANGUAGE js
  OPTIONS (
    library=["gs://blockchain-etl-bigquery/ethers.js"])
AS r"""
    var utils = ethers.utils;
    var labelHash
    if(name === null) return '';
    try{
      return utils.keccak256(utils.toUtf8Bytes(name));
    }catch(e){
      return null
    }

""";


WITH Example AS
 (SELECT '50' as label UNION ALL
  SELECT  null  UNION ALL
  SELECT  '' UNION ALL
  SELECT  '–brokensea' UNION ALL --* both ok but  different *--
  SELECT  '۸۸۷۵۴۲'  UNION ALL --* legacy error, new ok *--
  SELECT  '⁕⁕⁕⁕⁕'  UNION ALL --* legacy error, new ok *--
  SELECT '🚀‍‍‍‍‍‍‍‍‍‍🚀‍‍‍‍‍‍‍‍‍‍🚀‍‍‍‍‍‍‍‍‍‍') --* legacy ok , new error *--
SELECT label,
  eth_ens_namehash_2_0_8(label) as old_2_0_8,
  LEFT(NAME_TO_LABELHASH(eth_ens_namehash_2_0_8(label)), 5) as old_2_0_8_hash,
  eth_ens_namehash_2_0_15(label) as old_2_0_15,
  LEFT(NAME_TO_LABELHASH(eth_ens_namehash_2_0_15(label)), 5) as old_2_0_15_hash,
  ens_normalize(label) as new_1_6_4,
  LEFT(NAME_TO_LABELHASH(ens_normalize(label)), 5) as new_1_6_4_hash,
  NAME_TO_LABELHASH(eth_ens_namehash_2_0_15(label)) != NAME_TO_LABELHASH(ens_normalize(label)) AND eth_ens_namehash_2_0_15(label) IS NOT NULL as refund

FROM Example
```

You can see the qury result [here](https://console.cloud.google.com/bigquery?sq=329024247671:e2bd661ca2514c23b75a1dc7aeb1ab56)

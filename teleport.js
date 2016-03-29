var util = require('util');

var fetch = require('node-fetch');
var upperCase = require('upper-case');
var jsonPath = require('jsonpath-plus');

async function fetchJson($uri){

  let $result = await fetch($uri, {'headers':
    {'User-Agent': 'StudyPortals-nodejs-test/1.0'}});
  return await $result.json();
}

async function getUADetailsJson($city){

  let $json =
    await fetchJson("https://api.teleport.org/api/cities/?search=" + $city);

  $json = await fetchJson(
    $json._embedded["city:search-results"][0]._links['city:item'].href);

  $json = await fetchJson($json._links["city:urban_area"].href);

  return await fetchJson($json._links["ua:details"].href);
}

async function getUADetail($id, $json){

  var $path;

  if($id === ''){

    $path = "$..id";
  }
  else{

    $path = "$..*[?(@property === 'id' && @ === '" + $id + "')]^";
  }

  return jsonPath({
    json: await $json,
    path: $path
  });
}

if(!process.argv[2]){

  throw new Error('Argh! No city specified...');
}

var $city = process.argv[2];
var $detailId = '';

if(process.argv[3]){

  $detailId = upperCase(process.argv[3]);
}

(async function(){

  let $detail = await getUADetail($detailId, getUADetailsJson($city));

  console.log(util.inspect($detail, false, null));

})();

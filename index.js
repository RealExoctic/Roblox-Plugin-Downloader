const axios = require('axios');
const path = require('path');
const fs = require('fs')

// Config
const CategoryType = 7
/*
Identifier	Type	Subcategory
Image	        1
T-Shirt	      2	      12
Audio	         3	    15
Mesh	4
Lua	5
HTML	6
Text	7
Hat	8	8
Place	9
Model	10	6
Shirt	11	11
Pants	12	13
Decal	13	7
Avatar	16
Head	17	14
Face	18	9
Gear	19	5
Badge	21
Group Emblem	22
Animation	24
Arms	25
Legs	26
Torso	27
Right Arm	28
Left Arm	29
Left Leg	30
Right Leg	31
Package	32	10
YouTubeVideo	33
Game Pass	34
App	35
Code	37
Plugin	38
SolidModel	39
MeshPart	40
Hair Accessory	41
Face Accessory	42
Neck Accessory	43
Shoulder Accessory	44
Front Accessory	45
Back Accessory	46
Waist Accessory	47
Climb Animation	48
Death Animation	49
Fall Animation	50
Idle Animation	51
Jump Animation	52
Run Animation	53
Swim Animation	54
Walk Animation	55
Pose Animation	56
Ear Accessory	57
Eye Accessory	58
Ear Accessory	57
Emote Animation	61
Video	62
*/
const GetEveryPlugin = false // wip

axios.get("https://search.roblox.com/catalog/json?CatalogContext=2&Category=" + CategoryType).then(function (response) {
    response.data.forEach(plugin => {
      axios({
        url: "https://assetdelivery.roblox.com/v1/asset/?id=" + plugin.AssetId,
        method: "GET",
        responseType: "stream"
      }).then(function (response) {
        const writer = fs.createWriteStream(path.resolve(__dirname,"plugins",plugin.Name + plugin.AssetId + ".rbxm"))
        response.data.pipe(writer)

        writer.on('finish',function() {
          console.log("Finished downloading " + plugin.Name)
        })
        writer.on('error', function (err) { 
          console.warn("Failed to download " + plugin.Name) 
        })
      })
    })
})
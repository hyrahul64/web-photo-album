function onLoad() {
    console.log("Log from javascript file onLoad() function.");
    //launchOneDrivePicker();
    fetchImages();
    //displayImages();
}

function downloadImage(imageParam, access_token) {
    console.log("log from function downloadImage()")
    let image_download_url = Object.values(imageParam)[0];
    console.log(image_download_url)
    
    /* fetch(image_download_url,
        {
            method: "GET",
            headers:{
                Authorization:access_token
            }
        }).then(resp => {
            if(resp.status = 200) {
                console.log("image downloded")
                resp = resp.blob();
                return resp;
            } else {
                console.log("Error in loading image:" + imageParam.name)
            }
        }).then(blob => {
            download(blob, imageParam.name)
        }) */

}

function downloadImages(imageParamList, access_token) {
    console.log("Log from downloadImages()")
    // imageParamList.forEach(imageParam => downloadImage(imageParam, access_token));
    let desc= ["Auckaland - Tamaki Drivew View","Auckalnd - Sea View from Hill at Devenport","Pahia - Sun Rise in Clear Sky","Paihia - Cruising at Bay of Island","Paihia - Russel Island View","Paihia - Russel Island","Paihia - The Hole in Rock","Paihia - Way Back from Haruru Water Fall","Raglan - Girl with Surf Board","Rotorua - City Lake View","Rotorua - Morning Walk (2)","Rotorua - Morning Walk (3)","Wellington - Botanic Garden","Rotorua - Morning Walk (4)","Rotorua - Morning Walk","Rotorua - Redwood Forest","Rotorua - Sunset on Sunny Day","Rotorua- Way Back from Hell's Geo-Thermal Reserve","Taupo - On the Way to Huka Fall Trail","Taupo - Taupo Lake","Taupo - Waikato River","The Moon - Day View (Canon Sx70 X65 Optical Zoom)","Cambridge - Random Walk","Wellington - Pukera Bay","Wellington - Shades after Showers","Wellington - Trees at Zealandia","Whangrei - The Whangrei Fall","Hamilton - Frankton Random Walk (2)","Hamilton - Frankton Random Walk","Hamilton - Glenview Fiztroy Garden","Hamilton - Glenview Random Walk (2)","Hamilton - Glenview Random Walk","Hamilton - Karapiro Lake View (2)","Hamilton - Karapiro Lake View","Hamilton - Road at Glenview","Auckland - City View from Taraki Drive","Auckland - Devenport Island View","Auckland - Devenport Random Walk","Auckland - KingFisher at Devenport","Auckland - Sky City from Devnport Hill","Auckland - Sky Tower behind The Wharf","Auckland - View From Way To Island Waiheke","Hamilton - Random Walk","Full Moon - Night View (Canon Sx70 X65 Optical Zoom)"];
    for(var i=0; i<imageParamList.length; i++) {
        const imgDiv = document.createElement('div')
        imgDiv.className = 'grid-image';
        let image_download_url = Object.values(imageParam[i])[0];
        imgDiv.innerHTML=`<p>image-${i+1}</p><img src="${image_download_url}"/>`
        console.log(imgDiv.innerHTML);
        document.getElementById('content-grid').appendChild(imgDiv);
    }
    
}
function getFilslistFromDir(access_token) {
    console.log("Log from javascript file getFilesFromDir()")
    const photo_dirctory_url = "https://api.onedrive.com/v1.0/drives/15d9078b36f5bc5a/items" 
        + "/15D9078B36F5BC5A!6692/children?select=name,size,@content.downloadUrl";
    fetch(photo_dirctory_url,
            {   method: 'GET',
                headers:{
                    Accept : "application/json",
                    Authorization: "Bearer " + access_token
                }
            }
        )
        .then(response => {
            console.log(response)
            return response.json();
        }
        ).then(data => {
            console.log(data.value)
            downloadImages(data.value, access_token)
        })
        .catch(err => {
            console.log(err);
        })
}

function getAccessToken() {
    console.log("log from function getAccessToken()")
    const application_id = "55220f20-0882-4457-9e11-9f12d7d663ed";
    const redirect_uri = "http://localhost:5500";
    const scope = "onedrive.readwrite offline_access";
    const one_drive_url = `https://login.live.com/oauth20_authorize.srf?` + 
        `client_id=${application_id}&scope=${scope}&response_type=token&redirect_uri=${redirect_uri}`;
    fetch(one_drive_url,) 
    .then(response => { 
        if (response.ok) { 
        console.log("response received.")
        let inurl_resp = window.location.hash;
        console.log(inurl_resp)
        let access_token = inurl_resp.split("&")[0].split("=")[1];
        console.log(access_token)
        return access_token;
        } else { 
            console.log("Error while fetching data.")
        } 
    }) 
    .then(access_token => { 
        getFilslistFromDir(access_token)
    }) 
    .catch(error => { 
        // Handle any errors here 
        console.error("Error after fetching data" + error); 
    });
}
function fetchImages() {
    console.log("Log from javascript file fetchImages() function.");
    getAccessToken();
}

function displayImages() {
    let desc= ["Auckaland - Tamaki Drivew View","Auckalnd - Sea View from Hill at Devenport","Pahia - Sun Rise in Clear Sky","Paihia - Cruising at Bay of Island","Paihia - Russel Island View","Paihia - Russel Island","Paihia - The Hole in Rock","Paihia - Way Back from Haruru Water Fall","Raglan - Girl with Surf Board","Rotorua - City Lake View","Rotorua - Morning Walk (2)","Rotorua - Morning Walk (3)","Wellington - Botanic Garden","Rotorua - Morning Walk (4)","Rotorua - Morning Walk","Rotorua - Redwood Forest","Rotorua - Sunset on Sunny Day","Rotorua- Way Back from Hell's Geo-Thermal Reserve","Taupo - On the Way to Huka Fall Trail","Taupo - Taupo Lake","Taupo - Waikato River","The Moon - Day View (Canon Sx70 X65 Optical Zoom)","Cambridge - Random Walk","Wellington - Pukera Bay","Wellington - Shades after Showers","Wellington - Trees at Zealandia","Whangrei - The Whangrei Fall","Hamilton - Frankton Random Walk (2)","Hamilton - Frankton Random Walk","Hamilton - Glenview Fiztroy Garden","Hamilton - Glenview Random Walk (2)","Hamilton - Glenview Random Walk","Hamilton - Karapiro Lake View (2)","Hamilton - Karapiro Lake View","Hamilton - Road at Glenview","Auckland - City View from Taraki Drive","Auckland - Devenport Island View","Auckland - Devenport Random Walk","Auckland - KingFisher at Devenport","Auckland - Sky City from Devnport Hill","Auckland - Sky Tower behind The Wharf","Auckland - View From Way To Island Waiheke","Hamilton - Random Walk","Full Moon - Night View (Canon Sx70 X65 Optical Zoom)"];
    for(var i=0; i<44; i++) {
        const imgDiv = document.createElement('div')
        imgDiv.className = 'grid-image';
        imgDiv.innerHTML=`<p>${desc[i]}</p><img src=".\\images\\Image-${i+1}.jpg"/>`
        console.log(imgDiv.innerHTML);
        document.getElementById('content-grid').appendChild(imgDiv);
    }
}

function launchOneDrivePicker() {
    var odOptions = {
        clientId: "22638199-9cce-44a4-96a8-371ca1ba7319",
        action: "download",
        multiSelect: true,
        openInNewWindow: true,
        advanced: {
            queryParameters: "select=id,name,size,file,folder,photo",

            redirectUri: "http://localhost:5500/"
        },
        success: function (response) { /* success handler */      },
        cancel: function () { /* cancel handler */ },
        error: function (e) { /* error handler */ },
    };
    OneDrive.open(odOptions);
}

function fectchAjax() {
    var createCORSRequest = function(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
          // Most browsers.
          xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
          // IE8 & IE9
          xhr = new XDomainRequest();
          xhr.open(method, url);
        } else {
          // CORS not supported.
          xhr = null;
        }
        return xhr;
      };
      
      var url = 'https://graph.microsoft.com/v1.0/me/drive/root/children';
      var method = 'GET';
      var xhr = createCORSRequest(method, url);
      
      xhr.onload = function() {
        console.log("Ajax call success");
      };
      
      xhr.onerror = function() {
        console.log("Ajax call failure")
      };
      
      xhr.setRequestHeader('Authorization', 'Bearer access_token_value');
      xhr.send();
}
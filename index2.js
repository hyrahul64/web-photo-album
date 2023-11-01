function onLoad() {
    console.log("log from onLoad() function")
    displayImages();    
}
async function displayImages() {
    console.log("log from displayImages() function")
    const access_token = await getAccessToken();
    console.log(access_token);
    fetchImages(access_token);
}

async function getAccessToken() {
    console.log("log from getAccessToken() function")
    const client_id = "55220f20-0882-4457-9e11-9f12d7d663ed";
    const scope = "onedrive.readwrite offline_access";
    const redirect_uri = "http://localhost:5500";
    const one_drive_auth_endpoint = `https://login.live.com/oauth20_authorize.srf?` + 
        `client_id=${client_id}&scope=${scope}&response_type=token&redirect_uri=${redirect_uri}`;
    let resp = await fetch(one_drive_auth_endpoint);
    if(resp.status == 200) {
        console.log("response received.")
        let inurl_resp = window.location.hash;
        //console.log(inurl_resp);
        let access_token = inurl_resp.split("&")[0].split("=")[1];
        //console.log(access_token);
        return access_token;
    } else {
        console.log("Error in getting auth token:" + resp.status);
    }
}


async function fetchImages(access_token) {
    console.log("log from fetchImages() function");
    const image_source_endpoint = "https://api.onedrive.com/v1.0/drives/15d9078b36f5bc5a/items" 
        + "/15D9078B36F5BC5A!6692/children?select=name,@content.downloadUrl";
    const resp = await fetch(image_source_endpoint,
        {   method: 'GET',
            headers:{
                Accept : "application/json",
                Authorization: "Bearer " + access_token
            }
        }
    );
    //console.log(resp);
    const json_resp = await resp.json();
    const imageparams_list = json_resp.value;
    console.log(imageparams_list);
    for(var i=0; i < imageparams_list.length; i++) {
        let image_download_endpoint = Object.values(imageparams_list[i])[0];
        let image_download_name = Object.values(imageparams_list[i])[1];
        let start_time = Date.now();
        let resp  = await fetch(image_download_endpoint,
            {
                method: "GET",
                headers:{
                    Authorization:access_token
                }
            });
        let end_time = Date.now();
        console.log("time interval:" + (end_time - start_time));
        if(resp.status = 200) {
            console.log("image downloded:" + image_download_name);
            const blob = await resp.blob();
            const objectUrl = URL.createObjectURL(blob);
            const imgDiv = document.createElement('div')
            imgDiv.className = 'grid-image';
            imgDiv.innerHTML=`<p>Image-${i}</p><img src="${objectUrl}"/>`
            document.getElementById('content-grid').appendChild(imgDiv);
        } else {
            console.log("Error in loading image:" + image_download_name);
        }

    }

}
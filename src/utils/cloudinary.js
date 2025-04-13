import { v2 as cloudinary } from 'cloudinary';
import file from 'fs';


    // Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:   process.env.CLOUDINARY_CLOUD_KEY , 
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});

const cloudinaryUploder = async function(localFilePath){
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type : "auto"})
        console.log("File uploaded Succesfully",response.url);
        return response;
    } catch (error) {
        file.unlinkSync(localFilePath); // remove filr from local saved fil coz error has occured in uploading to cloudinary
        return null
    }
    
}

export {cloudinaryUploder} ;
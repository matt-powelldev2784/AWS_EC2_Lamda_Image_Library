# NodeJs Image Library Server

Node JS API Server built to enable a front end to serve an image library.  
Images are hosted in an AWS S3 Bucket.  
The node server is hosted in an AWS EC2 Instance.  
It uses an AWS Lamda function to generate image thumbnails.

Secure pre-signed URL's are provided to upload the images directly to AWS S3
which minimises the load on the Node Server.

## How To Get Presigned URL For Upload Image

Perform a get request to:  
http://18.134.11.162:5001/get-presigned-url

This will return an imageUrl which should be used to add a reference to the
image in the database.  
The imageUrl should be used to define the path parameter when adding the image
to the database on the front end.

## How To Add Image To Database

Perform a post request to:  
http://18.134.11.162:5001/add-image-details-to-db

The body of the post request should be json in the following format:  
{  
path: ImageUrl **// this should contain the imageUrl returned from**
**/get-presigned-url**  
uploadedBy: 'name', **// the name of the person uploading**  
description: 'A man on the moon', **// a description of the image**  
tags: [ "moon", "man" ] **// an array of strings which the images can be**
**searched against.**  
}

## How To Performn Image Search

#### All Images

To search for all images perform a get request to:  
http://18.134.11.162:5001/search-images

If you wish customize your search you can add multiple query parameters which
should be separated by a '&' symbol as described below.

#### Search Image By Tag

To search for images by tag perform a get request to:  
To search the http://18.134.11.162:5001/search-images?tags=cat&tags=hat

The query parameters are in the following format:  
tags=searchTag

To search for multiple tags include a & parameter between each tag:  
i.e tags=cat&tags=hat

#### Specify How Many Images Are Returned

By default the API will return 12 images if you wish to manually specify the
amount of images returned:  
Add the query parameter limit=number  
i.e. http://18.134.11.162:5001/search-images?tags=cat&tags=hat&limit=2

#### Specify The Page Of Images Returned

To specify the page of images you wany to return: Add the query parameter
page=number  
i.e http://18.134.11.162:5001/search-images?tags=cat&tags=hat&page=3

#### API Return Format

The image search will return the following json: {  
 success: true,  
 status: 200,  
 msg: "Images found",  
 data: {  
 images: [] **// An array of image details including image path**  
 total: 26, **// The total number of images found**  
 returned: 12 **// The number of images return will always be 12**  
 }  
 }

Each image in the image array will return the following JSON:  
 {  
 \_id: "imageIdHash",  
 "path": "https://aws.s3/imageName",  
 "thumbnailPath": "https://aws.s3/imageName-thumbnail",  
 "uploadedBy": "name",  
 "description": "man on the moon",  
 "tags": [ "moon", "man" ],  
 }

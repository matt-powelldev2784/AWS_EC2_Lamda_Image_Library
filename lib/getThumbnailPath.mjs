export const getThumbnailPath = (path) => {
  const thumbnailPathArray = path.split('/')

  thumbnailPathArray[2] =
    'mattpowell2784-aws-image-hosting-thumbnails.s3.eu-west-2.amazonaws.com'

  thumbnailPathArray[3] = `${thumbnailPathArray[3]}-thumbnail`

  const thumbnailPath = thumbnailPathArray.join('/')

  return thumbnailPath
}

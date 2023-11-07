// get  /api/video
import video from '@/database/video'
import postDirs from '@/database/postDirs'

console.log(postDirs);


export default defineEventHandler(() => {
  return video
})

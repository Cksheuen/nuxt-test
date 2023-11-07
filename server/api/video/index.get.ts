import path, { dirname } from 'node:path'
import process from 'node:process'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'


// get  /api/video
import video from '@/database/video'

export default defineEventHandler(() => {
  

  const postsDirectory = path.join(process.cwd(), 'public', 'posts', 'notes')
  // = path.join(__dirname, '..', '..', 'posts', body.path)
  // = path.join(process.cwd(), `posts/${body.path}`)
  //  = `/posts/${body.path}`
  console.log(postsDirectory)

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace('/\.md$/', '')

    const fsState = fs.statSync(path.join(postsDirectory, fileName))
    const cdate = fsState.ctime

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      cdate,
      ...matterResult.data,

    }
  })
  console.log(allPostsData);
  
  return video
})

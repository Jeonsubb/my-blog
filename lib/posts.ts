import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';


//1. 마크다운 파일들이 있는 경로를 지정합니다.
const postsDirectory = path.join(process.cwd(),'posts');

//2. 게시글 데이터의 타입 정의
export interface PostData{
  id: string;
  title: string;
  date: string;
  description: string;
  contentHtml: string;
}

//3. 특정 파일 하나를 읽어오는 함수
export async function getPostData(id:string):Promise< PostData>{
  //파일 경로: posts/nextjs-start.md
  const fullPath=path.join(postsDirectory, `${id}.md`);

  //파일 내용을 텍스트로 읽어옴.
  const fileContents = fs.readFileSync(fullPath,'utf8');

  //gray-matter로 파싱
  const matterResult = matter(fileContents)

  //마크다운을 HTML로 변환
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  //파싱된 데이터와 id를 합쳐서 반환
  return {
    id,
    contentHtml,
    ...(matterResult.data as {title:string; date: string; description:string})
  };
}
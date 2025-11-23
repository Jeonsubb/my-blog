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
  contentHtml?: string;
  thumbnail?: string; // 물음표(?)는 "있을 수도 있고 없을 수도 있다"는 뜻
  category? :string;
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
    ...(matterResult.data as {title:string; date: string; description:string; thumbnail?: string})
  };
}

 //모든 글 목록 가져와서 날짜 순 정렬하기
  export function getSortedPostData(){
    //1. posts 폴더 안의 파일 이름들을 다 가져오기
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData=fileNames.map((fileName)=>{
      //2. 파일 이름에서 .md를 제거해서 id로 쓰기
      const id = fileName.replace(/\.md$/,'');

      //3. 파일 내용 읽기
      const fullPath=path.join(postsDirectory,fileName);
      const fileContents=fs.readFileSync(fullPath,'utf8');

      //4. 메타데이터 파싱
      const matterResult=matter(fileContents);

      //5. 데이터 합치기
      return {
        id,
        ...(matterResult.data as {title:string;date:string;description:string;thumbnail?:string;category?:string;}),
      };
    });

    return allPostsData.sort((a,b) => {
      if(a.date<b.date){
        return 1;
      } else {
        return -1;
      }
    });
  }

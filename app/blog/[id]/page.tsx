// src/app/blog/[id]/page.tsx
import {getPostData} from "@/lib/posts";

// Props 타입 정의 (id가 문자열로 들어옵니다)
type Props = {
  params: Promise<{ id: string }>;
};

// 'async' 키워드가 붙은 것에 주목하세요!
export default async function BlogPost({ params }: Props) {
  // 1. URL에 있는 id 값을 기다려서(await) 꺼냅니다.
  const { id } = await params;

  //2. 방금 만든 함수로 실제 마크다운 파일 읽어오기
  const post = await getPostData(id);

  return (
    <div className="p-24">
      {/* 뒤로가기 버튼 */}
      <div className="mb-8">
      <a href="/blog" className="text-blue-500 hover:underline mb-4 block">
        &larr; 목록으로 돌아가기
      </a>
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500">{post.date}</p>
      </div>

     <article className="prose lg:prose-xl">
        {/* 2. dangerouslySetInnerHTML 사용 
           "이건 내가 검증한 안전한 HTML이니까 태그로 변환해서 보여줘!" 라는 뜻입니다.
        */}
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </div>
  );
}
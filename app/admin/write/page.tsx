import type { Metadata } from "next";
import EditorLab from "@/components/EditorLab";

export const metadata: Metadata = {
  title: "Editor Lab",
  description: "블로그 에디터 방향성과 작성 경험을 보여주는 프로토타입 페이지입니다.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function AdminWritePage() {
  return <EditorLab />;
}

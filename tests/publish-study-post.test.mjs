import assert from "node:assert/strict";
import test from "node:test";
import { parseArguments, parseStudyPost, publishPost } from "../scripts/publish-study-post.mjs";

const MARKDOWN = `---
title: 금융 IT Day 1 — Java 기본기
slug: financial-it-day-01-java-basics
description: 계좌 도메인으로 Java 기본기를 공부한다.
category: Financial IT
series: 금융 IT 30일 학습
tags: java, collections, fintech
---

## 오늘 배운 내용

금액은 long으로 관리한다.
`;

test("study Markdown을 블로그 posts 스키마로 변환한다", () => {
  const post = parseStudyPost(MARKDOWN);

  assert.equal(post.title, "금융 IT Day 1 — Java 기본기");
  assert.equal(post.slug, "financial-it-day-01-java-basics");
  assert.equal(post.category, "Financial IT");
  assert.deepEqual(post.tags, ["java", "collections", "fintech"]);
  assert.match(post.content, /금액은 long으로 관리한다/);
});

test("필수 메타데이터와 안전하지 않은 slug를 거부한다", () => {
  assert.throws(() => parseStudyPost(MARKDOWN.replace("slug:", "other:")), /필수 메타데이터/);
  assert.throws(
    () => parseStudyPost(MARKDOWN.replace("financial-it-day-01-java-basics", "../private")),
    /slug는 영문 소문자/,
  );
});

test("CLI는 기본적으로 미리보기이며 게시할 때 명시적 옵션이 필요하다", () => {
  assert.equal(parseArguments(["day-01"]).dryRun, true);
  assert.equal(parseArguments(["day-01", "--publish"]).dryRun, false);
  assert.throws(() => parseArguments(["--all", "day-01"]), /함께 사용할 수 없습니다/);
});

test("새 slug는 POST로 생성한다", async () => {
  const requests = [];
  const fakeFetch = async (url, options = {}) => {
    requests.push({ url: String(url), options });

    return new Response(JSON.stringify(requests.length === 1 ? [] : [{ id: 7, slug: "day-01" }]), {
      status: requests.length === 1 ? 200 : 201,
      headers: { "Content-Type": "application/json" },
    });
  };

  const result = await publishPost(
    { slug: "day-01", title: "Day 1" },
    { supabaseUrl: "https://example.supabase.co", serviceRoleKey: "test-only-key" },
    fakeFetch,
  );

  assert.equal(result.action, "created");
  assert.equal(requests[1].options.method, "POST");
  assert.equal(requests[1].options.headers.apikey, "test-only-key");
});

test("기존 slug는 PATCH로 수정해 중복 글을 만들지 않는다", async () => {
  const requests = [];
  const fakeFetch = async (url, options = {}) => {
    requests.push({ url: String(url), options });

    return new Response(JSON.stringify([{ id: 7, slug: "day-01" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  const result = await publishPost(
    { slug: "day-01", title: "Day 1" },
    { supabaseUrl: "https://example.supabase.co", serviceRoleKey: "test-only-key" },
    fakeFetch,
  );

  assert.equal(result.action, "updated");
  assert.equal(requests[1].options.method, "PATCH");
  assert.match(requests[1].url, /id=eq\.7/);
});

test("실제 게시에는 Supabase 서비스 키가 반드시 필요하다", async () => {
  await assert.rejects(
    () => publishPost({ slug: "day-01" }, { supabaseUrl: "https://example.supabase.co" }),
    /SUPABASE_SERVICE_ROLE_KEY/,
  );
});

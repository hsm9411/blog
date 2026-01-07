// scripts/fetch-notion.js
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md"; // 1. 추가
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
  console.error("❌ Error: .env 파일 확인 필요");
  process.exit(1);
}

const notion = new Client({ auth: NOTION_API_KEY });
// 2. 변환기 초기화
const n2m = new NotionToMarkdown({ notionClient: notion });

async function getProjects() {
  console.log("⏳ 노션 데이터 가져오는 중...");

  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: "Status",
        select: { equals: "Published" },
      },
      sorts: [{ property: "Date", direction: "descending" }],
    });

    // 3. 페이지별 상세 내용 가져오기 (비동기 병렬 처리)
    // map 대신 Promise.all을 사용하여 각 페이지의 본문을 API로 요청합니다.
    const projects = await Promise.all(
      response.results.map(async (page) => {
        const props = page.properties;
        
        // (A) 본문(Blocks)을 가져와 마크다운으로 변환
        const mdBlocks = await n2m.pageToMarkdown(page.id);
        const mdString = n2m.toMarkdownString(mdBlocks);

        return {
          id: page.id,
          title: props.Name?.title?.[0]?.plain_text || "제목 없음",
          description: props.Summary?.rich_text?.[0]?.plain_text || "",
          tech: props.TechStack?.multi_select?.map((tag) => tag.name) || [],
          link: props.GitHubURL?.url || "#",
          cover: page.cover?.external?.url || page.cover?.file?.url || "",
          // (B) 변환된 마크다운 내용 추가 (parent는 notion-to-md 객체 구조상 필요)
          content: mdString.parent || "" 
        };
      })
    );

    const outputDir = path.join(__dirname, "../src/data");
    const outputPath = path.join(outputDir, "projects.json");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
    
    console.log(`✅ 데이터 추출 완료! (${projects.length}개)`);
    console.log(`📂 저장 위치: ${outputPath}`);

  } catch (error) {
    console.error("❌ 실패:", error);
    process.exit(1);
  }
}

getProjects();
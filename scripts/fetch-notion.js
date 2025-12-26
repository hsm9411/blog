import { Client } from "@notionhq/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
// ▼ [핵심] 이 줄이 있어야 빨간 줄이 사라집니다!
import process from "process";

// 1. 환경변수 로드
dotenv.config();

// 2. 디렉토리 경로 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 3. 환경변수 체크
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
  console.error("❌ Error: .env 파일에 NOTION_API_KEY와 NOTION_DATABASE_ID가 없습니다.");
  process.exit(1);
}

const notion = new Client({ auth: NOTION_API_KEY });

async function getProjects() {
  console.log("⏳ 노션 데이터 가져오는 중...");

  try {
    // 4. DB 쿼리 (v2.2.15 버전 기준 문법)
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: "Status",
        select: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    // 5. 데이터 가공
    const projects = response.results.map((page) => {
      const props = page.properties;
      return {
        id: page.id,
        title: props.Name?.title?.[0]?.plain_text || "제목 없음",
        description: props.Summary?.rich_text?.[0]?.plain_text || "",
        tech: props.TechStack?.multi_select?.map((tag) => tag.name) || [],
        link: props.GitHubURL?.url || "#",
        cover: page.cover?.external?.url || page.cover?.file?.url || ""
      };
    });

    // 6. 파일 저장
    const outputDir = path.join(__dirname, "../src/data");
    const outputPath = path.join(outputDir, "projects.json");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
    
    console.log(`✅ 데이터 추출 완료! 총 ${projects.length}개의 프로젝트를 저장했습니다.`);
    console.log(`📂 저장 위치: ${outputPath}`);

  } catch (error) {
    console.error("❌ 노션 데이터 가져오기 실패:");
    console.error(error);
    process.exit(1);
  }
}

getProjects();
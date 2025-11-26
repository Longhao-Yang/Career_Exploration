import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { CopyButton } from "@/components/CopyButton";
import { Badge } from "@/components/Badge";

export const metadata = {
  title: "90分钟作品包｜前端工程师｜Try-A-Job",
  description: "做出一个可交付的小组件与 README：响应式、可访问性、边界态。"
};

const CHECKLIST = [
  "移动端单列，md 起三列；卡片间距一致（gap）",
  "语义结构：article / h3 / p / ul / button 等合理使用",
  "按钮必须键盘可达，focus-visible 有清晰样式",
  "图标按钮或图标链接提供 aria-label / sr-only",
  "加载/空态/失败态有可见反馈（不沉默）",
  "组件 props 清晰：title/desc/tags/image/cta/onClick",
  "有最少 README：目的、使用方式、验收点、边界态",
  "可读性：类名不乱堆，能抽出小组件/工具函数则抽",
  "视觉一致：圆角、边框、阴影使用克制",
  "自测：Chrome 移动模拟 + 键盘 Tab 流程走一遍"
];

const RUBRIC = [
  { k: "语义结构", d: "是否使用恰当语义元素、标题层级合理", p: 20 },
  { k: "响应式布局", d: "断点、间距、内容溢出处理是否稳", p: 20 },
  { k: "可访问性", d: "键盘可用、焦点可见、可访问名称齐全", p: 25 },
  { k: "边界态", d: "loading/empty/error/disabled 等是否考虑", p: 15 },
  { k: "可维护性", d: "props/API 清晰、拆分合理、可读性", p: 20 }
];

const README = `# 课程卡片组件（Frontend Work Sample）

## 目标
实现一个“课程卡片”组件，满足：
- 响应式：移动端 1 列，md 起 3 列
- 可访问性：键盘可用 + focus 可见 + 图标按钮有可访问名称
- 边界态：loading / empty / error / disabled（至少覆盖其中 2 个）

## 运行方式
\`\`\`bash
pnpm i
pnpm dev
\`\`\`

## 验收清单
- [ ] 语义结构（article/h3/p/ul/button）
- [ ] md 断点三列 + gap
- [ ] focus-visible 样式清晰
- [ ] aria-label / sr-only
- [ ] 至少 2 个边界态可见

## 自评 Rubric（100 分）
- 语义结构 20
- 响应式布局 20
- 可访问性 25
- 边界态 15
- 可维护性 20
`;

const SKELETON = `// CourseCard.tsx (示例骨架)
type Course = {
  title: string
  desc: string
  tags: string[]
  imageUrl?: string
  ctaText?: string
  disabled?: boolean
}

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="rounded-2xl border bg-white p-4">
      <h3 className="text-base font-semibold">{course.title}</h3>
      <p className="mt-1 text-sm text-zinc-600">{course.desc}</p>

      <ul className="mt-3 flex flex-wrap gap-2">
        {course.tags.map((t) => (
          <li key={t} className="rounded-full bg-zinc-100 px-2 py-1 text-xs">{t}</li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between">
        <button
          className="rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          aria-label={course.ctaText ?? "立即学习"}
          disabled={course.disabled}
        >
          {course.ctaText ?? "立即学习"}
        </button>

        <button
          className="rounded-xl bg-zinc-100 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          aria-label="收藏课程"
        >
          ☆
        </button>
      </div>
    </article>
  )
}
`;

export default function KitPage() {
  return (
    <main>
      <header className="border-b bg-white">
        <Container className="py-8">
          <div className="text-sm text-zinc-600">
            <Link href="/" className="hover:underline">Try-A-Job</Link>
            <span className="text-zinc-300"> / </span>
            <Link href="/careers/frontend-engineer" className="hover:underline">前端工程师</Link>
            <span className="text-zinc-300"> / </span>
            <span className="text-zinc-900">90分钟作品包</span>
          </div>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-semibold tracking-tight">90 分钟作品包：课程卡片组件</h1>
                <Badge variant="ghost">可交付</Badge>
              </div>
              <p className="mt-2 text-zinc-600 max-w-2xl">目标：做出一个可复用组件 + README，覆盖响应式、可访问性与边界态。做完就能放作品集/简历项目描述里。</p>
            </div>
            <div className="no-print flex gap-2">
              <Button href="/careers/frontend-engineer/experience" variant="secondary">先做 15 分钟体验</Button>
              <Button href="/careers/frontend-engineer" variant="ghost">回职业卡片</Button>
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-10 space-y-6">
        <Card>
          <h2 className="text-lg font-semibold">你要交付什么？</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-700">
            <li>• 一个课程卡片组件（CourseCard）+ 一个展示页（Grid）</li>
            <li>• 至少 2 个边界态（例如 loading / error / disabled）</li>
            <li>• 一份 README（包含验收清单 + 自评 Rubric）</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">自测清单（10 条）</h2>
          <ol className="mt-3 grid gap-2 text-sm text-zinc-700 sm:grid-cols-2">
            {CHECKLIST.map((x,i)=> (
              <li key={x} className="rounded-2xl border bg-white p-4">
                <div className="text-xs text-zinc-500">#{i+1}</div>
                <div className="mt-1">{x}</div>
              </li>
            ))}
          </ol>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">评分 Rubric（建议你照这个自评）</h2>
          <div className="mt-3 grid gap-3">
            {RUBRIC.map((r)=> (
              <div key={r.k} className="rounded-2xl border bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{r.k}</div>
                  <div className="text-sm text-zinc-600">{r.p} 分</div>
                </div>
                <div className="mt-1 text-sm text-zinc-700">{r.d}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">README 模板（复制即可用）</h2>
            <CopyButton text={README} label="复制 README" />
          </div>
          <pre className="mt-3 whitespace-pre-wrap rounded-2xl border bg-zinc-50 p-4 text-xs text-zinc-700">{README}</pre>
        </Card>

        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">组件代码骨架（复制即可开写）</h2>
            <CopyButton text={SKELETON} label="复制代码骨架" />
          </div>
          <pre className="mt-3 whitespace-pre-wrap rounded-2xl border bg-zinc-50 p-4 text-xs text-zinc-700">{SKELETON}</pre>
          <p className="mt-3 text-xs text-zinc-500">免责声明：作品包用于学习与展示，不构成面试承诺或就业保证。</p>
        </Card>
      </Container>
    </main>
  );
}

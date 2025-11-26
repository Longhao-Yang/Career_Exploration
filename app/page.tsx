import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { getCareer } from "@/lib/career";

export default function HomePage() {
  const career = getCareer("frontend-engineer");
  return (
    <main>
      <header className="border-b bg-white">
        <Container className="py-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-zinc-900 text-zinc-50 text-sm font-semibold shadow-soft">T</span>
              <span className="text-sm text-zinc-600">Try-A-Job</span>
              <span className="mx-2 text-zinc-300">•</span>
              <Badge>单机可用</Badge>
              <Badge variant="ghost">15分钟微体验</Badge>
              <Badge variant="ghost">作品包</Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              用 15 分钟做一次职业微体验，<span className="text-zinc-500">而不是刷 30 个视频。</span>
            </h1>
            <p className="text-zinc-600 max-w-2xl">先体验，再决定要不要深入：你会得到可复制的总结卡、可交付的作品模板与清单。</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/careers/frontend-engineer"><Button>开始：前端工程师</Button></Link>
              <Link href="/careers/frontend-engineer/experience"><Button variant="secondary">直接做 15 分钟体验</Button></Link>
              <a className="no-print" href="#how"><Button variant="ghost">怎么用？</Button></a>
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">{career.title}</h2>
                  <Badge variant="ghost">职业卡片</Badge>
                </div>
                <p className="mt-2 text-zinc-600">看“真实日常 + 常见交付物 + 最短路径”，少走弯路。</p>
              </div>
              <Link href="/careers/frontend-engineer"><Button variant="secondary">打开</Button></Link>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {career.top_tasks.slice(0, 4).map((t) => (
                <div key={t} className="rounded-2xl border bg-white p-4">
                  <div className="text-sm text-zinc-500">常见任务</div>
                  <div className="mt-1 font-medium">{t}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold">本版本（MVP）</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              <li>• 结构化职业卡片（附来源）</li>
              <li>• 15 分钟微体验（评分+解析）</li>
              <li>• 90 分钟作品包（模板+Rubric）</li>
              <li>• 无需登录也能完整走完</li>
            </ul>
            <div className="mt-5">
              <Link href="/careers/frontend-engineer/kit"><Button variant="secondary" className="w-full">看作品包</Button></Link>
            </div>
          </Card>
        </div>

        <section id="how" className="mt-10">
          <Card>
            <h3 className="text-lg font-semibold">怎么用（推荐路线）</h3>
            <ol className="mt-3 space-y-2 text-sm text-zinc-700">
              <li>1) 读职业卡片（3 分钟）：确认这是不是你想象的工作。</li>
              <li>2) 做 15 分钟微体验：你会“真的做点事”，并拿到评分与改进建议。</li>
              <li>3) 选做 90 分钟作品包：做出一个可交付的小作品和 README。</li>
            </ol>
          </Card>
        </section>

        <footer className="mt-10 text-xs text-zinc-500">
          <p>免责声明：本网站内容用于职业探索与学习，不构成就业承诺、薪资保证或法律/医疗建议。</p>
        </footer>
      </Container>
    </main>
  );
}

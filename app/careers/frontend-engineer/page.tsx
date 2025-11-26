import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { getCareer } from "@/lib/career";

export const metadata = {
  title: "前端工程师｜Try-A-Job",
  description: "真实日常、常见任务、最短入门路径与可交付物。"
};

export default function CareerPage() {
  const c = getCareer("frontend-engineer");
  return (
    <main>
      <header className="border-b bg-white">
        <Container className="py-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <Link href="/" className="hover:underline">Try-A-Job</Link>
              <span className="text-zinc-300">/</span>
              <span className="text-zinc-900">{c.title}</span>
              <span className="ml-2"><Badge variant="ghost">更新：{c.updated_at}</Badge></span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">{c.title}</h1>
                <p className="mt-2 text-zinc-600 max-w-2xl">这不是百科：你会看到真实交付物、常见任务与最短路径，并能直接做 15 分钟体验。</p>
              </div>
              <div className="flex flex-wrap gap-2 no-print">
                <Button href="/careers/frontend-engineer/experience">做 15 分钟体验</Button>
                <Button href="/careers/frontend-engineer/kit" variant="secondary">看 90 分钟作品包</Button>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-10 space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <h2 className="text-lg font-semibold">一天大概怎么过？</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">{c.daily_routine.map((x)=> <li key={x}>• {x}</li>)}</ul>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold">你会交付什么？</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">{c.deliverables.map((x)=> <li key={x}>• {x}</li>)}</ul>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-lg font-semibold">最常见的任务</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {c.top_tasks.map((x)=> (
                <div key={x} className="rounded-2xl border bg-white p-4">
                  <div className="text-sm text-zinc-500">Task</div>
                  <div className="mt-1 font-medium">{x}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold">门槛画像（必要/加分/误区）</h2>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <div className="font-medium">必要</div>
                <div className="mt-2 flex flex-wrap gap-2">{c.requirements.must.map((x)=> <Badge key={x} variant="ghost">{x}</Badge>)}</div>
              </div>
              <div>
                <div className="font-medium">加分</div>
                <div className="mt-2 flex flex-wrap gap-2">{c.requirements.nice_to_have.map((x)=> <Badge key={x} variant="ghost">{x}</Badge>)}</div>
              </div>
              <div>
                <div className="font-medium">常见误区</div>
                <ul className="mt-2 space-y-2 text-zinc-700">{c.requirements.pitfalls.map((x)=> <li key={x}>• {x}</li>)}</ul>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <h2 className="text-lg font-semibold">最短入门路径</h2>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <div>
              <div className="font-medium">0 → 1（最短闭环）</div>
              <ol className="mt-2 space-y-2 text-sm text-zinc-700">{c.paths.zero_to_one.map((x,i)=> <li key={x}>{i+1}. {x}</li>)}</ol>
            </div>
            <div>
              <div className="font-medium">进阶方向</div>
              <ol className="mt-2 space-y-2 text-sm text-zinc-700">{c.paths.advanced.map((x,i)=> <li key={x}>{i+1}. {x}</li>)}</ol>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 no-print">
            <Button href="/careers/frontend-engineer/experience">现在就做 15 分钟体验</Button>
            <Button href="/careers/frontend-engineer/kit" variant="secondary">做 90 分钟作品包</Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">信息来源（便于你自查）</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-700">
            {c.sources.map((s)=> (<li key={s.url}>• <a href={s.url} target="_blank" rel="noreferrer" className="hover:underline">{s.name}</a></li>))}
          </ul>
          <p className="mt-4 text-xs text-zinc-500">免责声明：本页用于职业探索与学习，不构成就业承诺或薪资保证。</p>
        </Card>
      </Container>
    </main>
  );
}

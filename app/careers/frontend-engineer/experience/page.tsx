import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { MicroExperience } from "./ui/MicroExperience";

export const metadata = {
  title: "15分钟微体验｜前端工程师｜Try-A-Job",
  description: "用 15 分钟做一次前端工程师的真实微任务，并获得评分与改进建议。"
};

export default function ExperiencePage() {
  return (
    <main>
      <header className="border-b bg-white">
        <Container className="py-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-zinc-600">
                <Link href="/" className="hover:underline">Try-A-Job</Link>
                <span className="text-zinc-300"> / </span>
                <Link href="/careers/frontend-engineer" className="hover:underline">前端工程师</Link>
                <span className="text-zinc-300"> / </span>
                <span className="text-zinc-900">15分钟微体验</span>
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">15 分钟微体验：前端工程师</h1>
              <p className="mt-2 text-zinc-600 max-w-2xl">场景：你是前端实习生，要实现“课程详情页”的课程卡片与按钮交互。做完会得到评分与可复制总结卡。</p>
            </div>
            <div className="no-print hidden sm:block">
              <Button href="/careers/frontend-engineer/kit" variant="secondary">看 90 分钟作品包</Button>
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-10">
        <Card><MicroExperience /></Card>
        <div className="mt-6 flex flex-wrap gap-2 no-print">
          <Button href="/careers/frontend-engineer" variant="ghost">返回职业卡片</Button>
          <Button href="/careers/frontend-engineer/kit" variant="secondary">继续：90 分钟作品包</Button>
        </div>
      </Container>
    </main>
  );
}

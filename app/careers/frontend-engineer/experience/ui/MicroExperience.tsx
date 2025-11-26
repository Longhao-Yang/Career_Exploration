"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { ProgressBar } from "@/components/ProgressBar";
import { CopyButton } from "@/components/CopyButton";
import { clamp } from "@/lib/utils";

type Answers = { q1: string[]; q2: string; q3: string; q4: string; q5: string[]; };

const Q1_OPTIONS = [
  "移动端单列，桌面端三列",
  "键盘可操作（Tab 可到按钮，Enter/Space 可触发）",
  "hover 与 focus 都要有可见状态",
  "所有文本都必须用纯黑色",
  "按钮仅用图标即可，无需任何可访问性文本"
];

const Q2_OPTIONS = [
  { id: "a", label: "A) <div><div>标题</div><div>描述</div><div>按钮</div></div>", correct: false, why: "全是 div，语义弱；不利于可访问性与 SEO。" },
  { id: "b", label: "B) <article><h3>标题</h3><p>描述</p><ul>标签</ul><button>立即学习</button></article>", correct: true,  why: "article + 标题/段落/列表/按钮语义清晰，更贴近真实交付。" },
  { id: "c", label: "C) <span>标题</span><span>描述</span><span>按钮</span>", correct: false, why: "span 不适合作为结构容器，语义与可访问性都较差。" }
];

const q4Map: Record<string, { correct: boolean; why: string }> = {
  a: { correct: true,  why: "图标按钮必须有可访问名称：aria-label 或者屏幕阅读器可读文本（sr-only）。" },
  b: { correct: false, why: "仅 title 并不可靠，且对移动端/读屏行为不稳定。" },
  c: { correct: false, why: "placeholder 不是可访问名称（且按钮通常没有 placeholder）。" }
};

function scoreQ1(selected: string[]) {
  const must = new Set(["移动端单列，桌面端三列","键盘可操作（Tab 可到按钮，Enter/Space 可触发）","hover 与 focus 都要有可见状态"]);
  let got = 0; for (const s of selected) if (must.has(s)) got++;
  const pickedWrong = selected.includes("所有文本都必须用纯黑色") || selected.includes("按钮仅用图标即可，无需任何可访问性文本");
  const base = (got / 3) * 40; const penalty = pickedWrong ? 8 : 0;
  return clamp(Math.round(base - penalty), 0, 40);
}
function scoreQ2(choice: string) { const opt = Q2_OPTIONS.find(x=>x.id===choice); return opt?.correct ? 20 : 6; }
function scoreQ3(input: string) {
  const s = input.toLowerCase();
  const keys = [{k:"grid",w:6},{k:"grid-cols-1",w:6},{k:"md:grid-cols-3",w:7},{k:"gap-4",w:5},{k:"p-4",w:4},{k:"rounded",w:3},{k:"border",w:3},{k:"bg-",w:2}];
  let score = 0; const hits:string[]=[]; for (const {k,w} of keys){ if(s.includes(k)){ score+=w; hits.push(k);} }
  return { score: clamp(score,0,20), hits };
}
function scoreQ4(choice: string){ return q4Map[choice]?.correct ? 10 : 2; }
function scoreQ5(selected: string[]){ const must = new Set(["idle","loading","success","error"]); let got=0; for(const s of selected) if(must.has(s)) got++; return clamp(Math.round((Math.min(got,4)/4)*10),0,10); }

function buildSuggestions(a: Answers) {
  const items: string[] = [];
  if (!a.q1.includes("键盘可操作（Tab 可到按钮，Enter/Space 可触发）")) items.push("补上“键盘可操作”意识：按钮要能 Tab 到，Enter/Space 可触发。");
  if (!a.q1.includes("hover 与 focus 都要有可见状态")) items.push("别只写 hover：focus-visible 的可见样式是前端最常见硬要求。");
  const q2 = Q2_OPTIONS.find(x=>x.id===a.q2); if (!q2?.correct) items.push("结构上优先用 article/h3/p/ul/button 等语义元素，减少 div 堆叠。");
  const q3 = scoreQ3(a.q3); if (!q3.hits.includes("md:grid-cols-3")) items.push("响应式：建议写出 md:grid-cols-3（移动端默认 1 列）。");
  if (!q3.hits.includes("gap-4")) items.push("布局：建议加 gap-4（或 gap-x / gap-y）体现间距意识。");
  if (a.q4 !== "a") items.push("图标按钮必须提供可访问名称：aria-label 或 sr-only 文本。");
  if (!(a.q5.includes("loading") && a.q5.includes("error"))) items.push("交互要考虑失败与慢网：loading 与 error 两个状态是常见验收点。");
  return items.length ? items : ["你已经覆盖了核心要点：语义结构、响应式、可访问性与边界态。下一步可以去做 90 分钟作品包。"];
}

function summaryText(score: number, breakdown: Record<string, number>, suggestions: string[]) {
  const lines = [
    "【Try-A-Job｜前端工程师 15分钟微体验总结】",
    `总分：${score}/100`,
    `分项：需求/验收 ${breakdown.q1}/40，结构语义 ${breakdown.q2}/20，响应式&TW ${breakdown.q3}/20，可访问性 ${breakdown.q4}/10，状态边界 ${breakdown.q5}/10`,
    "",
    "下一步建议：",
    ...suggestions.map((s,i)=> `${i+1}. ${s}`)
  ];
  return lines.join("\n");
}

export function MicroExperience() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({ q1: [], q2: "", q3: "", q4: "", q5: [] });
  const [submitted, setSubmitted] = useState(false);

  const progress = useMemo(()=> Math.round(((step-1)/5)*100), [step]);
  const result = useMemo(()=> {
    const q1 = scoreQ1(answers.q1);
    const q2 = scoreQ2(answers.q2);
    const q3 = scoreQ3(answers.q3).score;
    const q4 = scoreQ4(answers.q4);
    const q5 = scoreQ5(answers.q5);
    const total = clamp(q1+q2+q3+q4+q5, 0, 100);
    const suggestions = buildSuggestions(answers);
    return { total, breakdown:{q1,q2,q3,q4,q5}, suggestions };
  }, [answers]);

  const share = useMemo(()=> summaryText(result.total, result.breakdown, result.suggestions), [result]);

  function toggleMulti(key: keyof Answers, value: string){
    setAnswers(prev => {
      const arr = new Set((prev[key] as string[]) ?? []);
      if (arr.has(value)) arr.delete(value); else arr.add(value);
      return { ...prev, [key]: Array.from(arr) } as Answers;
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Badge>15分钟</Badge><Badge variant="ghost">共 5 步</Badge>
          <span className="text-sm text-zinc-600">Step {step}/5</span>
        </div>
        <div className="w-full sm:w-64"><ProgressBar value={submitted ? 100 : progress} /></div>
      </div>

      {!submitted && <div className="rounded-3xl border bg-zinc-50 p-5">
        <div className="text-sm text-zinc-600">提示：这是“真实工作抽样”。没有标准答案也正常，但我们会用行业常见验收点给你反馈。</div>
      </div>}

      {!submitted ? <>
        {step===1 && <div className="space-y-4">
          <h2 className="text-xl font-semibold">1) 读需求：哪些是“必须验收点”？（多选）</h2>
          <div className="space-y-2">{Q1_OPTIONS.map(x => (
            <label key={x} className="flex items-start gap-3 rounded-2xl border bg-white p-4">
              <input type="checkbox" className="mt-1" checked={answers.q1.includes(x)} onChange={()=>toggleMulti("q1",x)} />
              <span className="text-sm">{x}</span>
            </label>
          ))}</div>
        </div>}
        {step===2 && <div className="space-y-4">
          <h2 className="text-xl font-semibold">2) 选结构：更合理的 HTML 语义结构是？（单选）</h2>
          <div className="space-y-2">{Q2_OPTIONS.map(x => (
            <label key={x.id} className="flex items-start gap-3 rounded-2xl border bg-white p-4">
              <input type="radio" name="q2" className="mt-1" checked={answers.q2===x.id} onChange={()=> setAnswers(p=>({...p, q2:x.id}))} />
              <span className="text-sm">{x.label}</span>
            </label>
          ))}</div>
        </div>}
        {step===3 && <div className="space-y-4">
          <h2 className="text-xl font-semibold">3) 写 Tailwind：容器一行类名（文本输入）</h2>
          <p className="text-sm text-zinc-600">目标：移动端 1 列，md 起 3 列，间距 gap-4，内边距 p-4（你也可以加 border/rounded）。</p>
          <textarea value={answers.q3} onChange={(e)=> setAnswers(p=>({...p, q3:e.target.value}))} className="min-h-24 w-full rounded-2xl border bg-white p-4 text-sm outline-none focus:ring-2 focus:ring-zinc-200" placeholder="例如：grid grid-cols-1 md:grid-cols-3 gap-4 p-4 ..." />
        </div>}
        {step===4 && <div className="space-y-4">
          <h2 className="text-xl font-semibold">4) 可访问性：图标按钮怎么做才合格？（单选）</h2>
          <div className="space-y-2">
            <label className="flex items-start gap-3 rounded-2xl border bg-white p-4"><input type="radio" name="q4" className="mt-1" checked={answers.q4==="a"} onChange={()=> setAnswers(p=>({...p, q4:"a"}))} /><span className="text-sm">A) 给按钮 aria-label，或加一段 sr-only 文本</span></label>
            <label className="flex items-start gap-3 rounded-2xl border bg-white p-4"><input type="radio" name="q4" className="mt-1" checked={answers.q4==="b"} onChange={()=> setAnswers(p=>({...p, q4:"b"}))} /><span className="text-sm">B) 只要给按钮 title="xxx" 就行</span></label>
            <label className="flex items-start gap-3 rounded-2xl border bg-white p-4"><input type="radio" name="q4" className="mt-1" checked={answers.q4==="c"} onChange={()=> setAnswers(p=>({...p, q4:"c"}))} /><span className="text-sm">C) 用 placeholder 描述按钮作用</span></label>
          </div>
        </div>}
        {step===5 && <div className="space-y-4">
          <h2 className="text-xl font-semibold">5) 边界态：按钮交互最少要考虑哪些状态？（多选）</h2>
          <div className="space-y-2">{["idle","loading","success","error","disabled"].map(x => (
            <label key={x} className="flex items-start gap-3 rounded-2xl border bg-white p-4">
              <input type="checkbox" className="mt-1" checked={answers.q5.includes(x)} onChange={()=>toggleMulti("q5",x)} />
              <span className="text-sm">{x}</span>
            </label>
          ))}</div>
        </div>}
        <div className="flex flex-wrap gap-2 pt-2 no-print">
          <Button variant="secondary" onClick={()=> setStep(s=> Math.max(1, s-1))} disabled={step===1}>上一步</Button>
          {step<5 ? <Button onClick={()=> setStep(s=> Math.min(5, s+1))}>下一步</Button> : <Button onClick={()=> setSubmitted(true)}>提交并评分</Button>}
          <Button variant="ghost" onClick={()=> { setAnswers({q1:[],q2:"",q3:"",q4:"",q5:[]}); setStep(1); }}>重置</Button>
        </div>
      </> : <div className="space-y-5">
        <div className="rounded-3xl border bg-zinc-50 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><div className="text-sm text-zinc-600">你的总分</div><div className="mt-1 text-3xl font-semibold">{result.total}/100</div></div>
            <div className="w-full sm:w-64"><ProgressBar value={result.total} />
              <div className="mt-2 text-xs text-zinc-600">需求/验收 {result.breakdown.q1}/40 · 结构 {result.breakdown.q2}/20 · TW {result.breakdown.q3}/20 · a11y {result.breakdown.q4}/10 · 边界 {result.breakdown.q5}/10</div>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-white p-6">
          <h3 className="text-lg font-semibold">改进建议（下一步做什么）</h3>
          <ol className="mt-3 space-y-2 text-sm text-zinc-700">{result.suggestions.map((s,i)=> <li key={s}>{i+1}. {s}</li>)}</ol>
        </div>
        <div className="rounded-3xl border bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">可分享总结卡（复制文本）</h3>
            <CopyButton text={summaryText(result.total, result.breakdown, result.suggestions)} label="复制总结卡文本" />
          </div>
          <pre className="mt-3 whitespace-pre-wrap rounded-2xl border bg-zinc-50 p-4 text-xs text-zinc-700">
{summaryText(result.total, result.breakdown, result.suggestions)}
          </pre>
        </div>
        <div className="flex flex-wrap gap-2 no-print">
          <Button variant="secondary" onClick={()=> { setSubmitted(false); setStep(1); setAnswers({q1:[],q2:"",q3:"",q4:"",q5:[]}); }}>再做一次</Button>
        </div>
      </div>}
    </div>
  );
}

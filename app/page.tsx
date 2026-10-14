const modules = [
  ["Lead Discovery", "公开来源线索研究与整理"],
  ["Lead Database", "客户与潜在客户资料管理"],
  ["Lead Scoring", "按匹配度、需求信号与跟进优先级评分"],
  ["Sales Pipeline", "从新线索到跟进、预约与成交的状态追踪"],
  ["AI Analysis", "整理公开资料、总结需求信号并建议下一步"],
  ["Activity Dashboard", "追踪每日搜寻、联系、回复与转化表现"],
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="badge">胜行天下工作室 · Internal Tool</div>
        <h1>Shengxing Lead Hunter</h1>
        <p>
          AI-assisted lead discovery and sales workflow system for researching lawful public signals,
          organizing prospects, scoring opportunities and managing follow-up.
        </p>
      </section>

      <section className="grid">
        {modules.map(([title, text]) => (
          <article className="card" key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="notice">
        <strong>Project initialized.</strong> Next step: connect data sources, persistence, authentication and the lead-research workflow.
      </section>
    </main>
  );
}

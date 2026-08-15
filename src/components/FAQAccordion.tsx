interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="font-serif text-2xl md:text-3xl text-brand-deep mb-6">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group bg-white border border-gray-100 rounded-xl px-5 py-4 open:shadow-sm"
          >
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-brand-deep">
              {item.question}
              <span className="text-brand-gold transition-transform group-open:rotate-45 text-xl leading-none">
                +
              </span>
            </summary>
            <p className="text-brand-muted text-sm leading-relaxed mt-3">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/**
 * Renders a schema.org JSON-LD block. Server-only: it emits a plain <script>
 * tag, so it can live in layouts and pages without a client boundary.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline except for "</script>", which
      // the replace below neutralises.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
